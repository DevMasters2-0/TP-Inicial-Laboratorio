@echo off
title Ejecutar Proyectos Node.js con Vite

rem Obtiene la ruta del directorio donde está ubicado este script
set "SCRIPT_DIR=%~dp0"

rem Cambia a la carpeta del proyecto client y ejecuta Vite
start "Client" cmd /k "cd /d %SCRIPT_DIR%client && npm run dev"

rem Cambia a la carpeta del proyecto admin y ejecuta Vite
start "Admin" cmd /k "cd /d %SCRIPT_DIR%admin && npm run dev"

rem Cambia a la carpeta del proyecto backend y ejecuta Vite
start "Backend" cmd /k "cd /d %SCRIPT_DIR%backend && npm run dev"

echo Todos los proyectos se están ejecutando.
pause