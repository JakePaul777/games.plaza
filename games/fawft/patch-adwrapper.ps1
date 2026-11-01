<# Stops the "Can not preload an ad without an provider" errors.
   With the ad provider removed, the ad library's wrapper threw on every call (menu load, retry, etc.).
   This makes those calls do nothing instead. Run from the game root:
   powershell -ExecutionPolicy Bypass -File .\patch-adwrapper.ps1   (safe to re-run) #>
$file = Join-Path (Get-Location).Path 'fireboy-and-watergirl-forest-temple.min.js'
if (-not (Test-Path $file)) { Write-Host "Not found: $file (run from the game root)" -ForegroundColor Red; exit 1 }
$text = [IO.File]::ReadAllText($file)
$re   = 'if\(null===this\.provider\)throw new Error\("Can not [a-z]+ an ad without an provider, please attach an ad provider!"\);'
$n    = ([regex]::Matches($text, $re)).Count
if ($n -eq 0) { Write-Host "Nothing to patch (already done?)." -ForegroundColor DarkGray; exit 0 }
if (-not (Test-Path "$file.bak")) { Copy-Item $file "$file.bak" }
$text = [regex]::Replace($text, $re, 'if(null===this.provider)return!1;')
[IO.File]::WriteAllText($file, $text, (New-Object Text.UTF8Encoding $false))
Write-Host "Patched $n ad-wrapper checks. Hard-refresh (Ctrl+F5)." -ForegroundColor Green
