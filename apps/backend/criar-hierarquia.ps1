# 1. Faz o login para obter o token de Admin automaticamente
$loginBody = @{
    email = "alessioal30@gmail.com"
    password = "SUA_SENHA_AQUI"
} | ConvertTo-Json

try {
    Write-Host "Realizando login na API do Medusa..." -ForegroundColor Yellow
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:9000/admin/auth/token" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.access_token
    Write-Host "Token obtido com sucesso!" -ForegroundColor Green
}
catch {
    Write-Host "Erro no login. Verifique sua senha: $_" -ForegroundColor Red
    exit
}

# 2. Configura os Headers com o Token obtido
$url = "http://localhost:9000/admin/product-categories"
$headers = @{
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer $token"
}

# 3. Lista de categorias para criar
$categorias = @(
    @{
        name = "Saúde"
        handle = "saude"
        is_active = $true
        is_internal = $false
        children = @(
            @{ name = "Medicamentos"; handle = "medicamentos"; is_active = $true },
            @{ name = "Vitaminas"; handle = "vitaminas-saude"; is_active = $true }
        )
    },
    @{
        name = "Beleza"
        handle = "beleza"
        is_active = $true
        is_internal = $false
        children = @(
            @{ name = "Skincare"; handle = "skincare"; is_active = $true },
            @{ name = "Cuidados Capilares"; handle = "cabelos"; is_active = $true }
        )
    },
    @{
        name = "Bem-estar"
        handle = "bem-estar"
        is_active = $true
        is_internal = $false
        children = @(
            @{ name = "Suplementos Esportivos"; handle = "suplementos-esportivos"; is_active = $true },
            @{ name = "Alimentos Funcionais"; handle = "alimentos-funcionais"; is_active = $true }
        )
    },
    @{
        name = "Estilo"
        handle = "estilo"
        is_active = $true
        is_internal = $false
        children = @(
            @{ name = "Moda Masculina"; handle = "moda-masculina"; is_active = $true },
            @{ name = "Moda Feminina"; handle = "moda-feminina"; is_active = $true },
            @{ name = "Calçados"; handle = "calcados-estilo"; is_active = $true },
            @{ name = "Acessórios"; handle = "acessorios-estilo"; is_active = $true }
        )
    }
)

# 4. Executa o cadastro das categorias
foreach ($cat in $categorias) {
    $paiBody = @{
        name = $cat.name
        handle = $cat.handle
        is_active = $cat.is_active
        is_internal = $cat.is_internal
    } | ConvertTo-Json

    try {
        $responsePai = Invoke-RestMethod -Uri $url -Method Post -Body $paiBody -Headers $headers
        $parentId = $responsePai.product_category.id
        Write-Host "Categoria Pai criada: $($cat.name)" -ForegroundColor Green

        foreach ($filha in $cat.children) {
            $filhaBody = @{
                name = $filha.name
                handle = $filha.handle
                is_active = $filha.is_active
                parent_category_id = $parentId
            } | ConvertTo-Json

            try {
                Invoke-RestMethod -Uri $url -Method Post -Body $filhaBody -Headers $headers
                Write-Host "   -> Subcategoria criada: $($filha.name)" -ForegroundColor Cyan
            }
            catch {
                Write-Host "   -> Erro ao criar subcategoria $($filha.name): $_" -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Host "Erro ao criar categoria pai $($cat.name): $_" -ForegroundColor Red
    }
}