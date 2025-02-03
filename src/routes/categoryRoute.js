import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js"; // Asegúrate de importar correctamente

const categoryRoute = Router()

categoryRoute.get("/get", getCategories);
categoryRoute.post("/create", verifyTokenMiddleware, createCategory);
categoryRoute.put("/update/:id", verifyTokenMiddleware, updateCategory);
categoryRoute.delete("/delete/:id", verifyTokenMiddleware, deleteCategory);

export default categoryRoute;