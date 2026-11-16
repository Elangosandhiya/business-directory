@echo off
echo ====================================================
echo Starting Coimbatore Business Directory Full-Stack App
echo ====================================================

REM Set PATH to use included portable node & npm
set PATH=%~dp0tools\node;%PATH%

echo Starting Backend Server on http://localhost:5000 ...
start "Backend Server (Port 5000)" cmd /k "cd /d %~dp0server && npm start"

echo Starting Frontend Client on http://localhost:5173 ...
start "Frontend Client (Port 5173)" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo Both servers are launching in separate windows!
echo Once loaded, open your browser at: http://localhost:5173
echo ====================================================
pause
