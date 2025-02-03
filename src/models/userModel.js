import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';


// Enum para roles
const rolesEnum = ["ADMIN", "MERCHANT", "CUSTOMER"];

//Creamos esquema para el usuario  / instancia de esquema de mongoDB
const userSchema = new Schema({
  //Escribir las propiedades
    name: {     // name: javier / userName, nickName = creamos solo el usuario
    type: String,
    //Es un campo obligatorio
    //Si no se manda el campo se responde con el mensaje
    required: [true, "Name field is required"],
    //Es unico e irrepetible
    //unique: true,
    trim: true, //Quita espacios adelante y atras del valor    
    lowercase: true, //guardar el valor en minusculas    
    minLength: 3, //Largo minimo
    maxLength: 30 //largo maximo
  },


  image: {
    type: String,
    default: "https://picsum.photos/400"
  },
    
    
  password: {
    type: String,
    required: [true, "Password field is required"],
    trim: true
  },
    

  email: {      // valido mas el email que el name-usearName-nickName 
    type: String,
    required: [true, "Email field is required"],
    trim: true,
    unique: true,
    lowercase: true, // Convierte el email a minúsculas para mantener consistencia
    match: [/\S+@\S+\.\S+/, "Email is not valid"], // Valida el formato del email
  },


  role: {
    type: String,
    validate: {
        validator: function (role) {
            return rolesEnum.includes(role)
        },
        message: (props) =>  `${props.value} is not a valid role`
    },
    enum: rolesEnum, // Validador nativo de mongoose - Validación para los roles definidos
    required: [true, "Role field is required"]
  },
  
  createdAt: { // Para saber cuándo se creó el usuario
    type: Date,
    default: Date.now  // Fecha de creación del usuario
  }
    
})



//Encriptamos password antes de guardarla (npm i bcrypt)
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  //next permite ir al proximo paso
  next()
})


/* userSchema.pre('save', async function(next) {

  if (!this.isModified('password')) return next(); // Solo encripta si la contraseña ha sido modificada
  this.password = await bcrypt.hash(this.password, 10); // Encriptamos la contraseña con bcryptjs
  next(); // Continuamos con el siguiente paso
});

*/


// Método para comparar contraseñas (si se requiere en autenticación)
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password); // Compara la contraseña ingresada con la almacenada
};


// Creamos el modelo de usuario
const User = model("user", userSchema);

//El nombre del modelo pasa a minusculas y plural en la db Product (model) -> products (collection) es una coleccion
//Podemos añadir un tercer argumento para especificar el nombre de la coleccion
//ej =  mongoose.model('Tag', TagSchema, 'tags');
export default User;
