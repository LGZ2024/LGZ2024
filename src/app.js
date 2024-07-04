import { startServer } from './server/server.js'
import{envs} from './config/env.js'
//funcion asyncrona agnostica autoconvocada
//agnositca por que no tiene nombre
//autoconvocada por que se llama a si misma con los dos parentesis alfinal
 const main=()=>{
   startServer({
    port:envs.PORT,
    public_path:envs.PUCLIC_PATH,
    secret_jwt_key:envs.SECRET_JWT_KEY,
   })
}
(async()=>{
    main() 
})()
 