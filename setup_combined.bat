@echo off
echo ========================================
echo    YieldWeaver - Project Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo Installing all dependencies...
call npm run install:all

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Run start_all.bat to start both services
echo 2. Or run start-frontend.bat for frontend only
echo 3. Or run start_backend.bat for backend only
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:3001
echo.
pause
