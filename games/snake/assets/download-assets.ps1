# download-assets.ps1  -- put this in your assets/ folder and run it there:
#   powershell -ExecutionPolicy Bypass -File .\download-assets.ps1
# Add -Force to re-download files that already exist.
param([switch]$Force)

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = 'Continue'

$assets = $PSScriptRoot
$root   = Split-Path $assets -Parent          # folder that holds index.html
$mods   = Join-Path $root 'mods'
$snake  = 'https://www.google.com/logos/fnbx/snake_arcade'
$gh     = 'https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main'
$failed = New-Object System.Collections.ArrayList

function Get-File($url, $dest) {
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0) -and -not $Force) { Write-Host "skip  $dest"; return }
  New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
    Write-Host "ok    $dest"
  } catch {
    Write-Host "FAIL  $url" -ForegroundColor Red
    if (Test-Path $dest) { Remove-Item $dest -Force }
    [void]$failed.Add($url)
  }
}

# ---- 1. Google snake images -> assets/www.google.com/logos/fnbx/snake_arcade/<sub> ----
$sub = @(
  'v3/speed_00.png','v3/speed_01.png','v3/speed_02.png','v3/apple_00.png',
  'v4/size_00.png','v4/size_01.png','v4/size_02.png',
  'v5/color_10.png','v5/color_18.png',
  'v12/trophy_10.png','pixel/px_trophy_10.png',
  'v17/trophy_15.png','v17/count_00.png','v17/count_01.png','v17/count_02.png','v17/apple_22.png',
  'v18/trophy_16.png','v18/count_03.png','v18/count_04.png','v18/count_05.png',
  'v19/trophy_17.png','v19/count_06.png',
  'v20/trophy_18.png','v21/trophy_19.png','v22/trophy_20.png',
  'keys.svg'
)
0..15 | ForEach-Object { $sub += ('v16/trophy_{0:D2}.png' -f $_) }
foreach ($s in $sub) {
  Get-File "$snake/$s" (Join-Path $assets ("www.google.com/logos/fnbx/snake_arcade/" + $s))
}

# ---- 2. gstatic play arrow ----
$ga = 'googlematerialicons/play_arrow/v6/white-24dp/2x/gm_play_arrow_white_24dp.png'
Get-File "https://fonts.gstatic.com/s/i/$ga" (Join-Path $assets "fonts.gstatic.com/s/i/$ga")

# ---- 3. postimg Empty.png ----
Get-File 'https://i.postimg.cc/LhKWc2Wb/Empty.png' (Join-Path $assets 'postimg/Empty.png')

# ---- 4. MorePudding mod, CSS and libraries -> <root>/mods ----
Get-File "$gh/MorePudding.js"        (Join-Path $mods 'MorePudding.js')
Get-File "$gh/bootstrap-stripped.css" (Join-Path $mods 'bootstrap-stripped.css')
$libs = 'Core','Theme','DistinctVisual','Counter','ModeRegistry','TimeKeeper','Fruit','GraphicsMix','TopBar','SnakeColor','SettingsSaver','FpsCounter','SpeedInfo','InputDisplay','Timer','SplitPanel','Backup','BootstrapMenu','ResetKey','RenderDelayFix','CustomBowl'
foreach ($l in $libs) { Get-File "$gh/Libraries/$l.js" (Join-Path $mods "Libraries/$l.js") }

# ---- 4b. carlgustavh size icons -> assets/size-images ----
$cg = 'https://github.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/blob/main'
$cgRaw = 'https://raw.githubusercontent.com/carlgustavh/GoogleSnakeCustomMenuStuffImages/main'
foreach ($n in 'Micro','Tiny','Super Big','Too Big','Humongous','Way Too Big') {
  Get-File ("$cgRaw/" + $n.Replace(' ','%20') + '.png') (Join-Path $assets "size-images/$n.png")
}

# ---- 5. Point everything at the local copies ----
function Patch($path, $pairs) {
  if (-not (Test-Path $path)) { return }
  $t = [IO.File]::ReadAllText($path)
  foreach ($p in $pairs) { $t = $t.Replace($p[0], $p[1]) }
  [IO.File]::WriteAllText($path, $t, (New-Object Text.UTF8Encoding($false)))
  Write-Host "patched $path"
}
$mp = @(
  @("$gh/Libraries/", 'mods/Libraries/'),
  @("$gh/bootstrap-stripped.css", 'mods/bootstrap-stripped.css'),
  @('https://www.google.com/logos/', 'assets/www.google.com/logos/'),
  @('https://fonts.gstatic.com/', 'assets/fonts.gstatic.com/'),
  @('https://i.postimg.cc/LhKWc2Wb/Empty.png', 'assets/postimg/Empty.png'),
  @("$cg/Micro.png?raw=true", 'assets/size-images/Micro.png'),
  @("$cg/Tiny.png?raw=true", 'assets/size-images/Tiny.png'),
  @("$cg/Super%20Big.png?raw=true", 'assets/size-images/Super Big.png'),
  @("$cg/Too%20Big.png?raw=true", 'assets/size-images/Too Big.png'),
  @("$cg/Humongous.png?raw=true", 'assets/size-images/Humongous.png'),
  @("$cg/Way%20Too%20Big.png?raw=true", 'assets/size-images/Way Too Big.png')
)
Patch (Join-Path $mods 'MorePudding.js') $mp
$mi = @( ,@("$gh/MorePudding.js", 'mods/MorePudding.js') )
Patch (Join-Path $root 'mod-info.json') $mi

Write-Host ""
if ($failed.Count -gt 0) {
  Write-Host "$($failed.Count) download(s) failed:" -ForegroundColor Yellow
  $failed | ForEach-Object { Write-Host "  $_" }
  Write-Host "Failed Google images are usually retired versions; local-assets.js falls back to v22 for trophies."
} else { Write-Host "All done." -ForegroundColor Green }
