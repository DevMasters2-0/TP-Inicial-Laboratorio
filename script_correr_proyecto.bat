@echo off
title Ejecutar Proyectos Node.js con Vite

rem Obtiene la ruta del directorio donde está ubicado este script
set "SCRIPT_DIR=%~dp0"

rem Cambia a la carpeta del proyecto client, ejecuta npm install y luego npm run dev
start "Client" cmd /k "cd /d %SCRIPT_DIR%client && npm install && npm run dev"

rem Cambia a la carpeta del proyecto admin, ejecuta npm install y luego npm run dev
start "Admin" cmd /k "cd /d %SCRIPT_DIR%admin && npm install && npm run dev"

rem Cambia a la carpeta del proyecto backend, ejecuta npm install y luego npm run dev
start "Backend" cmd /k "cd /d %SCRIPT_DIR%backend && npm install && npm run dev"

echo Todos los proyectos están siendo instalados y ejecutados.
pause