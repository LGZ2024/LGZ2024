import express from 'express'
import fileUpload from "express-fileupload";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRoutes from '../routes/users.routes.js';
import loginRoutes from '../routes/login.routes.js';
import CentroCostesRoutes from '../routes/centro.routes.js';
import mesclasRoutes from '../routes/mesclas.routes.js';
import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startServer = async (options) => {
    const { port, public_path = 'public', secret_jwt_key } = options

    const app = express()
    // Configura el middleware express-fileupload
    app.use(fileUpload());

    app.use(cookieParser())
    // Aumentar el límite de tamaño para cargas JSON
    app.use(bodyParser.json({ limit: '50mb' }));
    // Aumentar el límite de tamaño para cargas URL encoded form
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //middleeare de cookieParse
    app.use((req, res, next) => {
        const token = req.cookies.accessToken;
        req.session = { user: null }
        try {
            const data = jwt.verify(token, secret_jwt_key)
            req.session.user = data
        } catch (error) { }
        next() //seguir a la siguiente ruta o Middleware
    })

    app.use(cors())

    //para poder utilizar middeware se usa con la palabra use(express) funcion intermedia
    app.use(express.static(public_path)) //contenido estatico que ponemos disponible

    // Routes del servidor
    app.use('/', loginRoutes)

    app.use('/', userRoutes)

    app.use('/', CentroCostesRoutes)

    app.use('/', mesclasRoutes)



    /*  */
    app.get('*', (req, res) => {
        const indexPath = path.join(__dirname + `../../../${public_path}/`)
        res.sendFile(indexPath)
    })


    app.listen(port, () => {
        console.log(`Escuchando en el puerto ${port}`)
    })
}
