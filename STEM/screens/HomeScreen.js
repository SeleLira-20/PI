import React, { useState } from 'react';
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

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  // Datos de ejemplo mejorados con estado
  const [progressData, setProgressData] = useState([
    {
      title: 'Mi Aprendizaje',
      data: [
        {
          id: 1,
          course: 'Desarrollo Web con React',
          progress: 65,
          nextLesson: 'Hooks avanzados',
          icon: '⚛️',
          timeLeft: '2h 30min',
          enrolled: true,
        },
        {
          id: 2,
          course: 'Data Science Fundamentals',
          progress: 40,
          nextLesson: 'Visualización de datos',
          icon: '📊',
          timeLeft: '4h 15min',
          enrolled: true,
        },
      ],
    },
    {
      title: 'Cursos Recomendados',
      data: [
        {
          id: 3,
          title: 'Introducción a Machine Learning con Python',
          duration: '10 semanas',
          students: 178,
          rating: 4.7,
          level: 'Principiante',
          free: true,
          icon: '🤖',
          instructor: 'Ana Martínez',
          enrolled: false,
        },
        {
          id: 4,
          title: 'Robótica y Sistemas Autónomos',
          duration: '12 semanas',
          students: 294,
          rating: 4.9,
          level: 'Intermedio',
          free: true,
          instructor: 'Daniela Wong',
          icon: '🔧',
          enrolled: false,
        },
        {
          id: 5,
          title: 'Ciberseguridad para Mujeres',
          duration: '8 semanas',
          students: 156,
          rating: 4.8,
          level: 'Principiante',
          free: false,
          instructor: 'Laura Chen',
          icon: '🛡️',
          enrolled: false,
        },
      ],
    },
  ]);

  const featuredStories = [
    {
      id: 1,
      title: 'De estudiante a CEO de startup tech',
      author: 'Patricia Ruiz',
      category: 'Emprendimiento',
      image: '👩‍💼',
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'Rompiendo barreras en Robótica',
      author: 'Carmen Vega',
      category: 'Innovación',
      image: '👩‍🔬',
      readTime: '7 min',
    },
    {
      id: 3,
      title: 'Líder en IA a los 25 años',
      author: 'Sofia Ramirez',
      category: 'Tecnología',
      image: '👩‍💻',
      readTime: '6 min',
    },
  ];

  // Función para manejar inscripción con confirmación
  const handleEnroll = (courseId, courseTitle) => {
    Alert.alert(
      '¿Te interesa este curso?',
      `¿Deseas inscribirte en "${courseTitle}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: '¡Sí, inscribirme!',
          onPress: () => {
            // Actualizar el estado para marcar como inscrito
            setProgressData(prevData =>
              prevData.map(section => ({
                ...section,
                data: section.data.map(item =>
                  item.id === courseId ? { ...item, enrolled: true } : item
                )
              }))
            );

            Alert.alert(
              '¡Inscripción Exitosa! 🎉',
              `Te has inscrito en: ${courseTitle}`,
              [{ text: '¡Empezar a aprender!' }]
            );
          },
        },
      ]
    );
  };

  // Función para continuar curso
  const handleContinue = (courseId, courseTitle) => {
    Alert.alert(
      'Continuar Curso',
      `Continuando: ${courseTitle}`,
      [
        {
          text: 'Más tarde',
          style: 'cancel'
        },
        {
          text: 'Continuar ahora',
          onPress: () => {
            // Incrementar progreso
            setProgressData(prevData =>
              prevData.map(section => ({
                ...section,
                data: section.data.map(item =>
                  item.id === courseId && item.progress < 100
                    ? { ...item, progress: Math.min(item.progress + 10, 100) }
                    : item
                )
              }))
            );
          }
        }
      ]
    );
  };

  // Función para navegación de "Ver todo"
  const handleSeeAll = (section) => {
    if (section === 'Mi Aprendizaje' || section === 'Cursos Recomendados') {
      navigation.navigate('Cursos');
    } else if (section === 'Historias Inspiradoras') {
      navigation.navigate('Inspiración');
    }
  };

  // Componente de ítem de progreso (anteriormente con un objeto deconstruido)
  // Ahora usa el parámetro 'item' directamente para ser más compatible con la iteración manual.
  const renderProgressItem = (item) => (
    <Pressable
      key={item.id} // Añadido el 'key' prop aquí
      style={styles.progressCard}
      onPress={() => handleContinue(item.id, item.course)}
    >
      <View style={styles.progressHeader}>
        <View style={styles.courseIconContainer}>
          <Text style={styles.courseIcon}>{item.icon}</Text>
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.course}</Text>
          <Text style={styles.nextLesson}>Próximo: {item.nextLesson}</Text>
        </View>
        <Text style={styles.progressPercent}>{item.progress}%</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${item.progress}%` }]}
        />
      </View>

      <View style={styles.progressFooter}>
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>⏱️ {item.timeLeft}</Text>
        </View>
        <Pressable
          style={styles.continueButton}
          onPress={() => handleContinue(item.id, item.course)}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  // Componente de ítem de curso recomendado (anteriormente con un objeto deconstruido)
  // Ahora usa el parámetro 'item' directamente para ser más compatible con la iteración manual.
  const renderCourseItem = (item) => (
    <Pressable
      key={item.id} // Añadido el 'key' prop aquí
      style={styles.courseCard}
      onPress={() => item.enrolled ? handleContinue(item.id, item.title) : handleEnroll(item.id, item.title)}
    >
      <View style={styles.courseHeader}>
        <View style={styles.courseIconContainer}>
          <Text style={styles.courseIcon}>{item.icon}</Text>
        </View>
        <View style={styles.courseTextContent}>
          <View style={styles.courseTitleRow}>
            <Text style={styles.courseCardTitle} numberOfLines={2}>{item.title}</Text>
            {item.free && (
              <View style={styles.freeBadge}>
                <Text style={styles.freeText}>Gratis</Text>
              </View>
            )}
          </View>
          {item.instructor && (
            <Text style={styles.instructor}>Por {item.instructor}</Text>
          )}
        </View>
      </View>

      <View style={styles.courseMeta}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏰</Text>
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>👥</Text>
          <Text style={styles.metaText}>{item.students}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⭐</Text>
          <Text style={styles.metaText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.courseFooter}>
        <View style={[styles.levelContainer,
        { backgroundColor: item.level === 'Principiante' ? '#E6F7FF' : '#F0E6FF' }
        ]}>
          <Text style={[styles.levelText,
          { color: item.level === 'Principiante' ? '#1890FF' : '#8A2BE2' }
          ]}>
            {item.level}
          </Text>
        </View>
        <Pressable
          style={[
            styles.enrollButton,
            item.enrolled
              ? styles.enrollButtonEnrolled
              : styles.enrollButtonFree
          ]}
          onPress={() => {
            if (item.enrolled) {
              handleContinue(item.id, item.title);
            } else {
              handleEnroll(item.id, item.title);
            }
          }}
        >
          <Text style={styles.enrollButtonText}>
            {item.enrolled ? 'Continuar' : 'Inscribirse'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderStoryItem = (story) => (
    <Pressable
      key={story.id} // El 'key' prop ya estaba aquí correctamente
      style={styles.storyCard}
      onPress={() => navigation.navigate('Inspiración')}
    >
      <View style={styles.storyImage}>
        <Text style={styles.storyEmoji}>{story.image}</Text>
      </View>
      <View style={styles.storyContent}>
        <View style={styles.storyCategory}>
          <Text style={styles.categoryText}>{story.category}</Text>
        </View>
        <Text style={styles.storyTitle} numberOfLines={2}>{story.title}</Text>
        <Text style={styles.storyAuthor}>por {story.author}</Text>
        <View style={styles.storyMeta}>
          <Text style={styles.readTime}>{story.readTime} lectura</Text>
        </View>
      </View>
    </Pressable>
  );

  // Renderizar todo el contenido
  const renderContent = () => {
    return (
      <View>
        {/* Header Inspirador */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>¡Hola, STEM Sister! 👋</Text>
            <Text style={styles.subtitle}>
              Continua tu journey en tecnología {'\n'}
            </Text>
          </View>
          <View style={styles.decorativeCircle} />
        </View>

        {/* Sección de Historias Inspiradoras */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>📖 Historias Inspiradoras</Text>
              <Text style={styles.sectionSubtitle}>Conoce a mujeres extraordinarias en STEM</Text>
            </View>
            <Pressable
              style={styles.seeAllButton}
              onPress={() => handleSeeAll('Historias Inspiradoras')}
            >
              <Text style={styles.seeAllText}>Ver todo</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContainer}
          >
            {/* El 'key' prop ya está en renderStoryItem, esto está bien */}
            {featuredStories.map(renderStoryItem)}
          </ScrollView>
        </View>

        {/* Sección de Progreso */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>🎯 Mi Aprendizaje</Text>
              <Text style={styles.sectionSubtitle}>Continúa donde dejaste</Text>
            </View>
            <Pressable
              style={styles.seeAllButton}
              onPress={() => handleSeeAll('Mi Aprendizaje')}
            >
              <Text style={styles.seeAllText}>Ver todo</Text>
            </Pressable>
          </View>
          {/* CORRECCIÓN: Se pasó la 'key' al componente renderizado */}
          {progressData[0].data.map((item) => renderProgressItem(item))}
        </View>

        {/* Sección de Cursos Recomendados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>💡 Recomendados</Text>
              <Text style={styles.sectionSubtitle}>Cursos seleccionados para ti</Text>
            </View>
            <Pressable
              style={styles.seeAllButton}
              onPress={() => handleSeeAll('Cursos Recomendados')}
            >
              <Text style={styles.seeAllText}>Ver todo</Text>
            </Pressable>
          </View>
          {/* CORRECCIÓN: Se pasó la 'key' al componente renderizado */}
          {progressData[1].data.map((item) => renderCourseItem(item))}
        </View>

        {/* Logros */}
        <View style={styles.section}>
          <Pressable
            style={styles.achievementCard}
            onPress={() => Alert.alert('Logros', 'Aquí verías todos tus logros e insignias')}
          >
            <View style={styles.achievementIcon}><Text>🏆</Text></View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Logro "Aprendiz STEM"</Text>
              <Text style={styles.achievementText}>
                Completa 1 curso más para desbloquear esta insignia
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.achievementProgress}>
                  <View style={[styles.achievementProgressFill, { width: '66%' }]} />
                </View>
                <Text style={styles.progressText}>2/3 cursos</Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Espacio al final */}
        <View style={styles.bottomSpace} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Tus estilos se mantienen sin cambios)
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
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
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#E6E6FA',
    fontWeight: '500',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileEmoji: {
    fontSize: 20,
  },
  section: {
    backgroundColor: 'transparent',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  seeAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontSize: 14,
  },
  // Stories
  storiesContainer: {
    paddingVertical: 4,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  storyImage: {
    height: 120,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyEmoji: {
    fontSize: 48,
  },
  storyContent: {
    padding: 16,
  },
  storyCategory: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
    lineHeight: 20,
  },
  storyAuthor: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#a0aec0',
  },
  // Progress Cards
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseIcon: {
    fontSize: 20,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 2,
  },
  nextLesson: {
    fontSize: 14,
    color: '#718096',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 4,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBadge: {
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeText: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Course Cards
  courseCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  courseTextContent: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  courseCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  freeBadge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    color: '#276749',
    fontSize: 12,
    fontWeight: '600',
  },
  instructor: {
    fontSize: 14,
    color: '#718096',
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  enrollButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  enrollButtonFree: {
    backgroundColor: '#8A2BE2',
  },
  enrollButtonEnrolled: {
    backgroundColor: '#10B981',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Achievement Card
  achievementCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  achievementText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementProgress: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 3,
  },
  progressText: {
    
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  bottomSpace: {
    height: 20,
  },
});