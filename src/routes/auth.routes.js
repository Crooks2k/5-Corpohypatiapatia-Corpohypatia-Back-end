import { Router } from "express";
const router = Router();

import * as authCtrl from "../controller/auth.controller.js";
import * as authJwt from "../middlewares/authJwt.js";

// create and protect routes
/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registrar un nuevo usuario en la aplicación
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstNames:
 *                 type: string
 *                 description: Nombres del usuario
 *                 example: John
 *               lastNames:
 *                  type: string
 *                  description: Apellidos del usuario
 *                  example: Doe 
 *               email:
 *                  type: string 
 *                  description: Correo electrónico del usuario 
 *                  example: johndoe@example.com 
 *               position:
 *                  type: string 
 *                  description: Cargo del usuario en la empresa 
 *                  example: Gerente de Ventas 
 *               phone:
 *                  type: string 
 *                  description: Número telefónico del usuario 
 *                  example: +1 123-456-7890 
 *               password:
 *                  type: string 
 *                  description: Contraseña del usuario en texto plano. Será encriptada antes de ser almacenada.  
 *                  example: password123  
 *               role:
 *                  type: array  
 *                  items:
 *                    type: string  
 *                    enum: [ "admin" , "moderator" , "user" ]  
 *                    description: Rol o roles asignados al usuario. Si no se especifica, se asignará el rol de "user".  
 *                    example: ["admin"]  
 *             required:
 *               - firstNames  
 *               - lastNames  
 *               - email  
 *               - password  
 *
 *     responses:
 *       200:
 *         description: Registro exitoso. Se devuelve un token de sesión.  
 *
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'  
 *
 *       400:
 *         description: Datos de registro inválidos o incompletos.  
 *
 *       401:
 *         description: No autorizado para realizar esta acción. Solo los usuarios con rol de administrador pueden registrar nuevos usuarios.  
 */

router.post("/signup", [authJwt.verifyToken, authJwt.isAdmin], authCtrl.signUp);

/**
 * @openapi
 * /signin:
 *   post:
 *     summary: Registrar usuario
 *     description: Registrar un nuevo usuario en la aplicación
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: password123
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Registro de usuario exitoso
 *       400:
 *         description: Datos de registro de usuario inválidos
 *       409:
 *         description: El correo electrónico ya está registrado
 */
router.post("/signin", authCtrl.signIn);
router.post("/send-password-link", authCtrl.sendPasswordLink);
router.post(
  "/change-password",
  [authJwt.verifyToken, authJwt.isAdmin],
  authCtrl.changePassword
);

export default router;
