// services/AuthService.js
import Database from './BaseDeDatos';

class AuthService {
  // Registrar nuevo usuario
  static async register(userData) {
    try {
      // Validaciones adicionales
      if (userData.password !== userData.confirmPassword) {
        return { success: false, error: 'Las contraseñas no coinciden' };
      }

      if (userData.password.length < 6) {
        return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
      }

      // Verificar si el email ya existe
      const emailExists = await Database.checkEmailExists(userData.email);
      if (emailExists) {
        return { success: false, error: 'El email ya está registrado' };
      }

      // Registrar usuario
      const result = await Database.registerUser({
        email: userData.email,
        password: userData.password,
        full_name: userData.name
      });

      return result;
    } catch (error) {
      console.log('AuthService register error:', error);
      return { success: false, error: 'Error de conexión con la base de datos' };
    }
  }

  // Login de usuario
  static async login(email, password) {
    try {
      return await Database.loginUser(email, password);
    } catch (error) {
      console.log('AuthService login error:', error);
      return { success: false, error: 'Error de conexión con la base de datos' };
    }
  }

  // Solicitar recuperación de contraseña
  static async forgotPassword(email) {
    try {
      return await Database.createPasswordResetToken(email);
    } catch (error) {
      console.log('AuthService forgotPassword error:', error);
      return { success: false, error: 'Error de conexión con la base de datos' };
    }
  }
}

export default AuthService;