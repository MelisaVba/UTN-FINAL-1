import Product from "../models/productModel.js";
//import Category from "../models/categoryModel.js";


// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    //En el siguiente ejemplo podemos llamar a una coleccion pero solo queremos ver name
    // Obtener todos los productos y hacer un 'populate' para traer la categoría relacionada
    const products = await Product.find().populate("category", "name"); // Solo obtenemos el nombre de la categoría

    if (products.length === 0) {
      return res.status(204).json({ message: "There are no products" });
    }


    return res.status(200).json(products); // Retornamos los productos encontrados
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message  });
  }
};



// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {

    // Desestructuramos los datos del body de la solicitud
    const { name, description, price, categoryId } = req.body;

    // Validar que se pasen los campos requeridos
    if (!name || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required" });
    }

    // Verificar que la categoría existe
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res
        .status(400)
        .json({ message: `Product ${name} already exists` });
    }

    // Creamos un nuevo producto
    const newProduct = new Product({
      name,
      description,
      price,
      category: categoryId, // Guardamos la referencia de la categoría
    });

     // Guardamos el producto en la base de datos
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct); // Respondemos con el producto guardado
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};


// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el producto por su ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Eliminamos el producto
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    // Buscamos el producto por su ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Actualizamos el producto con los nuevos datos
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = categoryId || product.category;

    // Guardamos los cambios en la base de datos
    const updatedProduct = await product.save();

    return res.status(200).json(updatedProduct); // Respondemos con el producto actualizado
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};




