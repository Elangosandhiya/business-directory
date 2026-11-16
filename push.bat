@echo off
echo Pushing local main branch to GitHub repository...
"%~dp0tools\git\cmd\git.exe" push -u origin main
echo.
pause
