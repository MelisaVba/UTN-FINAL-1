import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";



// Middleware express
export const verifyTokenMiddleware = (req, res, next) => {
  try {
      
    // Obtenemos el token del header Authorization
    const authHeader = req.headers.authorization
    console.log({ authHeader })
      
    //Queremos saber si lo recibimos bien, verificamos si el token está presente y tiene el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Access token was not provided" })
    }
        
    // Extraemos el token
    const token = authHeader.split(" ")[1];
    console.log({ token })

    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, SECRET); //verificamos
    console.log({ decoded }); //decodificamos

    // Guardamos los datos del usuario en el request para futuras operaciones
    req.user = decoded;

    next(); // Continuar con el siguiente middleware o ruta
  } catch (error) {
    return res.status(400).json({ message: "Invalid access token", error });
  }
};