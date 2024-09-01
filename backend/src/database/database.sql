CREATE TABLE IF NOT EXISTS incidencia (
    incidencia_id INTEGER PRIMARY KEY,
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
    estado TEXT
);

CREATE TABLE IF NOT EXISTS images (
    image_id INTEGER PRIMARY KEY,
    incident_id INTEGER,
    FOREIGN KEY (incident_id) REFERENCES incidencia(incidencia_id) 
);
CREATE TABLE IF NOT EXISTS administrator (
    admin_id INTEGER PRIMARY KEY,
    user TEXT,
    pass TEXT
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

INSERT OR IGNORE INTO incidencia (incidencia_id, nombre, dni, email, tema, nivelDeRiesgo, localidad, descripcion, fechaDeCreacion, latitud, longitud, estado) VALUES
(1, 'David cañete', '12345678A', 'juan.perez@test.com', 'piso roto', 'moderado', 'San Miguel', 'El piso de la cocina está roto y necesita reparación.', '2024-08-31', -34.5898, -58.4444, 'En Revisión'),
(2, 'German Lucero','87654321B', 'ana.gomez@test.com', 'calle', 'bajo', 'Polvorines', 'La calle necesita limpieza.', '2024-08-31', -34.5900, -58.4450, 'Completado'),
(3, 'Francisco Gottig','13579246C', 'luis.fernandez@test.com', 'alumbrado', 'urgente', 'Jose C Paz', 'El alumbrado público no funciona en la calle principal.', '2024-08-31', -34.5902, -58.4460, 'Anulado'),
(4, 'Ignacio Tula','23456789B', 'ana.fernandez@ungs.edu.ar', 'piso roto', 'moderado', 'Polvorines', 'Varios estudiantes y docentes están experimentando tiempos de carga excesivos y errores al intentar acceder a los recursos educativos en la plataforma de e-learning.', '2024-08-31', -34.5898, -58.4444, 'En Revisión');

  