import express from 'express';
import { crearProducto } from '../controllers/productoController.js';
import { listarProductos } from '../controllers/productoController.js';
import { obtenerProductoPorId } from '../controllers/productoController.js';
import {eliminarProductoLogico} from '../controllers/productoController.js'
import {modificarProducto} from '../controllers/productoController.js'
import {listarProductosPaginados} from '../controllers/productoController.js'

const router = express.Router();


// 1. Lecturas (GET)

// El acceso será: GET /api/productos?page=1&size=10
router.get('/productos', listarProductosPaginados);
//Obtener producto por ID
router.get('/productos/:id', obtenerProductoPorId);

//Listar todos los productos
//router.get('/productos', listarProductos);

// 2. Escrituras (POST, PUT, DELETE)

//Crear nuevos productos
router.post('/productos', crearProducto);

//Modificar productos
router.put('/productos', modificarProducto);
                         
//Borrado lógico de productos
router.delete('/productos/:id', eliminarProductoLogico);

export default router;