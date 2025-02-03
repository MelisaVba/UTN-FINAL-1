import { model, Schema } from "mongoose";

const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"];

//Creao esquema para el robot / instancia de esquema de mongoDB
const robotSchema = new Schema({
//Escribir las propiedades
  name: {
    type: String,
    //Es un campo obligatorio
    //Si no se manda el campo se responde con el mensaje
    required: [true, "Name field is required"],    
    unique: true, //Es unico e irrepetible    
    trim: true, //Quita espacios adelante y atras del valor
    lowercase: true, //guardar el valor en minusculas
    minLength: 3, //Largo minimo    
    maxLength: 30 //largo maximo
  },

  status: {
    type: String,
    validate: {
      validator: function (status) {
        return statusEnum.includes(status);
      },
      message: (props) => `${props.value} is not a valid status`,
    },
    required: true, // Campo obligatorio
    enum: statusEnum, // Validador nativo de mongoose -Valida que el estado esté dentro del enum
  },

  createdAt: {
    type: Date,
    default: Date.now(), // Fecha de creación automática
  },

  // precio
  price: {
    type: Number,
    required: [true, "Price field is required"],
    min: [0, "Price field has to be a number"], // Precio no puede ser negativo
  },

  image: {
    type: String,
    default: "https://picsum.photos/400", // Imagen por defecto
  },

  type: {
    type: String,
    required: true,
    enum: [
      "Domestic",
      "Exploration",
      "Education",
      "Health",
      "Personal Assistant",
      "Industrial"],  // Tipos de robots
  },

  description: {
    type: String,
    trim: true, // Elimina espacios innecesarios
  },

  features: {
    type: [String], // Array de strings con características del robot
    default: []
  },

  /*batteryLife: {
    type: Number, // Duración de la batería en horas
    min: [0, "Battery life cannot be negative"]
  },*/

  category: {
    type: Schema.Types.ObjectId,
    ref: 'category', // Referencia al modelo de categorías
    required: true
}

});

// Creamos el modelo de producto
const Product = model("Product", robotSchema);

//El nombre del modelo pasa a minusculas y plural en la db Product (model) -> products (collection) es una coleccion
//Podemos añadir un tercer argumento para especificar el nombre de la coleccion
//ej =  mongoose.model('Tag', TagSchema, 'tags');
export default Product;
