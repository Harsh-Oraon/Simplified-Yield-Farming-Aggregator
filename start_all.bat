@echo off
echo ========================================
echo    YieldWeaver - Starting All Services
echo ========================================
echo.

echo Installing dependencies...
call npm run install:all

echo.
echo Starting backend server...
start "Backend Server" cmd /k "npm run dev:backend"

echo.
echo Starting frontend development server...
start "Frontend Server" cmd /k "npm run dev:frontend"

echo.
echo ========================================
echo    Services are starting...
echo ========================================
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
