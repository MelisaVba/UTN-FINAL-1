import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // nombres de categoría sean únicos
        trim: true, // Eliminamos espacios al principio y al final
        lowercase: true, // Convertimos el nombre a minúsculas
    },

    description: {
        type: String,
        required: true, //describir cada categoría
        trim: true,
        lowercase: true,
    },

    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'product', // Relación con productos
        }
  ],
    
})

// Creo y exporto el modelo de categoría
const Category = model('Category', categorySchema);

export default Category;