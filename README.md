# NMS

**Objetivo:** Proporcionar funcionalidades para gestionar incidencias urbanas

**Tecnologias:** React + Node.js (con Typescript) + SQLite

**Requisitos Previos:**
- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación de Dependencias

Primero, clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/imdaviddev/TP-Inicial-Laboratorio.git
cd TP-Inicial-Laboratorio
```

### Variables de Entorno
Crea un archivo .env.local en la raíz del proyecto y añade las siguientes variables,
si quieres saber tu ip en la consola del backend aparecerá, las ip's disponibles en tu maquina:

```
VITE_IP=TU_IP:3000
```

### Ejecución del Servidor
Para iniciar el servidor, ejecuta:

```bash
cd backend
npm install
npm run dev
```
> El servidor estará disponible en http://localhost:3000.

### Ejecucion del Client
Para iniciar el client, ejecuta:

```bash
cd client
npm install
npm run dev
```

### Ejecucion del Admin
Para iniciar el servidor, ejecuta:

```bash
cd admin
npm install
npm run dev
```

### Ejecucion con Script
Si se encuentran en Window pueden correr el archivo,
lo que hará que se ejecuten todos los anteriores comandos automaticamente
```
script_correr_proyecto.bat
```

### Estructura del Proyecto
```bash
--/src
  |
  |--/controllers    # Controladores de la API
  |--/models         # Modelos de datos
  |--/routes         # Rutas de la API
  |--/utils          # Utilidades
     |--/validations # Validaciones
  |--app.ts          # Punto de entrada
```

### Endpoints de la API
La base URL de la API es http://localhost:3000/.

[GET] /incidencias
Descripción: Obtiene una lista de icidencias.

## Parámetros de Consulta:

Respuesta:

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "dni": 12345678,
  "email": "juan.perez@test.com",
  "tema": "piso roto",
  "nivelDeRiesgo": "bajo",
  "localidad": "San Miguel",
  "descripcion": "El piso de la cocina está roto y necesita reparación.",
  "fechaDeCreacion": "2024-08-31T12:00:00Z",
  "ubicacion": {
    "latitud": -34.5898,
    "longitud": -58.4444
  },
  "estado": "En Revision"
}
```
Errores:

404 Not Found - No se encontraron items.
### [POST] /items
Descripción: Crea un nueva solicitud de incidencia. Una solicitud de 
incidencia se creará con el estado de "En Revision" por defecto.

