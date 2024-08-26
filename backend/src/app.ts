// Import express, cors, helmet and morgan
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import os from 'os';

// Create Express server
const app = express(); // New express instance
const port = 3000; // Port number

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan
app.use(express.json()); // <=== Enable JSON body parser

// Use routes
app.use('/', router);

// Start Express server
app.listen(port, () => {
  // Callback cuando el servidor se inicia correctamente
  console.log(`Servidor iniciado en http://localhost:${port}`);

  // Muestra la IP local para acceder desde otros dispositivos
  const networkInterfaces = os.networkInterfaces();
  for (const iface of Object.values(networkInterfaces)) {
    if (iface) {
      for (const info of iface) {
        if (info.family === 'IPv4' && !info.internal) {
          console.log(`Accede desde otra máquina en la red: http://${info.address}:${port}`);
        }
      }
    }
  }
});

// Export Express app
export default app;