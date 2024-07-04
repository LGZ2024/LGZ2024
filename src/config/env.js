import env from 'dotenv'
import envVar from 'env-var'
env.config();

//este es un objeto que guarda nuestas variables de entorno para utilizarlas en nuestro proyecto
export const envs = {
    PORT: envVar.get('PORT').required().asPortNumber(), //puerto donde se corre el programa
    PUCLIC_PATH: envVar.get('PUBLIC_PATH').default('public').asString(),//Obtenemos carppeta publica
    SECRET_JWT_KEY: envVar.get('SECRET_JWT_KEY').default('public').asString(), //obtenemos CLAVE SECRETA DE JWY
    DB_HOST: envVar.get('DB_HOST').default('public').asString(), //obtenemos CLAVE SECRETA DE JWY
    DB_USER: envVar.get('DB_USER').default('public').asString(), //obtenemos CLAVE SECRETA DE JWY
    DB_PASS: envVar.get('DB_PASS').default('public').asString(), //obtenemos CLAVE SECRETA DE JWY
    DB_NAME: envVar.get('DB_NAME').default('public').asString(), //obtenemos CLAVE SECRETA DE JWY
}