@echo off
rem StudyCrew: publish the already built site to Cloudflare Workers (no reinstall, no rebuild).
cd /d "%~dp0.."
set CF_SEND_TELEMETRY=false
call npx.cmd vinext-cloudflare deploy --skip-build
echo.
if errorlevel 1 (echo ERROR: deploy failed.) else (echo DONE: site published. The address is shown above.)
pause
