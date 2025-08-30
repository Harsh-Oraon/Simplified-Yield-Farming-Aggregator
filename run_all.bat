@echo off
echo Starting Yield Farming Aggregator...
echo.

echo Starting Backend Server...
cd /d "%~dp0"
start "Backend" cmd /k "node server.js"

echo Starting Frontend Server...
cd /d "%~dp0\frontend"
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:8080
echo.
echo Opening frontend in browser...
timeout /t 5 /nobreak >nul
start http://localhost:8080

echo Done! Check the command windows for server status.
pause
