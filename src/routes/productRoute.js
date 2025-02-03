import { Router } from "express"
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";


//Inicializamos el router
const productRoute = Router();


//generar las rutas - CLIENTS
productRoute.get("/get", getProducts);
productRoute.post("/create", verifyTokenMiddleware, createProduct);
productRoute.put("/update/:id", verifyTokenMiddleware, updateProduct);  // Usamos PUT para actualización
productRoute.delete("/delete/:id", verifyTokenMiddleware, deleteProduct);  // Usamos DELETE para eliminación

/*
productRoute.post("/create", verifyTokenMiddleware, createProduct);
productRoute.put("/update", verifyTokenMiddleware, updateProduct);  // Usamos PUT para actualización
productRoute.delete("/delete", verifyTokenMiddleware, deleteProduct);  // Usamos DELETE para eliminación
*/

export default productRoute;