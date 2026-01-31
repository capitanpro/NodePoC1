import express from 'express';
import productoRoutes from './routes/productoRoutes.js';

const app = express();

app.use(express.json()); // para leer req.body en JSON

// Usar las rutas de productos
app.use('/api', productoRoutes);


app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
});