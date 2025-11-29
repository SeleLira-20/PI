// controllers/PublicacionController.js
import { Publicacion } from '../models/Publicacion';
import DatabaseService from '../database/DatabaseService';

export class PublicacionController {
  constructor() {
    this.listeners = [];
  }

  async initialize() {
    await DatabaseService.initialize();
  }

  async obtenerPublicaciones() {
    try {
      const data = await DatabaseService.getAll();
      return data.map(p => new Publicacion(
        p.id, 
        p.contenido, 
        p.fecha_creacion, 
        p.likes, 
        p.comentarios
      ));
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      throw new Error('No se pudieron cargar las publicaciones');
    }
  }

  async crearPublicacion(contenido) {
    try {
      Publicacion.validar(contenido);
      const nuevaPublicacion = await DatabaseService.add(contenido.trim());
      this.notifyListeners();
      return new Publicacion(
        nuevaPublicacion.id,
        nuevaPublicacion.contenido,
        nuevaPublicacion.fecha_creacion,
        nuevaPublicacion.likes,
        nuevaPublicacion.comentarios
      );
    } catch (error) {
      console.error('Error al crear publicación:', error);
      throw error;
    }
  }

  // Actualizar publicación
  async actualizarPublicacion(id, contenido) {
    try {
      Publicacion.validar(contenido);
      await DatabaseService.update(id, contenido.trim());
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
      throw error;
    }
  }

  // Eliminar publicación
  async eliminarPublicacion(id) {
    try {
      await DatabaseService.delete(id);
      this.notifyListeners();
      return true;
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      throw error;
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }
}