import express from 'express';
import { crearUsuario } from '../controllers/usuarioController.js';

const router = express.Router();


//Crear nuevo usuario
router.post('/usuarios', crearUsuario);
export default router;