const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const { createRequire } = require('node:module')
const dependencies = createRequire(process.env.APCM_TEST_DEPENDENCIES || path.resolve('apps/storefront/package.json'))
const ts = dependencies('typescript')
const root = path.resolve('apps/storefront/src')
function compile(relative, imports = {}) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
    reportDiagnostics: true,
  })
  assert.equal(output.diagnostics.length, 0)
  const module = { exports: {} }
  vm.runInNewContext(output.outputText, { module, exports: module.exports, require: name => {
    if (Object.hasOwn(imports, name)) return imports[name]
    throw Error('Unexpected import: ' + name)
  } })
  return module.exports
}
async function main() {
  const stock = compile('lib/util/product-stock.ts')
  const sort = compile('lib/util/sort-products.ts')
  const zero = { manage_inventory: true, allow_backorder: false, inventory_quantity: 0 }
  assert.equal(stock.isProductSoldOut({ variants: [zero] }), true)
  assert.equal(stock.isProductSoldOut({ variants: [zero, { ...zero, inventory_quantity: 1 }] }), false)
  assert.equal(stock.isProductSoldOut({ variants: [{ ...zero, allow_backorder: true }] }), false)
  assert.equal(stock.isProductSoldOut({ variants: [{ manage_inventory: false }] }), false)
  assert.equal(stock.isProductSoldOut({ variants: [{ ...zero, inventory_quantity: null }] }), false)
  assert.equal(stock.isProductSoldOut({ variants: [] }), false)
  const restored = { variants: [{ ...zero }] }
  assert.equal(stock.isProductSoldOut(restored), true)
  restored.variants[0].inventory_quantity = 4
  assert.equal(stock.isProductSoldOut(restored), false)
  const products = Array.from({ length: 139 }, (_, i) => ({
    id: 'p' + i, title: 'Produto ' + i, created_at: new Date(2026, 0, i + 1).toISOString(),
    variants: [{ ...zero, inventory_quantity: i < 100 ? 0 : 1, calculated_price: { calculated_amount: 150 - i } }],
  }))
  let queries = []
  const api = compile('lib/data/products.ts', {
    '@lib/config': { sdk: { client: { fetch: async (_url, { query }) => {
      queries.push(query)
      assert.ok(query.fields.includes('variants.inventory_quantity'))
      return { products: structuredClone(products.slice(query.offset, query.offset + query.limit)), count: products.length }
    } } } },
    '@lib/util/sort-products': sort,
    '@lib/util/product-stock': stock,
    './cookies': { getAuthHeaders: async () => ({}), getCacheOptions: async () => ({}) },
    './regions': { getRegion: async () => ({ id: 'br-region' }), retrieveRegion: async () => ({ id: 'br-region' }) },
  })
  for (const order of ['created_at', 'price_asc', 'price_desc']) {
    const all = []
    for (let page = 1; page <= 12; page++) {
      const result = await api.listProductsWithSort({ page, countryCode: 'br', sortBy: order, queryParams: { limit: 12, category_id: ['fashion'] } })
      assert.equal(result.response.count, 139)
      assert.equal(result.nextPage, page < 12 ? page + 1 : null)
      all.push(...result.response.products)
    }
    assert.equal(new Set(all.map(p => p.id)).size, 139)
    assert.equal(all.slice(0, 39).some(stock.isProductSoldOut), false)
    assert.equal(all.slice(39).every(stock.isProductSoldOut), true)
  }
  assert.ok(queries.every(q => q.category_id[0] === 'fashion'))
  const input = [products[0], products[138]]
  assert.equal(stock.availableProductsFirst(input)[0].id, products[138].id)
  assert.equal(input[0].id, products[0].id)
  for (const file of ['modules/products/components/product-preview/index.tsx', 'modules/products/templates/product-info/index.tsx', 'modules/home/components/featured-products/product-rail/index.tsx']) {
    const result = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX }, reportDiagnostics: true })
    assert.equal(result.diagnostics.length, 0)
  }
  console.log('Stock, restocking, partial stock, all-page ordering, filters and pagination verified.')
}
main().catch(error => { console.error(error); process.exitCode = 1 })
