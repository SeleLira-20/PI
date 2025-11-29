import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const profileData = [
    {
      title: '🎯 Logros',
      data: [
        {
          id: 1,
          type: 'achievement',
          title: 'Primera Publicación',
          description: 'Hizo su primera publicación',
          icon: '📝',
          color: '#8A2BE2',
        },
        {
          id: 2,
          type: 'achievement',
          title: 'Estudiante Dedicada',
          description: 'Completó 3 cursos',
          icon: '📚',
          color: '#FF6B6B',
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Conectora',
          description: 'Tener más de 100 conexiones',
          icon: '🔗',
          color: '#4ECDC4',
        },
      ],
    },
    {
      title: '🎓 Cursos Completados',
      data: [
        {
          id: 4,
          type: 'course',
          title: 'Desarrollo Web con React',
          date: 'Oct 2025',
          progress: 100,
        },
        {
          id: 5,
          type: 'course',
          title: 'Python para Data Science',
          date: 'Sep 2025',
          progress: 100,
        },
      ],
    },
    {
      title: '💬 Mis Publicaciones',
      data: [
        {
          id: 6,
          type: 'post',
          content: '¡Acabo de completar mi primer proyecto de ML! Gracias a todas por el apoyo',
          likes: 89,
          comments: 23,
          time: 'Hace 2 días',
        },
      ],
    },
  ];

  const activityStats = [
    { label: 'Publicaciones', value: '8', icon: '📝' },
    { label: 'Comentarios', value: '42', icon: '💬' },
    { label: 'Conexiones', value: '15', icon: '🔗' },
    { label: 'Logros', value: '12', icon: '🏆' },
  ];

  // Función para mostrar el alert de confirmación
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás segura de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => console.log('Cancelar cerrar sesión')
        },
        {
          text: 'Sí, Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            console.log('Sesión cerrada');
            navigation.navigate('Login');
          }
        }
      ],
      { cancelable: true }
    );
  };

  const renderAchievementItem = (item) => (
    <View key={item.id} style={[styles.achievementItem, { borderLeftColor: item.color }]}>
      <View style={[styles.achievementIconContainer, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.achievementIcon}>{item.icon}</Text>
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDesc}>{item.description}</Text>
      </View>
    </View>
  );

  const renderCourseItem = (item) => (
    <View key={item.id} style={styles.courseItem}>
      <View style={styles.courseIcon}>
        <Text style={styles.courseIconText}>🎓</Text>
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDate}>{item.date}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
        </View>
      </View>
      <View style={styles.completedBadge}>
        <Text style={styles.completedText}>✓</Text>
      </View>
    </View>
  );

  const renderPostItem = (item) => (
    <View key={item.id} style={styles.postItem}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUserName}>María Sánchez</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postStats}>
        <View style={styles.postStatItem}>
          <Text style={styles.postStatIcon}>❤️</Text>
          <Text style={styles.postStatText}>{item.likes}</Text>
        </View>
        <View style={styles.postStatItem}>
          <Text style={styles.postStatIcon}>💬</Text>
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
        <View style={styles.postStatItem}>
          <Text style={styles.postStatIcon}>🔄</Text>
          <Text style={styles.postStatText}>Compartir</Text>
        </View>
      </View>
    </View>
  );

  // En ProfileScreen.js - busca la función renderSection y reemplázala:
const renderSection = (section) => (
  <View key={section.title} style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.title.includes('Publicaciones') && (
        <Pressable 
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('MisPublicaciones')}
        >
          <Text style={styles.seeAllText}>Ver todo</Text>
        </Pressable>
      )}
    </View>
    {section.data.map((item) => {
      if (section.title.includes('Logros')) {
        return renderAchievementItem(item);
      } else if (section.title.includes('Cursos')) {
        return renderCourseItem(item);
      } else {
        return renderPostItem(item);
      }
    })}
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header del perfil - VERSIÓN CORREGIDA */}
        <View style={styles.profileHeader}>
          <View style={styles.headerBackground} />
          
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MS</Text>
              </View>
              <View style={styles.onlineIndicator} />
            </View>
          </View>

          <View style={styles.profileInfoSection}>
            <Text style={styles.profileName}>María Sánchez</Text>
            <Text style={styles.profileRole}>Ingeniera de Software</Text>
            <Text style={styles.profileBio}>
              Apasionada por el desarrollo de aplicaciones móviles y mentoría de mujeres en tech
            </Text>
          </View>

          {/* Estadísticas */}
          <View style={styles.statsSection}>
            {activityStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contenido del perfil */}
        <View style={styles.sectionsContainer}>
          {profileData.map(renderSection)}
        </View>

        {/* Botón de cerrar sesión CON CONFIRMACIÓN */}
        <Pressable 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
        </Pressable>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  headerBackground: {
    height: 80,
    backgroundColor: '#8A2BE2',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: -35,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfoSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 15,
    color: '#8A2BE2',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  profileBio: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 16,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  section: {
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontSize: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
  },
  achievementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIcon: {
    fontSize: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  courseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  courseIconText: {
    fontSize: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  courseDate: {
    fontSize: 12,
    color: '#8A2BE2',
    fontWeight: '500',
    marginBottom: 5,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  completedBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  completedText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#8A2BE2',
    marginRight: 10,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  postContent: {
    fontSize: 13,
    color: '#2c3e50',
    lineHeight: 18,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  postStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  postStatText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fff',
    margin: 15,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ffebee',
  },
  logoutButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 10,
  },
});