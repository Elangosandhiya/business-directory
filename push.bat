@echo off
setlocal
echo ====================================================
echo Pushing local main branch to GitHub repository...
echo ====================================================
set "PATH=%~dp0tools\git\cmd;%~dp0tools\git\mingw64\bin;%PATH%"
"%~dp0tools\git\cmd\git.exe" push -u origin main
echo.
echo ====================================================
echo Done! If you see 'main -> main', your code is live.
echo ====================================================
pause
