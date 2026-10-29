# Full-page screenshots of the local preview with headless Chrome.
# Usage: scripts/shoot.ps1 -Paths "/","/about" -Width 1440 -Height 4000 -Out <dir>
param([string[]]$Paths = @('/'), [int]$Width = 1440, [int]$Height = 4200, [string]$Out = "$PSScriptRoot\..\screens", [string]$Base = 'http://localhost:4321')
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
New-Item -ItemType Directory -Force $Out | Out-Null
foreach ($p in $Paths) {
  $name = if ($p -eq '/') { 'home' } else { $p.Trim('/').Replace('/', '_') }
  $file = Join-Path (Resolve-Path $Out) "$name-$Width.png"
  & $chrome --headless=new --disable-gpu --hide-scrollbars --no-first-run --force-device-scale-factor=1 "--window-size=$Width,$Height" "--screenshot=$file" --virtual-time-budget=6000 "$Base$p" 2>$null | Out-Null
  Write-Output $file
}
