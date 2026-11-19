@echo off
rem Double-click to build the website. Upload the contents of the "dist" folder to your web host.
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run build
echo.
echo Done. The finished website is in the "dist" folder.
pause
