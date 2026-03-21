# Redirect .next to %LOCALAPPDATA% (avoids OneDrive EPERM on .next/trace).
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts/junction-next-cache.ps1

$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$target = Join-Path $env:LOCALAPPDATA "seaside-contracting-next"
$link = Join-Path $root ".next"

Write-Host "Project: $root"
Write-Host "Cache target: $target"

New-Item -ItemType Directory -Force -Path $target | Out-Null

if (Test-Path $link) {
  $item = Get-Item $link -Force
  if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    Write-Host ".next is already a junction - removing link only."
    cmd /c "rmdir `"$link`""
  } else {
    Write-Host "Renaming existing .next away (pause OneDrive if this fails)..."
    $stamp = [DateTime]::UtcNow.ToString("yyyyMMddHHmmss")
    Rename-Item -LiteralPath $link -NewName ".next.bak-$stamp" -Force
  }
}

cmd /c "mklink /J `"$link`" `"$target`""
if ($LASTEXITCODE -eq 0) {
  Write-Host "OK: .next -> $target"
  Write-Host "Run: npm run dev"
} else {
  Write-Host "mklink failed. Pause OneDrive, delete .next manually, run this script again."
  exit 1
}
