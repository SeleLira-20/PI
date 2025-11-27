import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState('Todos');

  const tabs = [
    { id: 'Todos', label: 'Explorar' },
    { id: 'En Progreso', label: 'Mi Aprendizaje' },
    { id: 'Completados', label: 'Logros' },
    { id: 'Mentorías', label: 'Mentorías' },
  ];

  // Datos con colores originales
  const featuredCourses = [
    {
      id: 1,
      title: 'Python para Ciencia de Datos',
      category: 'Data Science',
      level: 'Principiante',
      duration: '8 semanas',
      students: '2.4K',
      rating: 4.8,
      instructor: 'Dra. Elena Martínez',
      instructorAvatar: '👩‍🔬',
      color: '#667eea',
      icon: '📊',
      description: 'Domina los fundamentos de análisis de datos con Python',
      featured: true,
    },
    {
      id: 2,
      title: 'Inteligencia Artificial Ética',
      category: 'IA & ML',
      level: 'Intermedio',
      duration: '10 semanas',
      students: '1.8K',
      rating: 4.9,
      instructor: 'Ing. Sofia Chen',
      instructorAvatar: '👩‍💻',
      color: '#764ba2',
      icon: '🤖',
      description: 'Desarrolla IA responsable y libre de sesgos',
      featured: true,
    },
    {
      id: 3,
      title: 'Desarrollo Web Full Stack',
      category: 'Programación',
      level: 'Principiante',
      duration: '12 semanas',
      students: '3.2K',
      rating: 4.7,
      instructor: 'Dev. Ana Torres',
      instructorAvatar: '👩‍🎨',
      color: '#f093fb',
      icon: '💻',
      description: 'Crea aplicaciones web completas desde cero',
    },
    {
      id: 4,
      title: 'Ciberseguridad para Startups',
      category: 'Seguridad',
      level: 'Intermedio',
      duration: '6 semanas',
      students: '1.5K',
      rating: 4.8,
      instructor: 'Ing. Carmen Vega',
      instructorAvatar: '👩‍🚀',
      color: '#4facfe',
      icon: '🛡️',
      description: 'Protege tu empresa de amenazas digitales',
    },
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Ruta Frontend',
      courses: 6,
      duration: '24 semanas',
      progress: 65,
      color: '#667eea',
      icon: '🎨',
    },
    {
      id: 2,
      title: 'Ruta Data Science',
      courses: 8,
      duration: '32 semanas',
      progress: 40,
      color: '#764ba2',
      icon: '📈',
    },
    {
      id: 3,
      title: 'Ruta Ciberseguridad',
      courses: 5,
      duration: '20 semanas',
      progress: 20,
      color: '#f093fb',
      icon: '🛡️',
    },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Daniela Wong',
      role: 'Ingeniera en Robótica',
      company: 'NASA JPL',
      specialty: 'Sistemas Autónomos',
      rating: 4.9,
      sessions: 124,
      avatar: '👩‍🚀',
      bio: 'Líder en desarrollo de sistemas robóticos para exploración espacial. Apasionada por inspirar a nuevas generaciones en STEM.',
      availability: ['Lun', 'Mié', 'Vie'],
      expertise: ['Robótica', 'IA', 'Sistemas Embebidos']
    },
    {
      id: 2,
      name: 'Máxima Leandro',
      role: 'Chief Data Scientist',
      company: 'Google AI',
      specialty: 'Machine Learning',
      rating: 4.8,
      sessions: 89,
      avatar: '👩‍💻',
      bio: 'Especialista en algoritmos de ML y ética en IA. Mentora de mujeres en carreras técnicas.',
      availability: ['Mar', 'Jue'],
      expertise: ['Machine Learning', 'Python', 'Análisis de Datos']
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Aprendiz STEM',
      description: 'Completa tu primer curso',
      progress: 1,
      total: 1,
      icon: '🌟',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Exploradora de Datos',
      description: 'Completa 3 cursos de Data Science',
      progress: 2,
      total: 3,
      icon: '📊',
      unlocked: false,
    },
    {
      id: 3,
      title: 'Mentora Junior',
      description: 'Ayuda a 5 compañeras',
      progress: 3,
      total: 5,
      icon: '💫',
      unlocked: false,
    },
  ];

  const renderFeaturedCourse = (course) => (
    <View key={course.id} style={[
      styles.featuredCourseCard,
      { borderLeftColor: course.color, borderLeftWidth: 4 }
    ]}>
      {/* Header del curso */}
      <View style={styles.courseHeader}>
        <View style={[styles.courseIconContainer, { backgroundColor: course.color + '20' }]}>
          <Text style={styles.courseIcon}>{course.icon}</Text>
        </View>
        <View style={[styles.courseCategory, { backgroundColor: course.color + '20' }]}>
          <Text style={[styles.categoryText, { color: course.color }]}>{course.category}</Text>
        </View>
      </View>
      
      {/* Información principal */}
      <View style={styles.courseContent}>
        <Text style={styles.featuredCourseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>
        
        {/* Instructor con avatar */}
        <View style={styles.instructorSection}>
          <View style={[styles.instructorAvatar, { backgroundColor: course.color + '20' }]}>
            <Text style={styles.avatarText}>{course.instructorAvatar}</Text>
          </View>
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>{course.instructor}</Text>
            <Text style={styles.courseLevel}>{course.level}</Text>
          </View>
        </View>
      </View>

      {/* Estadísticas del curso */}
      <View style={styles.courseStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{course.duration}</Text>
          <Text style={styles.statLabel}>Duración</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{course.students}</Text>
          <Text style={styles.statLabel}>Estudiantes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>⭐ {course.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* Botón de acción */}
      <Pressable 
        style={[styles.enrollButton, { backgroundColor: course.color }]}
        onPress={() => console.log('Inscribirse a:', course.title)}
      >
        <Text style={styles.enrollButtonText}>Comenzar Ahora</Text>
      </Pressable>
    </View>
  );

  const renderLearningPath = (path) => (
    <Pressable key={path.id} style={[
      styles.learningPathCard,
      { borderLeftColor: path.color, borderLeftWidth: 4 }
    ]}>
      <View style={styles.pathHeader}>
        <View style={[styles.pathIcon, { backgroundColor: path.color + '20' }]}>
          <Text style={[styles.pathIconText, { color: path.color }]}>{path.icon}</Text>
        </View>
        <View style={styles.pathInfo}>
          <Text style={styles.pathTitle}>{path.title}</Text>
          <Text style={styles.pathMeta}>{path.courses} cursos • {path.duration}</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={[styles.progressPercent, { color: path.color }]}>{path.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${path.progress}%`,
                backgroundColor: path.color
              }
            ]} 
          />
        </View>
      </View>
      
      <Pressable style={[styles.continuePathButton, { borderColor: path.color }]}>
        <Text style={[styles.continueButtonText, { color: path.color }]}>Continuar Ruta</Text>
      </Pressable>
    </Pressable>
  );

  const renderMentorCard = (mentor) => (
    <Pressable key={mentor.id} style={[styles.mentorCard, { borderLeftColor: '#667eea', borderLeftWidth: 4 }]}>
      <View style={styles.mentorHeader}>
        <View style={[styles.mentorAvatar, { backgroundColor: '#667eea20' }]}>
          <Text style={styles.avatarText}>{mentor.avatar}</Text>
        </View>
        <View style={styles.mentorInfo}>
          <Text style={styles.mentorName}>{mentor.name}</Text>
          <Text style={[styles.mentorRole, { color: '#667eea' }]}>{mentor.role}</Text>
          <Text style={styles.mentorCompany}>{mentor.company}</Text>
        </View>
        <View style={[styles.ratingBadge, { backgroundColor: '#667eea20' }]}>
          <Text style={[styles.ratingText, { color: '#667eea' }]}>⭐ {mentor.rating}</Text>
        </View>
      </View>
      
      <Text style={styles.mentorBio}>{mentor.bio}</Text>
      
      <View style={styles.mentorDetails}>
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Especialidades</Text>
          <View style={styles.expertiseContainer}>
            {mentor.expertise.map((skill, index) => (
              <View key={index} style={[styles.skillTag, { backgroundColor: '#667eea20' }]}>
                <Text style={[styles.skillText, { color: '#8A2BE2' }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Disponibilidad</Text>
          <View style={styles.availabilityContainer}>
            {mentor.availability.map((day, index) => (
              <View key={index} style={[styles.dayTag, { backgroundColor: '#764ba220' }]}>
                <Text style={[styles.dayText, { color: '#764ba2' }]}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.mentorFooter}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionsText}>{mentor.sessions} sesiones realizadas</Text>
        </View>
        <Pressable style={[styles.bookButton, { backgroundColor: '#8A2BE2' }]}>
          <Text style={styles.bookButtonText}>Reservar Sesión</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderAchievement = (achievement) => (
    <View key={achievement.id} style={[styles.achievementCard, { borderLeftColor: '#8A2BE2', borderLeftWidth: 4 }]}>
      <View style={[styles.achievementIcon, { backgroundColor: '#667eea20' }]}>
        <Text style={[styles.achievementIconText, { color: '#8A2BE2' }]}>{achievement.icon}</Text>
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDesc}>{achievement.description}</Text>
        <View style={styles.achievementProgress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(achievement.progress / achievement.total) * 100}%`,
                  backgroundColor: achievement.unlocked ? '#8A2BE2' : '#CCCCCC'
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {achievement.progress}/{achievement.total}
          </Text>
        </View>
      </View>
      {achievement.unlocked && (
        <View style={styles.unlockedBadge}>
          <Text style={styles.unlockedText}>🎉</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Inspirador */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>¡Hola, Futura Líder!</Text>
            <Text style={styles.subtitle}>
              Descubre tu potencial en STEM {'\n'}
              <Text style={styles.highlight}>Aprende, crece e inspira</Text>
            </Text>
          </View>
          <View style={styles.decorativeCircle} />
        </View>

        {/* Tabs de Navegación */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Contenido Principal */}
        {activeTab === 'Todos' && (
          <>
            {/* Cursos Destacados */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>✨ Cursos Destacados</Text>
                <Text style={styles.sectionSubtitle}>
                  Diseñados por mujeres líderes en STEM
                </Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredCoursesContainer}
              >
                {featuredCourses.map(renderFeaturedCourse)}
              </ScrollView>
            </View>

            {/* Rutas de Aprendizaje */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🎯 Rutas de Aprendizaje</Text>
                <Text style={styles.sectionSubtitle}>
                  Sigue un camino estructurado hacia el éxito
                </Text>
              </View>
              {learningPaths.map(renderLearningPath)}
            </View>
          </>
        )}

        {activeTab === 'En Progreso' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📚 Mi Aprendizaje</Text>
              <Text style={styles.sectionSubtitle}>
                Continúa donde te quedaste
              </Text>
            </View>
            {learningPaths.map(renderLearningPath)}
          </View>
        )}

        {activeTab === 'Completados' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏆 Mis Logros</Text>
              <Text style={styles.sectionSubtitle}>
                Celebra tus progresos en STEM
              </Text>
            </View>
            {achievements.map(renderAchievement)}
          </View>
        )}

        {activeTab === 'Mentorías' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>💫 Mentorías Disponibles</Text>
              <Text style={styles.sectionSubtitle}>
                Conecta con mujeres inspiradoras en STEM
              </Text>
            </View>
            
            <View style={styles.mentorshipStats}>
              <View style={[styles.statCard, { backgroundColor: '#667eea20' }]}>
                <Text style={[styles.statNumber, { color: '#667eea' }]}>{mentors.length}</Text>
                <Text style={styles.statDescription}>Mentoras Activas</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#764ba220' }]}>
                <Text style={[styles.statNumber, { color: '#764ba2' }]}>247</Text>
                <Text style={styles.statDescription}>Sesiones Realizadas</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#f093fb20' }]}>
                <Text style={[styles.statNumber, { color: '#f093fb' }]}>4.8</Text>
                <Text style={styles.statDescription}>Rating Promedio</Text>
              </View>
            </View>

            <View style={styles.mentorsList}>
              {mentors.map(renderMentorCard)}
            </View>
          </View>
        )}

        {/* ⭐⭐ MENSAJE INSPIRADOR - APARECE EN TODAS LAS PESTAÑAS ⭐⭐ */}
        <View style={styles.inspirationSection}>
          <Text style={styles.inspirationQuote}>
            "Cada mujer en STEM que persigue sus sueños, allana el camino para las que vienen detrás"
          </Text>
          <Text style={styles.inspirationAuthor}>
            - Comunidad STEM Sisters
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#8A2BE2',
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    zIndex: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  highlight: {
    fontWeight: '600',
    color: '#FFD93D',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -50,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
  },
  tabText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  // Estilos mejorados para cursos destacados
  featuredCoursesContainer: {
    paddingHorizontal: 5,
  },
  featuredCourseCard: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  courseIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseIcon: {
    fontSize: 20,
  },
  courseCategory: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  courseContent: {
    marginBottom: 16,
  },
  featuredCourseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    lineHeight: 24,
  },
  courseDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
    lineHeight: 20,
  },
  instructorSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  courseLevel: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  enrollButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  learningPathCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  pathHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pathIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pathIconText: {
    fontSize: 20,
  },
  pathInfo: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  pathMeta: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  continuePathButton: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Estilos para mentorías
  mentorshipStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 11,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  mentorsList: {
    // Contenedor para la lista vertical
  },
  mentorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  mentorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  mentorRole: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '600',
  },
  mentorCompany: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mentorBio: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  mentorDetails: {
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 11,
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  dayText: {
    fontSize: 10,
    fontWeight: '500',
  },
  mentorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionsText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  unlockedBadge: {
    marginLeft: 12,
  },
  unlockedText: {
    fontSize: 20,
  },
  // ⭐⭐ ESTILOS DEL MENSAJE INSPIRADOR ⭐⭐
  inspirationSection: {
    backgroundColor: '#8A2BE2',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inspirationQuote: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: '500',
  },
  inspirationAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
  },
});