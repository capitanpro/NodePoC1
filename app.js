import express from 'express';
import productoRoutes from './routes/productoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

require('dotenv').config();

const app = express();

app.use(express.json()); // para leer req.body en JSON

// Usar las rutas de productos
app.use('/api', productoRoutes);
app.use('/api',usuarioRoutes);


app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});