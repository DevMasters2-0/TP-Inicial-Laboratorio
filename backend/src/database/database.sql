CREATE TABLE IF NOT EXISTS incidencia (
    incidencia_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    dni TEXT,
    email TEXT,
    tema TEXT,
    nivelDeRiesgo TEXT,
    localidad TEXT,
    descripcion TEXT,
    fechaDeCreacion TEXT,  -- Guardar fecha en formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
    latitud REAL,
    longitud REAL,
    estado TEXT,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS administrator (
    admin_id INTEGER PRIMARY KEY,
    user TEXT UNIQUE,
    pass TEXT,
    nombre TEXT,
    apellido TEXT,
    url_perfil TEXT,
    fecha_creacion TEXT,
    Rol TEXT
);

CREATE TABLE IF NOT EXISTS registro (
    registro_id INTEGER PRIMARY KEY,
    fecha TEXT,
    cantidad_incidencias INTEGER
);

CREATE TABLE IF NOT EXISTS registro_incidencia (
    registro_incidencia_id INTEGER PRIMARY KEY,
    register_id INTEGER,
    incident_id INTEGER,
    FOREIGN KEY(register_id) REFERENCES registro(registro_id),
    FOREIGN KEY(incident_id) REFERENCES incidencia(incidencia_id)
);

INSERT OR IGNORE INTO incidencia (incidencia_id, nombre, dni, email, tema, nivelDeRiesgo, localidad, descripcion, fechaDeCreacion, latitud, longitud, estado, image_url) VALUES
(1, 'David Cañete', '12345678A', 'juan.perez@test.com', 'piso roto', 'moderado', 'San Miguel', 'El piso de la cocina está roto y necesita reparación.', '2024-08-31T12:00:00Z', -34.5898, -58.4444, 'En Revisión', ''),
(2, 'German Lucero', '87654321B', 'ana.gomez@test.com', 'calle', 'bajo', 'Polvorines', 'La calle necesita limpieza.', '2024-08-31T12:00:00Z', -34.5900, -58.4450, 'Completado', ''),
(3, 'Francisco Gottig', '13579246C', 'luis.fernandez@test.com', 'alumbrado', 'urgente', 'Jose C Paz', 'El alumbrado público no funciona en la calle principal.', '2024-08-31T12:00:00Z', -34.5902, -58.4460, 'Anulado', ''),
(4, 'Ignacio Tula', '23456789B', 'ana.fernandez@ungs.edu.ar', 'piso roto', 'moderado', 'Polvorines', 'El piso de un edificio necesita reparación urgente.', '2024-08-31T12:00:00Z', -34.5899, -58.4446, 'En Revisión', ''),
(5, 'Laura García', '24681357D', 'laura.garcia@test.com', 'calle', 'alto', 'San Miguel', 'Hay baches grandes en la calle principal.', '2024-08-31T12:00:00Z', -34.5880, -58.4420, 'En Revisión', ''),
(6, 'Javier Martínez', '35795146E', 'javier.martinez@test.com', 'alumbrado', 'bajo', 'Polvorines', 'La luz de la calle está parpadeando.', '2024-08-31T12:00:00Z', -34.5910, -58.4465, 'Completado', ''),
(7, 'Patricia López', '46802457F', 'patricia.lopez@test.com', 'piso roto', 'bajo', 'Jose C Paz', 'El piso del baño está en mal estado.', '2024-08-31T12:00:00Z', -34.5875, -58.4480, 'En Revisión', ''),
(8, 'Carlos Fernández', '57913568G', 'carlos.fernandez@test.com', 'calle', 'moderado', 'San Miguel', 'El pavimento de la calle está agrietado.', '2024-08-31T12:00:00Z', -34.5905, -58.4425, 'En Revisión', ''),
(9, 'Sofia Martínez', '68024679H', 'sofia.martinez@test.com', 'alumbrado', 'alto', 'Polvorines', 'La calle está muy oscura por la falta de iluminación.', '2024-08-31T12:00:00Z', -34.5890, -58.4470, 'Anulado', ''),
(10, 'Andrés López', '79135780I', 'andres.lopez@test.com', 'piso roto', 'bajo', 'Jose C Paz', 'El piso de la cocina está resquebrajado.', '2024-08-31T12:00:00Z', -34.5865, -58.4490, 'Completado', '');

INSERT OR IGNORE INTO administrator (admin_id, user, pass, nombre, apellido, url_perfil, fecha_creacion, Rol)
VALUES 
(1, 'admin01', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Miguel Angel', 'Gabrielli', 'https://miweb.com/perfil/gmiguel', '2024-08-31T12:00:00Z', 'Admin'),
(2, 'admin02', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Ezequiel', 'Cañete', 'https://miweb.com/perfil/eca', '2024-08-31T12:00:00Z', 'Admin'),
(3, 'admin03', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Ignacio', 'Tula', 'https://miweb.com/perfil/itula', '2024-08-31T12:00:00Z', 'Admin'),
(4, 'admin04', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'German', 'Lucero', 'https://miweb.com/perfil/glucero', '2024-08-31T12:00:00Z', 'Admin');
