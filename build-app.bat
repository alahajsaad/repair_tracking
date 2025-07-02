@echo off
echo ========================================
echo === Build and package repair tracking app
echo ========================================

rem Save current folder
set ROOT_DIR=%cd%

rem ----------------------------------------
echo [Step 1/4] Build React app
cd ui

echo Installing npm dependencies...
call npm install || goto :error

echo Running React build...
call npm run build || goto :error

rem ----------------------------------------
echo [Step 2/4] Copy React build to Spring Boot static folder

cd build
rem Clean existing static folder
rmdir /S /Q "%ROOT_DIR%\api\src\main\resources\static"
mkdir "%ROOT_DIR%\api\src\main\resources\static"

echo Copying build to static folder...
xcopy * "%ROOT_DIR%\api\src\main\resources\static" /E /I /Y || goto :error

rem ----------------------------------------
cd %ROOT_DIR%

echo [Step 3/4] Build Spring Boot app
cd api

call mvn clean package || goto :error

rem ----------------------------------------
cd %ROOT_DIR%

echo ========================================
echo Build complete! Check api\target\*.jar
echo ========================================
pause
exit /b 0

:error
echo ========================================
echo BUILD FAILED! See error above.
echo ========================================
pause
exit /b 1
