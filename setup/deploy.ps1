# StudyCrew: уборка старых файлов, сборка и публикация на Cloudflare Workers.
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$log = Join-Path $PSScriptRoot 'deploy-log.txt'
Start-Transcript -Path $log -Force | Out-Null
$env:CF_SEND_TELEMETRY = 'false'

function Step($text) { Write-Host ''; Write-Host "=== $text ===" -ForegroundColor Cyan }
function Fail($text) { Write-Host ''; Write-Host "ОШИБКА: $text" -ForegroundColor Red; Stop-Transcript | Out-Null; exit 1 }

Step 'Проверка инструментов'
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) { Fail 'Node.js не установлен. Установите Node.js 22 LTS или новее с https://nodejs.org и запустите скрипт ещё раз.' }
$nodeVersion = (& node -v)
Write-Host "Node.js $nodeVersion"
$parts = $nodeVersion.TrimStart('v').Split('.')
if ([int]$parts[0] -lt 22 -or ([int]$parts[0] -eq 22 -and [int]$parts[1] -lt 18)) {
  Fail "Нужен Node.js 22.18 или новее (сейчас $nodeVersion). Обновите Node.js с https://nodejs.org и запустите скрипт ещё раз."
}
Write-Host "npm $(& npm.cmd -v)"
$git = Get-Command git -ErrorAction SilentlyContinue
if ($git) { Write-Host (& git --version) } else { Write-Host 'git: не установлен' }
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh) { Write-Host ((& gh --version) | Select-Object -First 1) } else { Write-Host 'gh: не установлен' }

Step 'Уборка файлов старой версии сайта (в Корзину)'
Add-Type -AssemblyName Microsoft.VisualBasic
foreach ($name in 'index.html') {
  $p = Join-Path $root $name
  if (Test-Path $p -PathType Leaf) {
    [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($p, 'OnlyErrorDialogs', 'SendToRecycleBin')
    Write-Host "В Корзине: $name"
  }
}
foreach ($name in 'src', 'offline', 'dist') {
  $p = Join-Path $root $name
  if (Test-Path $p -PathType Container) {
    [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory($p, 'OnlyErrorDialogs', 'SendToRecycleBin')
    Write-Host "В Корзине: $name\"
  }
}

Step 'GitHub Actions workflow'
$wfDir = Join-Path $root '.github\workflows'
$wfSrc = Join-Path $PSScriptRoot 'github-actions-deploy.yml'
$wfDst = Join-Path $wfDir 'deploy.yml'
if (Test-Path $wfSrc) {
  New-Item -ItemType Directory -Force -Path $wfDir | Out-Null
  Move-Item -Force $wfSrc $wfDst
  Write-Host 'Перемещён в .github\workflows\deploy.yml'
} elseif (Test-Path $wfDst) {
  Write-Host 'Уже на месте: .github\workflows\deploy.yml'
}

Step 'Установка зависимостей (npm ci)'
& npm.cmd ci 2>&1 | Tee-Object -FilePath (Join-Path $PSScriptRoot 'deploy-output.txt')
if ($LASTEXITCODE -ne 0) { Fail 'npm ci завершился с ошибкой.' }

Step 'Сборка сайта'
& npm.cmd run build 2>&1 | Tee-Object -FilePath (Join-Path $PSScriptRoot 'deploy-output.txt') -Append
if ($LASTEXITCODE -ne 0) { Fail 'Сборка завершилась с ошибкой.' }

Step 'Вход в Cloudflare'
Write-Host 'Сейчас откроется браузер. Войдите в Cloudflare и нажмите Allow / Разрешить.' -ForegroundColor Yellow
& npx.cmd cf auth login
if ($LASTEXITCODE -ne 0) { Fail 'Вход в Cloudflare не выполнен.' }

Step 'Публикация на Cloudflare Workers'
& npx.cmd vinext-cloudflare deploy --skip-build 2>&1 | Tee-Object -FilePath (Join-Path $PSScriptRoot 'deploy-output.txt') -Append
if ($LASTEXITCODE -ne 0) { Fail 'Публикация завершилась с ошибкой.' }

Write-Host ''
Write-Host 'ГОТОВО: сайт опубликован. Адрес указан выше (…workers.dev).' -ForegroundColor Green
Stop-Transcript | Out-Null
