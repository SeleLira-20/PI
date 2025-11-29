// database/DatabaseService.js
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = 'publicaciones';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Usando LocalStorage para web');
    } else {
      console.log('Usando SQLite para móvil');
      this.db = await SQLite.openDatabaseAsync('miapp.db');
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS publicaciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contenido TEXT NOT NULL,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
          likes INTEGER DEFAULT 0,
          comentarios INTEGER DEFAULT 0
        );
      `);
    }
  }

  async getAll() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync('SELECT * FROM publicaciones ORDER BY id DESC');
    }
  }

  async add(contenido) {
    if (Platform.OS === 'web') {
      const publicaciones = await this.getAll();
      const nuevaPublicacion = {
        id: Date.now(),
        contenido,
        fecha_creacion: new Date().toISOString(),
        likes: 0,
        comentarios: 0
      };
      publicaciones.unshift(nuevaPublicacion);
      localStorage.setItem(this.storageKey, JSON.stringify(publicaciones));
      return nuevaPublicacion;
    } else {
      const result = await this.db.runAsync(
        'INSERT INTO publicaciones(contenido) VALUES(?)',
        contenido
      );
      return {
        id: result.lastInsertRowId,
        contenido,
        fecha_creacion: new Date().toISOString(),
        likes: 0,
        comentarios: 0
      };
    }
  }

  // Función para actualizar publicación
  async update(id, contenido) {
    if (Platform.OS === 'web') {
      const publicaciones = await this.getAll();
      const index = publicaciones.findIndex(p => p.id === id);
      if (index !== -1) {
        publicaciones[index].contenido = contenido;
        localStorage.setItem(this.storageKey, JSON.stringify(publicaciones));
        return publicaciones[index];
      }
      throw new Error('Publicación no encontrada');
    } else {
      await this.db.runAsync(
        'UPDATE publicaciones SET contenido = ? WHERE id = ?',
        contenido, id
      );
      return { id, contenido };
    }
  }

  // Función para eliminar publicación
  async delete(id) {
    if (Platform.OS === 'web') {
      const publicaciones = await this.getAll();
      const filtered = publicaciones.filter(p => p.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return true;
    } else {
      await this.db.runAsync('DELETE FROM publicaciones WHERE id = ?', id);
      return true;
    }
  }
}

export default new DatabaseService();