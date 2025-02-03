# 🏁 Trabajo final UTN - Diplomatura Web Full Stack 
## 📌 Descripción del proyecto  
Este proyecto está basado en una API Rest desarrollada como parte final de la Diplomatura Full Stack en Desarrollo Web, de la Universidad Tecnológica Nacional (UTN).  
La aplicación realiza actividades CRUD (create, read, update, delete) sobre:  

- 👤 **Usuarios** (`users`)  
- 🤖 **Productos** (`products`)  
- 📂 **Categorías** (`categories`)  

Cada entidad tiene sus respectivos endpoints para interactuar con la base de datos.  

---
## 🚀 Tecnologías Utilizadas

Este proyecto está desarrollado con las siguientes tecnologías:

- **Node.js** - Entorno de ejecución para JavaScript.
- **Express.js** - Framework para la creación de APIs.
- **MongoDB** - Base de datos NoSQL para el almacenamiento de datos.
- **Mongoose** - ODM para modelado de datos en MongoDB.
- **JWT (jsonwebtoken)** - Para autenticación de usuarios.
- **bcrypt** - Para encriptación de contraseñas.
- **dotenv** - Para la gestión de variables de entorno.
- **CORS** - Para permitir solicitudes desde diferentes orígenes.
---

## 🛠️ Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
 git clone https://github.com/MelisaVba/UTN-FINAL-1.git
```
### 2️⃣ Acceder a la carpeta del proyecto e instalar dependencias
```sh
 npm install
```
### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT = 3000
MONGODB_URI = mongodb://127.0.0.1:27017/backend
SECRET = secret
```
### 4️⃣ Configurar la base de datos
```
 1. Abre **MongoDB Compass** u otra herramienta para gestionar MongoDB.
 2. Conecta a tu instancia de MongoDB y verifica que la base de datos mencionada en el `.env` esté accesible
```
### 5️⃣ Iniciar el servidor
```sh
 npm run dev
```
El servidor estará corriendo en `http://localhost:3000`

---
## 📡 Endpoints Disponibles

### 👤 Usuarios
- **GET** `/api/user/get` - Obtener todos los usuarios.
- **POST** `/api/user/create` - Crear un nuevo usuario.
- **DELETE** `/api/user/delete/:id` - Eliminar un usuario.
- **PUT** `/api/user/update/:id` - Actualizar un usuario.

### 🤖 Productos
- **GET** `/api/product/get` - Obtener todos los robots.
- **POST** `/api/product/create` - Crear un nuevo robot.
- **DELETE** `/api/product/delete/:id` - Eliminar un robot.
- **PUT** `/api/product/update/:id` - Actualizar un robot.

### 🗂️ Categorías
- **GET** `/api/category/get` - Obtener todas las categorías.
- **POST** `/api/category/create` - Crear una nueva categoría.
- **DELETE** `/api/category/delete/:id` - Eliminar una categoría.
- **PUT** `/api/category/update/:id` - Actualizar una categoría.

---
## 🔧 Datos Mock para Pruebas

### 👤 Usuario
```json
{
  "name": "Jesper",
  "password": "adf",
  "email": "jesper@gmail.com",
  "role": "ADMIN"
}
```

### 🤖 Productos
```json
{
  "name": "ZARA-7",
  "status": "AVAILABLE",
  "price": 12000,
  "type": " Exploration",
  "description": "Robot con capacidades avanzadas para el análisis de terrenos y la recopilación de datos en ambientes extraterrestres.", 
  "category": "65cxxxxx"
}
```

### 🗂️ Categorías
```json
{
  "name": "Exploración Espacial",
  "description": "Robots diseñados para análisis de terrenos y exploración en ambientes extraterrestres."
}
```

---
## 🔐 Autenticación
La API utiliza **JWT** para autenticación. Para acceder a los endpoints protegidos:
1. Inicia sesión con `POST /api/user/login`.
2. Recibirás un **token JWT** en la respuesta.
3. Incluye el token en las solicitudes usando el encabezado:
   ```
   Authorization: Bearer <token>
   ```

---
## 🏗️ Modelos de Datos

### 👤 Usuario
- `name` (String, requerido)
- `password` (String, requerido)
- `email` (String, requerido, único)
- `role` (String, valores permitidos: , `"ADMIN", "MERCHANT", "CUSTOMER"`)

### 🤖 Producto
- `name` (String, requerido, unico)
- `category` (Requerido)
- `type` (String, Requerido)
- `price` (Number, requerido, min: 0)
- `status` (String, valores permitidos: `"AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"`)

### 🗂️ Categoría
- `name` (String, requerido, único)
- `description` (String, requerido)

---
## 🧪 Pruebas y Desarrollo

### Iniciar el servidor
```sh
 npm run dev
```

### Probar los endpoints
Usa herramientas como **Postman** o **Thunder Client** para enviar solicitudes a los endpoints.
Ejemplo para obtener todos los usuarios:
```
 GET http://localhost:3000/api/user/get
```

### Enviar datos mock
Envía los ejemplos de datos en formato JSON en las solicitudes `POST`.

---
## 🤝 Contribuciones
¡Toda ayuda es bienvenida! Si deseas contribuir, abre un **issue** o envía un **pull request**.

---
## 📜 Licencia
Este proyecto es de código abierto y está bajo la licencia **MIT**.

---
**🌟 ETERNITY: Innovación robótica al servicio del futuro.** 🚀PRUEBAS

