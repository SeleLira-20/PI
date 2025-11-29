// screens/MisPublicacionesScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { PublicacionController } from '../controllers/PublicacionController';
import AsyncStorage from '@react-native-async-storage/async-storage';

const controller = new PublicacionController();

export default function MisPublicacionesScreen({ navigation }) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [contenido, setContenido] = useState('');
  const [editando, setEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
   const [nombreUsuario, setNombreUsuario] = useState('');

   useEffect(() => {
    const obtenerNombreUsuario = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuarioActual');
        if (usuarioGuardado) {
          const usuario = JSON.parse(usuarioGuardado);
          setNombreUsuario(usuario.usuario);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    obtenerNombreUsuario();
  }, []);

  const cargarPublicaciones = useCallback(async () => {
    try {
      setCargando(true);
      const data = await controller.obtenerPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await controller.initialize();
      await cargarPublicaciones();
    };
    init();
    
    controller.addListener(cargarPublicaciones);
    return () => {
      controller.removeListener(cargarPublicaciones);
    };
  }, [cargarPublicaciones]);

  const handleCrearPublicacion = async () => {
    if (guardando || !contenido.trim()) return;
    
    try {
      setGuardando(true);
      await controller.crearPublicacion(contenido);
      setContenido('');
      Alert.alert('Éxito', 'Publicación creada correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleEditarPublicacion = async () => {
    if (guardando || !contenido.trim()) return;
    
    try {
      setGuardando(true);
      await controller.actualizarPublicacion(editando.id, contenido);
      setContenido('');
      setEditando(null);
      setModalVisible(false);
      Alert.alert('Éxito', 'Publicación actualizada correctamente');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminarPublicacion = (publicacion) => {
    Alert.alert(
      'Eliminar Publicación',
      '¿Estás segura de que quieres eliminar esta publicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await controller.eliminarPublicacion(publicacion.id);
              Alert.alert('Éxito', 'Publicación eliminada correctamente');
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  const abrirModalEdicion = (publicacion) => {
    setEditando(publicacion);
    setContenido(publicacion.contenido);
    setModalVisible(true);
  };

  const renderPublicacion = ({ item, index }) => (
    <View style={styles.publicacionItem}>
      <View style={styles.publicacionHeader}>
        <View style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{nombreUsuario || 'Usuario'}</Text>
          <Text style={styles.fecha}>
            {new Date(item.fechaCreacion).toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
        <View style={styles.acciones}>
          <TouchableOpacity 
            style={styles.botonAccion}
            onPress={() => abrirModalEdicion(item)}
          >
            <Text style={styles.textoAccion}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.botonAccion}
            onPress={() => handleEliminarPublicacion(item)}
          >
            <Text style={styles.textoAccion}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.contenido}>{item.contenido}</Text>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💬</Text>
          <Text style={styles.statText}>{item.comentarios}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
       

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Formulario de creación */}
          <View style={styles.crearContainer}>
            <Text style={styles.seccionTitulo}>Nueva Publicación</Text>
            <TextInput
              style={styles.textInput}
              placeholder="¿Qué quieres compartir?"
              placeholderTextColor="#999"
              value={contenido}
              onChangeText={setContenido}
              multiline
              maxLength={500}
            />
            <View style={styles.contadorCaracteres}>
              <Text style={styles.contadorTexto}>
                {contenido.length}/500 caracteres
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.botonPublicar,
                (!contenido.trim() || guardando) && styles.botonDisabled
              ]}
              onPress={handleCrearPublicacion}
              disabled={!contenido.trim() || guardando}
            >
              <Text style={styles.botonPublicarTexto}>
                {guardando ? 'Publicando...' : '📝 Publicar'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de publicaciones */}
          <View style={styles.listaContainer}>
            <Text style={styles.seccionTitulo}>
              Mis Publicaciones ({publicaciones.length})
            </Text>
            
            {cargando ? (
              <Text style={styles.cargandoTexto}>Cargando publicaciones...</Text>
            ) : publicaciones.length === 0 ? (
              <View style={styles.vacioContainer}>
                <Text style={styles.vacioTexto}>No hay publicaciones aún</Text>
                <Text style={styles.vacioSubtexto}>
                  Crea tu primera publicación usando el formulario de arriba
                </Text>
              </View>
            ) : (
              <FlatList
                data={publicaciones}
                renderItem={renderPublicacion}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>

        {/* Modal de edición */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>Editar Publicación</Text>
              
              <TextInput
                style={[styles.textInput, styles.modalTextInput]}
                placeholder="Edita tu publicación..."
                placeholderTextColor="#999"
                value={contenido}
                onChangeText={setContenido}
                multiline
                maxLength={500}
              />
              
              <View style={styles.contadorCaracteres}>
                <Text style={styles.contadorTexto}>
                  {contenido.length}/500 caracteres
                </Text>
              </View>

              <View style={styles.modalBotones}>
                <TouchableOpacity
                  style={[styles.modalBoton, styles.botonCancelar]}
                  onPress={() => {
                    setModalVisible(false);
                    setEditando(null);
                    setContenido('');
                  }}
                >
                  <Text style={styles.modalBotonTexto}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.modalBoton,
                    styles.botonGuardar,
                    (!contenido.trim() || guardando) && styles.botonDisabled
                  ]}
                  onPress={handleEditarPublicacion}
                  disabled={!contenido.trim() || guardando}
                >
                  <Text style={styles.modalBotonTexto}>
                    {guardando ? 'Guardando...' : 'Guardar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // Header con círculo morado
  header: {
    backgroundColor: '#8A2BE2',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#8A2BE2',
  },
  circleDecoration: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: -80,
    right: -60,
  },
  headerContent: {
    zIndex: 2,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  crearContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  listaContainer: {
    flex: 1,
    margin: 20,
    marginTop: 0,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
    color: '#2c3e50',
  },
  contadorCaracteres: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  contadorTexto: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  botonPublicar: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botonDisabled: {
    backgroundColor: '#cccccc',
    shadowColor: '#cccccc',
  },
  botonPublicarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cargandoTexto: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
    marginTop: 20,
  },
  vacioContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vacioTexto: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  vacioSubtexto: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    lineHeight: 20,
  },
  publicacionItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  publicacionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8A2BE2',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  acciones: {
    flexDirection: 'row',
  },
  botonAccion: {
    padding: 6,
    marginLeft: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  textoAccion: {
    fontSize: 16,
  },
  contenido: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalTextInput: {
    minHeight: 140,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalBoton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botonCancelar: {
    backgroundColor: '#e0e0e0',
  },
  botonGuardar: {
    backgroundColor: '#8A2BE2',
  },
  modalBotonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});