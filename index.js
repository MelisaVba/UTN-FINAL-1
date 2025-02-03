//Entry point

import express from 'express' //depencia de json
import cors from 'cors'
import bodyParser from 'body-parser'
import productRoute from './src/routes/productRoute.js'
import { connectDB } from './src/db.js'
import userRoute from './src/routes/userRoute.js'
import { PORT } from './src/config.js'
//import cookieParser from 'cookie-parser'
import categoryRoute from './src/routes/categoryRoute.js'



//Ejecucion de express para inicializar el servidor
const app = express();

//Middleware


//Permitir las conexiones cors (permite conecciones de afuera)
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  }));


//Parsea a json las solicitudes
app.use(bodyParser.json());


//Habilitando lectura de las cookies (no hace falta)
//se usa para parsear (leer) las cookies enviadas en las solicitudes HTTP.
//app.use(cookieParser())


//Parsea body con url encoded
app.use(bodyParser.urlencoded({ extended: true }));


//conectar a la base de datos
connectDB();


//rutas
// prefijo: api | agrupador: product (agrupador xq en product tenemos varisa rutas)
app.use("/api/product", productRoute);
app.use("/api/user", userRoute); //ctrl clip veo si esta bien
app.use("/api/category", categoryRoute);



// Iniciar servidor
app.listen(PORT, () => {
  console.log("Server running");
});