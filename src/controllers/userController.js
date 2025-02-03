//Importar que el modelo
import User from "../models/userModel.js"; //ctrl clip y entro
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";



// GET USER = Obtener todos los usuarios (sin contraseña)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); //Excluimos la contraseña en la respuesta //SERVICIO, resto controlador
    if (users.length === 0) {
      return res.status(204).json({ message: "There are no users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};




// CREATE USER =  Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    //info de usuario POO (nuevo usuario le paso la info del body - formulario)
    const { name, email, password, role } = req.body;

    // Verificamos que todos los campos sean proporcionados
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verificamos si el usuario ya existe en la base de datos
    const userFound = await User.findOne({ email }); //busca un usuario  //SERVICIO, resto controlador
    if (userFound) {
      //esta o no esta..no hace falta lo demas
      return res
        .status(400)
        .json({ message: `User with email: ${email} already exists` });
    }

    // Encriptamos la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword, role });
    const savedUser = await newUser.save();

    // Respondemos con el usuario creado (sin la contraseña)
    return res.status(201).json({
      message: "User created",
      user: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};



// VALIDATE USER - LOGIN - Validar el inicio de sesión (login)
export const validate = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificamos que el email y la contraseña sean proporcionados
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Buscamos al usuario en la base de datos
    //valido que el usuario exista ya que email es unique
    const userFound = await User.findOne({ email });
    //si el usuario no existe terminamos la operacion
    if (!userFound) {
      return res.status(400).json({ message: "User or password is incorrect" });
    } // si el email esta mal no decimos que el email no existe, decimos que es incorrecta la password

    // Validamos la password usando bcrypt.compare (asíncrono)
    //Para comparar necesito la password que me llega por request y
    //la password del user en la db
    const isMatch = await bcrypt.compare(password, userFound.password );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creamos un token JWT con la información del usuario
    //El token para ser valido debe ser firmado
    //1. payload, 2. secret, 3. duracion
    const token = jwt.sign(
      { id: userFound._id, role: userFound.role },
      SECRET,
      { expiresIn: "1h" }
    );

    // Respondemos con el token de autenticación
    res.status(200).json({
      message: "Logged in",
      token,
      role: userFound.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// UPDATE USER = Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user; // ID del usuario autenticado
    const { name, email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar campos si se proporcionan
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña
    }

    await user.save();

    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};



// DELETE USER = Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.user; // ID del usuario autenticado

    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};