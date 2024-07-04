import { conexion } from "../bd/db.js"
import jwt from 'jsonwebtoken'
import { envs } from '../config/env.js'



//extraer un solo Usuario
export const login = async (req, res) => {
    const { email, pass } = req.body
    const [result] = await conexion.query('SELECT o.nombre,o.correo,o.empresa,o.rancho,o.tipoUser,u.idUser FROM `users` u JOIN usuarios o ON u.idUser=o.idUser WHERE user=? AND pass=?', [email, pass])
    if (result.length <= 0) return res.status(404).json({
        mensaje: 'error'
    })

    //creamos nuestro webtoken de jwt
    const token = jwt.sign({
        idUser: result[0].idUser,
        tipoUser: result[0].tipoUser,
        nombre: result[0].nombre,
        empresa: result[0].empresa,
        rancho: result[0].rancho
    }, envs.SECRET_JWT_KEY)

    //guardamos el token en las cookies
    res
        .cookie('accessToken', token, {
            httpOnly: true, //la coockie solo se puede acceder desde el servidor
            secure: false,
            sameSite: 'strict', //con estrict solo se puede utilizar la cookie en el dominio
            maxAge: 1000 * 60 * 60 * 24 * 30 //la cookies solo tiene valides 1 hora
        })
        .status(200)
        .json({
            mensaje: 'Autorizado',
            tipoUser: result[0].tipoUser,
            usuario: result[0].nombre,
            idUser: result[0].idUser,
            empresa: result[0].empresa,
            rancho: result[0].rancho,
            token
        })
};
