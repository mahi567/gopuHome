@echo off
rem Double-click to open the content editor. Keep this window open while editing.
cd /d "%~dp0"
if not exist node_modules call npm install
call npm run edit
pause
