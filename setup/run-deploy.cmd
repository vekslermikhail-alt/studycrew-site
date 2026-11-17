@echo off
rem StudyCrew: cleanup, build and deploy to Cloudflare Workers.
rem Double-click this file. It runs setup\deploy.ps1 and keeps the window open.
cd /d "%~dp0.."
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
echo.
pause
