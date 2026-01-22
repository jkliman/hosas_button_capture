@echo off
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

:: Start the app
echo Starting Gamepad Button Mapper...
call npm start
