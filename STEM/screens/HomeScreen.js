import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Image,
  SectionList,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  // Datos de ejemplo
  const progressData = [
    {
      title: 'Mi Aprendizaje',
      data: [
        {
          id: 1,
          course: 'Desarrollo Web con React',
          progress: 65,
          nextLesson: 'Hooks avanzados',
        },
        {
          id: 2,
          course: 'Data Science Fundamentals',
          progress: 40,
          nextLesson: 'Visualización de datos',
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
        },
      ],
    },
  ];

  const featuredStories = [
    {
      id: 1,
      title: 'De estudiante a CEO de startup tech',
      author: 'Patricia Ruiz',
      category: 'Emprendimiento',
    },
    {
      id: 2,
      title: 'Rompiendo barreras en Robótica',
      author: 'Carmen Vega',
      category: 'Innovación',
    },
  ];

  const renderProgressItem = ({ item }) => (
    <Pressable style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.courseTitle}>{item.course}</Text>
        <Text style={styles.progressPercent}>{item.progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { width: `${item.progress}%` }]} 
        />
      </View>
      <Text style={styles.nextLesson}>Próxima lección: {item.nextLesson}</Text>
    </Pressable>
  );

  const renderCourseItem = ({ item }) => (
    <Pressable style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseCardTitle}>{item.title}</Text>
        {item.free && (
          <View style={styles.freeBadge}>
            <Text style={styles.freeText}>Gratis</Text>
          </View>
        )}
      </View>
      {item.instructor && (
        <Text style={styles.instructor}>Por {item.instructor}</Text>
      )}
      <View style={styles.courseMeta}>
        <Text style={styles.courseMetaText}>{item.duration}</Text>
        <Text style={styles.courseMetaText}>•</Text>
        <Text style={styles.courseMetaText}>{item.students} estudiantes</Text>
        <Text style={styles.courseMetaText}>•</Text>
        <Text style={styles.courseMetaText}>⭐ {item.rating}</Text>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>{item.level}</Text>
      </View>
      <Pressable style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>
          {item.free ? 'Inscribirse' : 'Inscrito'}
        </Text>
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>¡Bienvenida a STEM Sisters!</Text>
          <Text style={styles.welcomeSubtitle}>
            Tu comunidad de mujeres en ciencia y tecnología
          </Text>
        </View>

        {/* Sección de Historias Inspiradoras */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Historias Inspiradoras</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Explorar</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredStories.map((story) => (
              <Pressable key={story.id} style={styles.storyCard}>
                <View style={styles.storyCategory}>
                  <Text style={styles.categoryText}>{story.category}</Text>
                </View>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyAuthor}>por {story.author}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Sección de Progreso y Cursos */}
        <SectionList
          sections={progressData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, section }) => 
            section.title === 'Mi Aprendizaje' 
              ? renderProgressItem({ item })
              : renderCourseItem({ item })
          }
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Pressable>
                  <Text style={styles.seeAllText}>Ver todo</Text>
                </Pressable>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />

        {/* Logros */}
        <View style={styles.section}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>
              [Completa 3 cursos y gana una insignia]
            </Text>
            <Text style={styles.achievementText}>
              Te faltan 2 cursos para desbloquear el logro "Aprendiz STEM"
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  storyCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    width: 200,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  storyAuthor: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  progressCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 3,
  },
  nextLesson: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  courseCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  courseCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  freeBadge: {
    backgroundColor: '#90EE90',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    color: '#006400',
    fontSize: 12,
    fontWeight: '600',
  },
  instructor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  courseMetaText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 6,
  },
  levelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  levelText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  enrollButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementCard: {
    backgroundColor: '#FFF0F5',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  achievementText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});