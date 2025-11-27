import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  SectionList,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
  const profileData = [
    {
      title: 'Logros',
      data: [
        {
          id: 1,
          type: 'achievement',
          title: 'Primera Publicación',
          description: 'Hizo su primera publicación',
          icon: '📝',
        },
        {
          id: 2,
          type: 'achievement',
          title: 'Estudiante Dedicada',
          description: 'Completó 3 cursos',
          icon: '📚',
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Conectora',
          description: 'Tener más de 100 conexiones',
          icon: '🔗',
        },
        {
          id: 4,
          type: 'achievement',
          title: 'Mentora Activa',
          description: 'Ayudó a 10 personas',
          icon: '💫',
        },
      ],
    },
    {
      title: 'Cursos Completados',
      data: [
        {
          id: 5,
          type: 'course',
          title: 'Desarrollo Web con React',
          date: 'Oct 2025',
        },
        {
          id: 6,
          type: 'course',
          title: 'Python para Data Science',
          date: 'Sep 2025',
        },
        {
          id: 7,
          type: 'course',
          title: 'Fundamentos de Machine Learning',
          date: 'Ago 2025',
        },
      ],
    },
    {
      title: 'Mis Publicaciones',
      data: [
        {
          id: 8,
          type: 'post',
          content: '¡Acabo de completar mi primer proyecto de ML! Gracias a todas por el apoyo',
          likes: 89,
          comments: 23,
          time: 'Hace 2 días',
        },
        {
          id: 9,
          type: 'post',
          content: '¿Alguien tiene experiencia con TensorFlow? Necesito algunos consejos para mi proyecto.',
          likes: 45,
          comments: 17,
          time: 'Hace 5 días',
        },
      ],
    },
  ];

  const activityStats = [
    { label: 'Publicaciones este mes', value: '8' },
    { label: 'Comentarios realizados', value: '42' },
    { label: 'Nuevas conexiones', value: '15' },
  ];

  const renderAchievementItem = ({ item }) => (
    <View key={item.id} style={styles.achievementItem}>
      <Text style={styles.achievementIcon}>{item.icon}</Text>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDesc}>{item.description}</Text>
      </View>
    </View>
  );

  const renderCourseItem = ({ item }) => (
    <View key={item.id} style={styles.courseItem}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDate}>{item.date}</Text>
      </View>
      <View style={styles.completedBadge}>
        <Text style={styles.completedText}>Completado</Text>
      </View>
    </View>
  );

  const renderPostItem = ({ item }) => (
    <View key={item.id} style={styles.postItem}>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postStats}>
        <Text style={styles.postStat}>{item.likes} me gusta</Text>
        <Text style={styles.postStat}>•</Text>
        <Text style={styles.postStat}>{item.comments} comentarios</Text>
        <Text style={styles.postStat}>•</Text>
        <Text style={styles.postStat}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header del perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>María Sánchez</Text>
              <Text style={styles.profileRole}>Ingeniera de Software</Text>
              <Text style={styles.profileBio}>
                Apasionada por el desarrollo de aplicaciones móviles y mentoría de mujeres en tech
              </Text>
            </View>
          </View>

          {/* Estadísticas */}
          <View style={styles.statsSection}>
            {activityStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contenido del perfil */}
        <SectionList
          sections={profileData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, section }) => {
            if (section.title === 'Logros') {
              return renderAchievementItem({ item });
            } else if (section.title === 'Cursos Completados') {
              return renderCourseItem({ item });
            } else {
              return renderPostItem({ item });
            }
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              {title === 'Mis Publicaciones' && (
                <Pressable>
                  <Text style={styles.seeAllText}>Ver todas</Text>
                </Pressable>
              )}
            </View>
          )}
          scrollEnabled={false}
        />

        {/* Botón de cerrar sesión */}
        <Pressable 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8A2BE2',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#8A2BE2',
    fontWeight: '600',
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  courseDate: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  completedBadge: {
    backgroundColor: '#90EE90',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  completedText: {
    color: '#006400',
    fontSize: 12,
    fontWeight: '600',
  },
  postItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postContent: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  postStat: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});