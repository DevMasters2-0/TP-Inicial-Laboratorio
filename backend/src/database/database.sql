CREATE TABLE IF NOT EXISTS incidencia (
    incidencia_id INTEGER PRIMARY KEY,
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
    incidencia_id INTEGER,
    FOREIGN KEY (incidencia_id) REFERENCES incidencia(incidencia_id) 
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
    registro_id INTEGER,
    incidencia_id INTEGER,
    FOREIGN KEY(registro_id) REFERENCES registro(registro_id),
    FOREIGN KEY(incidencia_id) REFERENCES incidencia(incidencia_id)
);

INSERT INTO incidencia (incidencia_id, dni, email, tema, nivelDeRiesgo, localidad, descripcion, fechaDeCreacion, latitud, longitud, estado) VALUES
(1, '12345678A', 'juan.perez@test.com', 'piso roto', 'moderado', 'San Miguel', 'El piso de la cocina está roto y necesita reparación.', '2024-08-31T00:00:00Z', -34.5898, -58.4444, 'En Revisión'),
(2, '87654321B', 'ana.gomez@test.com', 'calle', 'bajo', 'Polvorines', 'La calle necesita limpieza.', '2024-08-31T00:00:00Z', -34.5900, -58.4450, 'Completado'),
(3, '13579246C', 'luis.fernandez@test.com', 'alumbrado', 'urgente', 'Jose C Paz', 'El alumbrado público no funciona en la calle principal.', '2024-08-31T00:00:00Z', -34.5902, -58.4460, 'Anulado'),
(4, '23456789B', 'ana.fernandez@ungs.edu.ar', 'piso roto', 'moderado', 'Polvorines', 'Varios estudiantes y docentes están experimentando tiempos de carga excesivos y errores al intentar acceder a los recursos educativos en la plataforma de e-learning.', '2024-08-31T00:00:00Z', -34.5898, -58.4444, 'En Revisión');

  