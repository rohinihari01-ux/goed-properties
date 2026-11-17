@echo off
title Goed Properties Local Server
cd /d "%~dp0"

echo ===================================================
echo   Starting Goed Properties Website...
echo ===================================================
echo.
echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo.
node server.js
pause
