import Category from "../models/categoryModel.js";


// Obtener todas las categorías
export const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();

      // Si no hay categorías, 404 (No encontrado)
        if(categories.length === 0){  //para saber si esta vacio
          return res.status(404).json({ message: "No categories found"  });
          //no lo toma el 204 pero si le agregamos el json si aparece el 204 pero no el mensaje
      }
      
      return res.status(200).json(categories);  // Si hay categorías, las retorna
    } catch (error) {
      return res.status(500).json({ message: "Internal server error",  error: error.message });
    }
}



// Crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
      const { name, description } = req.body;

      // Verifico que ambos campos sean proporcionados
      if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
      }

      // Verifico si la categoría ya existe
      const categoryExist = await Category.findOne({ name });
      if(categoryExist){
        //console.log(categoryExist)
        return res.status(400).json({ message: "Category already exists" });
      }
      
       // Creo la nueva categoría y la guardamos
      const newCategory = new Category({ name, description });
      const savedCategory = await newCategory.save();

      return res.status(201).json(savedCategory); // Respondo con la categoría creada
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message});
    }
}



// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;  // Obtengo el ID de la categoría desde los parámetros
    const { name, description } = req.body;  // Obtengo los nuevos datos desde el cuerpo de la solicitud

    // Verifico si la categoría existe
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Actualizo la categoría con los nuevos datos
    category.name = name || category.name;
    category.description = description || category.description;

    const updatedCategory = await category.save();

    return res.status(200).json(updatedCategory);  // Devuelvo la categoría actualizada
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;  // Obtengo el ID de la categoría desde los parámetros

    // Buscamos y eliminamos la categoría
    const category = await Category.findByIdAndDelete(id);

    // Verifico si la categoría fue encontrada y eliminada
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });  // Respondemos con un mensaje de éxito
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};