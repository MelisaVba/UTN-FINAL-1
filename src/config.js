import dotenv from 'dotenv';

dotenv.config();

//variables de entorno 
export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI; // || 'mongodb://127.0.0.1:27017/backend';
export const SECRET = process.env.SECRET; // || 'mi_clave_secreta';

// puedo agregar valores predeterminados como..
// || 'mongodb://127.0.0.1:27017/backend'; || 'mi_clave_secreta';
// en caso de que fallen las variables de entorno aunq tengo 1 valor predeterminado p/ el puerto
// y me aseguro q siempre tenga 1 valor de respaldo en caso de que alguna variable de entorno falte