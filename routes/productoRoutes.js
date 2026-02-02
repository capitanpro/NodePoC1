import express from 'express';
import { crearProducto } from '../controllers/productoController.js';
import { listarProductos } from '../controllers/productoController.js';
import { obtenerProductoPorId } from '../controllers/productoController.js';
import {eliminarProductoLogico} from '../controllers/productoController.js'

const router = express.Router();


//Obtener producto por ID
router.get('/productos/:id', obtenerProductoPorId);

//Listar todos los productos
router.get('/productos', listarProductos);

//Crear nuevos productos
router.post('/productos', crearProducto);

//Borrado lógico de productos
router.delete('/productos/:id',eliminarProductoLogico);

export default router;