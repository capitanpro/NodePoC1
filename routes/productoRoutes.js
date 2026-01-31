import express from 'express';
import { guardarProducto } from '../controllers/productoController.js';
import { listarProductos } from '../controllers/productoController.js';
import { listarProductoPorId } from '../controllers/productoController.js';


const router = express.Router();


router.get('/productos/:id', listarProductoPorId);

// Ruta para listar productos
router.get('/productos', listarProductos);

// Ruta para insertar producto
router.post('/producto', guardarProducto);

export default router;