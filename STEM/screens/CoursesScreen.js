import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  SectionList,
} from 'react-native';

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState('Todos');

  const tabs = ['Todos', 'En Progreso', 'Completados', 'Guardados'];

  const coursesData = [
    {
      title: 'Mi Aprendizaje',
      data: [
        {
          id: 1,
          title: 'Desarrollo Web con React',
          progress: 65,
          nextLesson: 'Hooks avanzados',
          enrolled: true,
        },
        {
          id: 2,
          title: 'Data Science Fundamentals',
          progress: 40,
          nextLesson: 'Visualización de datos',
          enrolled: true,
        },
      ],
    },
    {
      title: 'Cursos Disponibles',
      data: [
        {
          id: 3,
          title: 'Introducción a Machine Learning con Python',
          duration: '10 semanas',
          students: 178,
          rating: 4.7,
          level: 'Principiante',
          free: true,
          instructor: 'Máxima Leandro',
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
        {
          id: 5,
          title: 'Python para Data Science',
          duration: '8 semanas',
          students: 342,
          rating: 4.8,
          level: 'Principiante',
          free: false,
          instructor: 'Ana Torres',
        },
      ],
    },
    {
      title: 'Mentorías',
      data: [
        {
          id: 6,
          title: 'Sesión de Mentoría: Carrera en Tech',
          type: '1:1',
          duration: '45 min',
          mentor: 'Patricia Ruiz',
          available: true,
        },
        {
          id: 7,
          title: 'Workshop: Preparación de CV',
          type: 'Grupal',
          duration: '2 horas',
          mentor: 'Carmen Vega',
          available: false,
        },
      ],
    },
  ];

  const featuredMentors = [
    {
      id: 1,
      name: 'Daniela Wong',
      role: 'Ingeniera en Robótica',
      specialty: 'Sistemas Autónomos',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Máxima Leandro',
      role: 'Data Scientist',
      specialty: 'Machine Learning',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Ana Torres',
      role: 'Software Engineer',
      specialty: 'Python & Data Science',
      rating: 4.8,
    },
  ];

  const renderLearningItem = ({ item }) => (
    <Pressable style={styles.learningCard}>
      <View style={styles.learningHeader}>
        <Text style={styles.learningTitle}>{item.title}</Text>
        <Text style={styles.progressPercent}>{item.progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { width: `${item.progress}%` }]} 
        />
      </View>
      <Text style={styles.nextLesson}>Próxima lección: {item.nextLesson}</Text>
      <Pressable style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </Pressable>
    </Pressable>
  );

  const renderCourseItem = ({ item }) => (
    <Pressable style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        {item.free && (
          <View style={styles.freeBadge}>
            <Text style={styles.freeText}>Gratis</Text>
          </View>
        )}
      </View>
      <Text style={styles.instructor}>Por {item.instructor}</Text>
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
          {item.free ? 'Inscribirse' : 'Comprar'}
        </Text>
      </Pressable>
    </Pressable>
  );

  const renderMentorshipItem = ({ item }) => (
    <Pressable style={styles.mentorshipCard}>
      <View style={styles.mentorshipHeader}>
        <Text style={styles.mentorshipTitle}>{item.title}</Text>
        <View style={[
          styles.typeBadge,
          item.type === '1:1' ? styles.oneOnOneBadge : styles.groupBadge
        ]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.mentor}>Mentor: {item.mentor}</Text>
      <View style={styles.mentorshipMeta}>
        <Text style={styles.mentorshipMetaText}>{item.duration}</Text>
        <View style={[
          styles.availabilityBadge,
          item.available ? styles.availableBadge : styles.unavailableBadge
        ]}>
          <Text style={styles.availabilityText}>
            {item.available ? 'Disponible' : 'Próximamente'}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Cursos</Text>
            <View style={styles.mentorshipBadge}>
              <Text style={styles.mentorshipText}>8 Mentorías</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Aprende con las mejores en STEM
          </Text>
        </View>

        {/* Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Logro */}
        <View style={styles.achievementSection}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>
              Completa 3 cursos y gana una insignia
            </Text>
            <Text style={styles.achievementText}>
              Te faltan 2 cursos para desbloquear el logro "Aprendiz STEM"
            </Text>
          </View>
        </View>

        {/* Cursos y Mentorías */}
        <SectionList
          sections={coursesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, section }) => {
            if (section.title === 'Mi Aprendizaje') {
              return renderLearningItem({ item });
            } else if (section.title === 'Cursos Disponibles') {
              return renderCourseItem({ item });
            } else {
              return renderMentorshipItem({ item });
            }
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Pressable>
                <Text style={styles.seeAllText}>Ver todo</Text>
              </Pressable>
            </View>
          )}
          scrollEnabled={false}
        />

        {/* Mentorías Destacadas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mentoras Destacadas</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredMentors.map((mentor) => (
              <Pressable key={mentor.id} style={styles.mentorCard}>
                <View style={styles.mentorAvatar} />
                <Text style={styles.mentorName}>{mentor.name}</Text>
                <Text style={styles.mentorRole}>{mentor.role}</Text>
                <Text style={styles.mentorSpecialty}>{mentor.specialty}</Text>
                <View style={styles.mentorRating}>
                  <Text style={styles.ratingText}>⭐ {mentor.rating}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  mentorshipBadge: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mentorshipText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
  },
  tabText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  achievementSection: {
    padding: 20,
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
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  learningCard: {
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
  learningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  learningTitle: {
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
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  courseTitle: {
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
  mentorshipCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF69B4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mentorshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  mentorshipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  oneOnOneBadge: {
    backgroundColor: '#FFE4E1',
  },
  groupBadge: {
    backgroundColor: '#F0E68C',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mentor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  mentorshipMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mentorshipMetaText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availableBadge: {
    backgroundColor: '#90EE90',
  },
  unavailableBadge: {
    backgroundColor: '#FFB6C1',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mentorCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    width: 140,
    alignItems: 'center',
  },
  mentorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    marginBottom: 8,
  },
  mentorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
    textAlign: 'center',
  },
  mentorRole: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
    textAlign: 'center',
  },
  mentorSpecialty: {
    fontSize: 11,
    color: '#8A2BE2',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  mentorRating: {
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '600',
  },
});