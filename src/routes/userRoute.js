import { Router } from "express"
import { createUser, getUsers, validate, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

//Inicializamos el router - Crearenrutador
const userRoute = Router();


//generar las rutas (metodo http, path, controlador-servicio)
// metodo ruta controlador
userRoute.get("/get", getUsers)
userRoute.post("/create", createUser)
userRoute.post("/login", validate)


// Rutas protegidas por JWT para actualizar y eliminar usuarios
userRoute.put("/update", verifyTokenMiddleware, updateUser);  // Usamos PUT para actualización
userRoute.delete("/delete", verifyTokenMiddleware, deleteUser); // Usamos DELETE para eliminación


export default userRoute;