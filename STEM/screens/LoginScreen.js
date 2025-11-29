import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import ControladorAutenticacion from '../controllers/ControladorAutenticacion';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Añade esta importación

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (route.params?.error) {
      Alert.alert("Error de Autenticación", route.params.error);
      navigation.setParams({ error: undefined });
    }
  }, [route.params, navigation]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido.');
      return;
    }

    setLoading(true);

    try {
      const resultado = await ControladorAutenticacion.iniciarSesion({
        usuario: email.trim(),
        contraseña: password.trim()
      });

      setLoading(false);

      if (resultado.exito) {
        // GUARDAR DATOS DEL USUARIO EN ASYNCSTORAGE
        await AsyncStorage.setItem('usuarioActual', JSON.stringify(resultado.usuario));
        
        Alert.alert('Éxito', resultado.mensaje);
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'Main', 
            params: { 
              usuario: resultado.usuario // ← PASAMOS LOS DATOS DEL USUARIO
            }
          }],
        });
      } else {
        Alert.alert('Error', resultado.mensaje);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error en login:', error);
      Alert.alert('Error', 'Problema de conexión con la base de datos. Reinstala la app.');
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordModal(true);
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      Alert.alert('Error', 'Por favor ingresa un email válido.');
      return;
    }

    setLoading(true);

    try {
      const resultado = await ControladorAutenticacion.recuperarContraseña({
        usuarioOCorreo: resetEmail.trim()
      });

      setLoading(false);

      if (resultado.exito) {
        Alert.alert(
          'Éxito', 
          resultado.mensaje,
          [{ 
            text: 'OK', 
            onPress: () => {
              setForgotPasswordModal(false);
              setResetEmail('');
            }
          }]
        );
      } else {
        Alert.alert('Error', resultado.mensaje);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error en recuperación:', error);
      Alert.alert('Error', 'Problema de conexión con la base de datos. Reinstala la app.');
    }
  };

  const handleRegister = () => {
    setRegisterModal(true);
  };

  const handleRegisterSubmit = async () => {
    const { name, email, password, confirmPassword } = registerData;

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const resultado = await ControladorAutenticacion.registrar({
        usuario: name.trim(),
        correo: email.trim(),
        contraseña: password.trim()
      });

      setLoading(false);

      if (resultado.exito) {
        Alert.alert(
          '¡Éxito!', 
          resultado.mensaje,
          [
            {
              text: 'Continuar',
              onPress: () => {
                setRegisterModal(false);
                setRegisterData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
                // Auto-completar el login después del registro
                setEmail(registerData.email);
                setPassword(registerData.password);
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', resultado.mensaje);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error en registro:', error);
      Alert.alert('Error', 'Problema de conexión con la base de datos. Reinstala la app.');
    }
  };

  const updateRegisterData = (field, value) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Logo y título */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../assets/steam.jpg')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>
                Conecta, aprende e inspírate con mujeres en STEM
              </Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu@email.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="**********"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    editable={!loading}
                  />
                  <Pressable
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeButton}
                    disabled={loading}
                  >
                    <Text style={styles.eyeText}>
                      {passwordVisible ? '🙈' : '👁️'}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#8A2BE2" />
                  <Text style={styles.loadingText}>Verificando credenciales...</Text>
                </View>
              ) : (
                <Pressable 
                  style={styles.loginButton} 
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </Pressable>
              )}

              <Pressable 
                style={styles.forgotPassword} 
                onPress={handleForgotPassword}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </Pressable>
            </View>

            {/* Registro */}
            <View style={styles.registerSection}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta?{' '}
              </Text>
              <Pressable onPress={handleRegister} disabled={loading}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Recuperación de Contraseña */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotPasswordModal}
        onRequestClose={() => setForgotPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recuperar Contraseña</Text>
            <Text style={styles.modalSubtitle}>
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="tu@email.com"
              placeholderTextColor="#999"
              value={resetEmail}
              onChangeText={setResetEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => {
                  setForgotPasswordModal(false);
                  setResetEmail('');
                }}
                disabled={loading}
              >
                <Text style={styles.modalButtonTextSecondary}>Cancelar</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.modalButtonPrimary, loading && styles.modalButtonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.modalButtonTextPrimary}>Enviar Enlace</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Registro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={registerModal}
        onRequestClose={() => setRegisterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.registerModalContent]}>
            <Text style={styles.modalTitle}>Crear Cuenta</Text>
            <Text style={styles.modalSubtitle}>
              Únete a nuestra comunidad de mujeres en STEM
            </Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre completo"
              placeholderTextColor="#999"
              value={registerData.name}
              onChangeText={(text) => updateRegisterData('name', text)}
              editable={!loading}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              placeholderTextColor="#999"
              value={registerData.email}
              onChangeText={(text) => updateRegisterData('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Contraseña (mínimo 6 caracteres)"
              placeholderTextColor="#999"
              value={registerData.password}
              onChangeText={(text) => updateRegisterData('password', text)}
              secureTextEntry
              editable={!loading}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#999"
              value={registerData.confirmPassword}
              onChangeText={(text) => updateRegisterData('confirmPassword', text)}
              secureTextEntry
              editable={!loading}
            />

            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => {
                  setRegisterModal(false);
                  setRegisterData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                }}
                disabled={loading}
              >
                <Text style={styles.modalButtonTextSecondary}>Cancelar</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.modalButtonPrimary, loading && styles.modalButtonDisabled]}
                onPress={handleRegisterSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.modalButtonTextPrimary}>Registrarse</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  logoImage: {
    width: 300,
    height: 350,
    borderRadius: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 8,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  eyeText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: '500',
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  registerText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  registerLink: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  // Estilos para modales
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  registerModalContent: {
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#8A2BE2',
  },
  modalButtonSecondary: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtonDisabled: {
    opacity: 0.7,
  },
  modalButtonTextPrimary: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextSecondary: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});