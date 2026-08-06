# =====================================================================
# Script PowerShell: Tornar Imagens Quadradas e Atualizar PostgreSQL
# =====================================================================

$imageFolder = "C:\Users\AM\Desktop\ZAP\minha-loja\apps\storefront\public\images"

# Configurações do Banco de Dados PostgreSQL
$dbHost = "localhost"
$dbPort = "5432"
$dbName = "nome_do_banco"     # Substitua pelo nome do seu banco
$dbUser = "postgres"           # Substitua pelo seu usuário
$dbPassword = "sua_senha"       # Substitua pela sua senha

if (!(Test-Path $imageFolder)) {
    Write-Host "[ERRO] A pasta não foi encontrada: $imageFolder" -ForegroundColor Red
    exit
}

Add-Type -AssemblyName System.Drawing

Write-Host "[INFO] Processando e tornando as imagens quadradas..." -ForegroundColor Cyan
$images = Get-ChildItem -Path $imageFolder -Filter "*.jpg"

if ($images.Count -eq 0) {
    Write-Host "[AVISO] Nenhuma imagem .jpg encontrada na pasta." -ForegroundColor Yellow
    exit
}

foreach ($img in $images) {
    $filePath = $img.FullName
    $productIdentifier = $img.BaseName
    $imagePath = "/images/$($img.Name)"

    try {
        $bmp = [System.Drawing.Image]::FromFile($filePath)
        $width = $bmp.Width
        $height = $bmp.Height

        if ($width -ne $height) {
            $maxSide = [Math]::Max($width, $height)
            $squareBmp = New-Object System.Drawing.Bitmap $maxSide, $maxSide
            $graphics = [System.Drawing.Graphics]::FromImage($squareBmp)
            
            $graphics.Clear([System.Drawing.Color]::White)

            $x = [Math]::Floor(($maxSide - $width) / 2)
            $y = [Math]::Floor(($maxSide - $height) / 2)

            $graphics.DrawImage($bmp, $x, $y, $width, $height)
            
            $bmp.Dispose()
            $graphics.Dispose()

            $squareBmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            $squareBmp.Dispose()

            Write-Host "[QUADRADA] Ajustada: $($img.Name) ($maxSide x $maxSide)" -ForegroundColor Yellow
        } else {
            $bmp.Dispose()
            Write-Host "[JÁ É QUADRADA]: $($img.Name)" -ForegroundColor DarkGray
        }

        $sqlQuery = "UPDATE products SET image_url = '$imagePath' WHERE sku = '$productIdentifier';"
        $env:PGPASSWORD = $dbPassword
        psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -c "$sqlQuery" 2>&1 | Out-Null

    } catch {
        Write-Host "[ERRO] Falha ao processar $($img.Name): $_" -ForegroundColor Red
    }
}

Write-Host "--------------------------------------------------------"
Write-Host "[SUCESSO] Imagens redimensionadas para formato quadrado e banco atualizado!" -ForegroundColor Green