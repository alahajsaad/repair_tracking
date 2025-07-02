@echo off
echo Build React app
cd ui
call npm install
call npm run build

echo Copy React build to Spring Boot static folder
cd build
xcopy * "..\..\api\src\main\resources\static" /E /I /Y

cd ..\..

echo Build Spring Boot app
cd api
call mvn clean package

cd ..
echo Build complete!
pause


