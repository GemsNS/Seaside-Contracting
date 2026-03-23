# DEPRECATED — do not use with Next.js 15+ (App Router / bundled server chunks).
#
# A directory junction from .next -> %LOCALAPPDATA% places compiled server output
# outside the repo tree. Node then fails to resolve react/jsx-runtime from the
# project's node_modules (500 errors). Same class of issue as moving distDir.
#
# If you saw ENOENT on prerender-manifest.json: stop dev, run `npm run clean`,
# restart `npm run dev`. If clean fails with EPERM on .next\trace, close dev
# servers, pause OneDrive for this folder, then retry — keep .next inside the repo.
#
# See: docs/windows-onedrive.md

Write-Host ""
Write-Host "junction-next-cache.ps1 is disabled: redirecting .next breaks Next.js server resolution." -ForegroundColor Yellow
Write-Host "Use: npm run clean   then   npm run dev" -ForegroundColor Cyan
Write-Host "If EPERM: pause OneDrive for this project folder, close Node/Cursor handles on .next, retry clean."
Write-Host ""
exit 1
