# Run this from inside the /basketrandom/ folder:
#   powershell -ExecutionPolicy Bypass -File .\download-missing.ps1

$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$base = 'https://files.twoplayergames.org/files/games/other/Basket_Random/'

$files = @(
    # root
    'box2d.wasm',

    # images
    'images/shared-0-sheet0.png',
    'images/shared-0-sheet1.png',
    'images/shared-0-sheet2.png',
    'images/shared-0-sheet3.png',
    'images/shared-1-sheet0.png',
    'images/shared-1-sheet1.png',
    'images/shared-1-sheet2.png',
    'images/ballline-sheet0.png',
    'images/rightshoe-sheet0.png',
    'images/hair-sheet0.png',
    'images/tshirt-sheet0.png',
    'images/rightshort-sheet0.png',
    'images/groundtile-sheet0.png',
    'images/fencetile-sheet0.png',
    'images/grasstile-sheet0.png',
    'images/cloudtile-sheet0.png',
    'images/buildingtile-sheet0.png',
    'images/buildingtile2-sheet0.png',
    'images/buildingtile3-sheet0.png',
    'images/startile-sheet0.png',
    'images/titlebg-sheet0.png',
    'images/titlechars-sheet0.png',
    'images/game_bg-sheet0.png',
    'images/groundtilesnow-sheet0.png',
    'images/seatile-sheet0.png',
    'images/potatiled-sheet0.png',
    'images/groundtileplaj-sheet0.png',
    'images/grasslinetile-sheet0.png',
    'images/groundtileindoor-sheet0.png',
    'images/indoorbgtile-sheet0.png',
    'images/indoorbgtile2-sheet0.png',
    'images/indoorbgtile3-sheet0.png',
    'images/snowtile-sheet0.png',

    # audio (.webm)
    'media/buttonx.webm',
    'media/start.webm',
    'media/win.webm',
    'media/jump.webm',
    'media/intro-button.webm',
    'media/bup.webm',
    'media/bellsoc.webm',
    'media/intro-sound.webm',
    'media/goasoc.webm',
    'media/refsoc.webm',
    'media/file.webm',
    'media/wrong.webm',
    'media/menu.webm',
    'media/press.webm',
    'media/music.webm',
    'media/metal.webm'
)

# Extra files Construct 3 exports often have. Failures here are silent/optional.
$optional = @(
    'icons/icon-16.png',
    'icons/icon-32.png',
    'icons/icon-64.png',
    'icons/icon-128.png',
    'icons/icon-256.png',
    'icons/icon-512.png',
    'icons/loading-logo.png',
    'data.json',
    'offline.json',
    'appmanifest.json',
    'sw.js',
    'workermain.js',
    'dispatchworker.js',
    'jobworker.js',
    'box2d.wasm.js',
    'box2d.wasm.wasm'
)
# Also grab the .m4a fallback for every .webm (Safari etc.)
$optional += ($files | Where-Object { $_ -like 'media/*.webm' } | ForEach-Object { $_ -replace '\.webm$', '.m4a' })

$ok = 0; $skipped = 0; $failed = @()
$wc = New-Object System.Net.WebClient
$wc.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
$wc.Headers.Add('Referer', $base + 'index.html')

function Get-One($rel, $isOptional) {
    $dest = Join-Path (Get-Location) ($rel -replace '/', '\')
    $dir  = Split-Path $dest -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) {
        Write-Host "SKIP  $rel (already exists)" -ForegroundColor DarkGray
        $script:skipped++
        return
    }
    try {
        $wc.DownloadFile($base + $rel, $dest)
        Write-Host "OK    $rel" -ForegroundColor Green
        $script:ok++
    } catch {
        if (Test-Path $dest) { Remove-Item $dest -Force -ErrorAction SilentlyContinue }
        if ($isOptional) {
            Write-Host "n/a   $rel (optional, not on server)" -ForegroundColor DarkYellow
        } else {
            Write-Host "FAIL  $rel  -> $($_.Exception.Message)" -ForegroundColor Red
            $script:failed += $rel
        }
    }
}

foreach ($f in $files)    { Get-One $f $false }
foreach ($f in $optional) { Get-One $f $true }

Write-Host ""
Write-Host "Done. Downloaded: $ok  Skipped: $skipped  Failed: $($failed.Count)"
if ($failed.Count -gt 0) {
    Write-Host "Failed files:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
}
