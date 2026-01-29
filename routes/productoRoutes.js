import express from 'express';
import { guardarProducto } from '../controllers/productoController.js';

const router = express.Router();

// Ruta para insertar producto
router.post('/productos', guardarProducto);

export default router;