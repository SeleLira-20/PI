// models/Publicacion.js
export class Publicacion {
  constructor(id, contenido, fechaCreacion, likes = 0, comentarios = 0) {
    this.id = id;
    this.contenido = contenido;
    this.fechaCreacion = fechaCreacion || new Date().toISOString();
    this.likes = likes;
    this.comentarios = comentarios;
  }

  // Validaciones del modelo
  static validar(contenido) {
    if (!contenido || contenido.trim().length === 0) {
      throw new Error('El contenido no puede estar vacío');
    }
    if (contenido.length > 500) {
      throw new Error('El contenido no puede tener más de 500 caracteres');
    }
    return true;
  }
}