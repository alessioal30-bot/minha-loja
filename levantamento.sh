#!/usr/bin/env bash

echo "========================================"
echo " LEVANTAMENTO - MINHA LOJA"
echo " $(date)"
echo "========================================"

echo
echo "=== SISTEMA / WSL ==="
uname -a
echo
cat /etc/os-release 2>/dev/null | head -8

echo
echo "=== NODE / PNPM / NPM ==="
node -v 2>/dev/null || echo "Node: NÃO ENCONTRADO"
pnpm -v 2>/dev/null || echo "pnpm: NÃO ENCONTRADO"
npm -v 2>/dev/null || echo "npm: NÃO ENCONTRADO"

echo
echo "=== PROJETO ==="
pwd
echo
find . -maxdepth 2 -type d \
  ! -path './node_modules*' \
  ! -path './.git*' \
  | sort

echo
echo "=== BACKEND ==="
if [ -f apps/backend/package.json ]; then
  echo "package.json encontrado"
  grep -E '"(name|version|dev|build|start)"' apps/backend/package.json | head -20
else
  echo "Backend não encontrado"
fi

echo
echo "=== MEDUSA ==="
cd apps/backend 2>/dev/null && {
  pnpm exec medusa --version 2>/dev/null || echo "Medusa CLI não respondeu"
}
cd ../.. 2>/dev/null

echo
echo "=== FRONTEND ==="
if [ -f apps/storefront/package.json ]; then
  echo "package.json encontrado"
  grep -E '"(name|version|dev|build|start)"' apps/storefront/package.json | head -20
else
  echo "Storefront não encontrado"
fi

echo
echo "=== PORTAS ==="
ss -lntp 2>/dev/null | grep -E ':(8000|9000|5432|6379)\b' \
  || echo "Nenhuma das portas 8000/9000/5432/6379 encontrada"

echo
echo "=== PROCESSOS IMPORTANTES ==="
ps aux | grep -E 'node|medusa|next|cloudflared|postgres|redis' \
  | grep -v grep || echo "Nenhum processo encontrado"

echo
echo "=== POSTGRESQL ==="
pg_isready 2>/dev/null || echo "pg_isready não disponível"

echo
echo "=== CLOUDFLARED ==="
which cloudflared 2>/dev/null || echo "cloudflared não encontrado"
cloudflared --version 2>/dev/null || true

echo
echo "=== CLOUDFLARED PROCESSO ==="
ps aux | grep cloudflared | grep -v grep || echo "cloudflared não está rodando"

echo
echo "=== BACKEND LOCAL ==="
curl -s -o /dev/null -w "localhost:9000/app -> HTTP %{http_code}\n" \
  http://localhost:9000/app 2>/dev/null || echo "Backend não respondeu"

curl -s -o /dev/null -w "172.20.222.233:9000/app -> HTTP %{http_code}\n" \
  http://172.20.222.233:9000/app 2>/dev/null || true

echo
echo "=== FRONTEND LOCAL ==="
curl -s -o /dev/null -w "localhost:8000 -> HTTP %{http_code}\n" \
  http://localhost:8000 2>/dev/null || echo "Frontend não respondeu"

echo
echo "=== ENV FRONTEND (SEGURA) ==="
if [ -f apps/storefront/.env.local ]; then
  grep -E '^(NEXT_PUBLIC_|MEDUSA_)' apps/storefront/.env.local \
    | sed -E 's/(TOKEN|SECRET|KEY|PASSWORD)=.*/\1=[OCULTO]/I'
else
  echo ".env.local não encontrado"
fi

echo
echo "=== ENV BACKEND (SEGURA) ==="
if [ -f apps/backend/.env ]; then
  grep -E '^(DATABASE|STORE_CORS|ADMIN_CORS|PORT|REDIS)' apps/backend/.env \
    | sed -E 's/(PASSWORD|SECRET|TOKEN|KEY)=.*/\1=[OCULTO]/I'
else
  echo "apps/backend/.env não encontrado"
fi

echo
echo "=== MEDUSA CONFIG ==="
if [ -f apps/backend/medusa-config.ts ]; then
  grep -E 'redis|database|cors|admin|port|modules' \
    apps/backend/medusa-config.ts \
    | sed -E 's/(password|secret|token|key).*/[OCULTO]/I' \
    | head -80
fi

echo
echo "=== CONECTIVIDADE API PÚBLICA ==="
API=$(grep '^NEXT_PUBLIC_MEDUSA_BACKEND_URL=' apps/storefront/.env.local 2>/dev/null \
  | cut -d= -f2- | tr -d '"' | tr -d "'")

if [ -n "$API" ]; then
  echo "API configurada: $API"
  curl -s -o /dev/null -w "API -> HTTP %{http_code}\n" \
    "$API/store/regions" 2>/dev/null || echo "API não respondeu"
else
  echo "NEXT_PUBLIC_MEDUSA_BACKEND_URL não encontrada"
fi

echo
echo "========================================"
echo " FIM DO LEVANTAMENTO"
echo "========================================"
