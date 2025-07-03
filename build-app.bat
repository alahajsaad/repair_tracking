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

cd dist

rem Clean existing static folder
if exist "%ROOT_DIR%\api\src\main\resources\static" (
    rmdir /S /Q "%ROOT_DIR%\api\src\main\resources\static"
)
mkdir "%ROOT_DIR%\api\src\main\resources\static"

echo Copying build to static folder...
xcopy * "%ROOT_DIR%\api\src\main\resources\static" /E /I /Y || goto :error

rem ----------------------------------------
cd %ROOT_DIR%

echo [Step 3/4] Build Spring Boot app
cd api

call mvn clean package -DskipTests || goto :error

rem ----------------------------------------
echo [Step 4/4] Copy JAR to deployment folder

set JAR_SOURCE=C:\Users\MSI\.jenkins\workspace\repair_tracking_build_job\api\target
set JAR_DEST=F:\repair_tracking_app

echo Ensuring destination folder exists...
if not exist "%JAR_DEST%" (
    mkdir "%JAR_DEST%"
)

echo Copying JAR from %JAR_SOURCE% to %JAR_DEST%...
xcopy "%JAR_SOURCE%\*.jar" "%JAR_DEST%" /Y || goto :error



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
