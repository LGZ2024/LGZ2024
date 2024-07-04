import {createPool} from 'mysql2/promise'
import{envs} from '../config/env.js'

//Establecemos los prámetros de conexión
export const conexion= createPool({
    host:envs.DB_HOST,
    user:envs.DB_USER,
    password:envs.DB_PASS,
    database:envs.DB_NAME
})
