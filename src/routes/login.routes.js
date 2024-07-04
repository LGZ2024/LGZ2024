import express from 'express';
import { login } from '../controller/login.controller.js';

const router = express.Router();


//Editar usuario
router.post('/login',login)
//Mostrar todos los usuario
router.get('/exit',)


export default router;
