import { connect } from "mongoose"; // Librería para conectar la base de datos
import { MONGODB_URI } from "./config.js"; // para ver en mi base de batos la info 

export const connectDB = async () => {
    try {
        await connect(MONGODB_URI); //"mongodb://127.0.0.1:puerto/nombre"  
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database", error.message);
        //Si falla salimos de esta ejecucion
        process.exit(1); // Termina la ejecución si hay error
    }
}