import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Temporizador para cambiar a la pantalla de login después de 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo STEM - imagen local */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/stem.jpg')} // ← Tu imagen local
          style={styles.logoImage}
          resizeMode="cover"
        />
        <Text style={styles.subtitle}>Ciencia • Tecnología • Ingeniería • Matemáticas</Text>
      </View>
      
      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingDot}></View>
        <View style={styles.loadingDot}></View>
        <View style={styles.loadingDot}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100, // Esto hace la imagen circular
    borderWidth: 3,
    borderColor: '#8A2BE2',
    // Sombras para efecto de profundidad
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.8,
    letterSpacing: 1,
    lineHeight: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8A2BE2',
    marginHorizontal: 5,
    opacity: 0.6,
  },
});

export default SplashScreen;