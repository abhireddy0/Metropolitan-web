# Downloads the site's stock photography from Unsplash (pre-cropped WebP), and prepares
# brand assets (logo crop, certificate JPEGs, social preview image).
# Usage: powershell -File scripts/fetch-images.ps1 -AuditDir <dir with logo.png and certificate pngs>
param([string]$AuditDir)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$images = Join-Path $root 'public\images'
$services = 'skilled-nursing', 'physical-therapy', 'occupational-therapy', 'speech-therapy', 'health-aide', 'social-worker', 'infusion-therapy', 'palliative-care', 'specialized-care', 'homemaker'
# blog-* -> images/blog, service slugs -> images/services, everything else -> images/pages
function Get-Target($name) {
  if ($name.StartsWith('blog-')) { return Join-Path $images ('blog\' + $name.Substring(5)) }
  if ($services -contains $name) { return Join-Path $images ('services\' + $name) }
  return Join-Path $images ('pages\' + $name)
}
foreach ($d in 'blog', 'services', 'pages', 'logos', 'awards') { New-Item -ItemType Directory -Force (Join-Path $images $d) | Out-Null }

# 1. Stock photos
Get-Content (Join-Path $PSScriptRoot 'images.txt') | Where-Object { $_ -and -not $_.StartsWith('#') } | ForEach-Object {
  $name, $id, $w, $h, $q = $_.Split("|"); if (-not $q) { $q = 70 }
  $file = (Get-Target $name) + ".webp"
  if (-not (Test-Path $file)) {
    $url = "https://images.unsplash.com/photo-$id" + "?w=$w&h=$h&fit=crop&crop=faces,entropy&fm=webp&q=$q"
    Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $file
  }
  # small card variant for 1200x900 / 1200x675 images
  if ($w -eq '1200') {
    $sw = 640; $sh = [int]([int]$h * 640 / 1200)
    $small = (Get-Target $name) + "-640.webp"
    if (-not (Test-Path $small)) {
      Invoke-WebRequest -UseBasicParsing -Uri ("https://images.unsplash.com/photo-$id" + "?w=$sw&h=$sh&fit=crop&crop=faces,entropy&fm=webp&q=$q") -OutFile $small
    }
  }
}

function Save-Jpeg($bmp, $path, $quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bmp.Save($path, $codec, $p)
}

function Get-Bounds($bmp) {
  $minX = $bmp.Width; $minY = $bmp.Height; $maxX = 0; $maxY = 0
  for ($y = 0; $y -lt $bmp.Height; $y += 1) { for ($x = 0; $x -lt $bmp.Width; $x += 1) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.A -gt 20 -and -not ($c.R -gt 245 -and $c.G -gt 245 -and $c.B -gt 245)) {
      if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
    } } }
  return New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
}

if ($AuditDir) {
  # 2. Logo: trim the padding around the mark
  $logo = [System.Drawing.Bitmap]::FromFile((Join-Path $AuditDir 'logo.png'))
  $r = Get-Bounds $logo
  $crop = $logo.Clone($r, $logo.PixelFormat)
  $crop.Save((Join-Path $images 'logos\logo.png'), [System.Drawing.Imaging.ImageFormat]::Png)
  # icon-only (the cross), left square portion of the trimmed logo
  $iconRect = New-Object System.Drawing.Rectangle 0, 0, $r.Height, $r.Height
  $icon = $crop.Clone($iconRect, $crop.PixelFormat)
  foreach ($s in 32, 180, 192) {
    $b = New-Object System.Drawing.Bitmap $s, $s
    $g = [System.Drawing.Graphics]::FromImage($b); $g.InterpolationMode = 'HighQualityBicubic'
    if ($s -eq 180) { $g.Clear([System.Drawing.Color]::White) }
    $g.DrawImage($icon, 0, 0, $s, $s); $g.Dispose()
    $name = @{ 32 = 'favicon-32.png'; 180 = 'apple-touch-icon.png'; 192 = 'icon-192.png' }[$s]
    $b.Save((Join-Path $images ('logos\' + $name)), [System.Drawing.Imaging.ImageFormat]::Png); $b.Dispose()
  }
  Write-Output ("logo trimmed to " + $r.Width + "x" + $r.Height)

  # 3. Certificates -> JPEG at 1000px wide
  foreach ($c in 'certificate1', 'certificate_2006', 'certificate_2007', 'certificate_2008', 'certificate_2009') {
    $src = [System.Drawing.Image]::FromFile((Join-Path $AuditDir "cur\certificates_$c.png"))
    $tw = [Math]::Min(1000, $src.Width); $th = [int]($src.Height * $tw / $src.Width)
    $b = New-Object System.Drawing.Bitmap $tw, $th
    $g = [System.Drawing.Graphics]::FromImage($b); $g.Clear([System.Drawing.Color]::White); $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($src, 0, 0, $tw, $th); $g.Dispose()
    Save-Jpeg $b (Join-Path $images ("awards\award-" + $c.Replace('certificate_', '').Replace('certificate1', '2019') + '.jpg')) 82
    Write-Output ("award " + $c + " " + $tw + "x" + $th)
    $b.Dispose(); $src.Dispose()
  }

  # 4. Social preview 1200x630: cream panel with logo + headline, photo on the right
  $og = New-Object System.Drawing.Bitmap 1200, 630
  $g = [System.Drawing.Graphics]::FromImage($og)
  $g.SmoothingMode = 'AntiAlias'; $g.InterpolationMode = 'HighQualityBicubic'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#FBF7F0'))
  $tmp = Join-Path $env:TEMP 'og-photo.jpg'
  Invoke-WebRequest -UseBasicParsing -Uri 'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=560&h=630&fit=crop&crop=faces&fm=jpg&q=85' -OutFile $tmp
  $photo = [System.Drawing.Image]::FromFile($tmp)
  $g.DrawImage($photo, 640, 0, 560, 630); $photo.Dispose()
  $lw = 380; $lh = [int]($crop.Height * $lw / $crop.Width)
  $g.DrawImage($crop, 64, 72, $lw, $lh)
  $ink = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#1F3A2E'))
  $muted = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#5A574F'))
  $f1 = New-Object System.Drawing.Font 'Georgia', 40, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $f2 = New-Object System.Drawing.Font 'Segoe UI', 24, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawString("Skilled home health care`nacross Chicagoland.", $f1, $ink, (New-Object System.Drawing.RectangleF 64, (110 + $lh), 560, 120))
  $g.DrawString("Medicare-certified  |  Licensed by IDPH`n(847) 568-1033", $f2, $muted, (New-Object System.Drawing.RectangleF 64, (250 + $lh), 560, 80))
  $g.Dispose()
  Save-Jpeg $og (Join-Path $root 'public\og-image.jpg') 85
  $og.Dispose(); $crop.Dispose(); $logo.Dispose()
}
Get-ChildItem $images -Recurse -File | Measure-Object -Property Length -Sum | ForEach-Object { "{0} files, {1:N0} KB" -f $_.Count, ($_.Sum / 1KB) }
