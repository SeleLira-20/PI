import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  SectionList,
  Image,
} from 'react-native';

export default function InspirationScreen() {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filters = ['Todas', 'Carrera', 'Emprendimiento', 'Innovación', 'Liderazgo'];

  const inspirationData = [
    {
      title: 'Citas Motivadoras',
      data: [
        {
          id: 1,
          type: 'quote',
          content: 'La ciencia no tiene género, pero necesita más mujeres valientes que rompan barreras.',
          author: 'Dra. María Fernández',
          role: 'Astrofísica',
        },
        {
          id: 2,
          type: 'quote',
          content: 'Cada línea de código que escribes es un paso hacia cambiar el mundo.',
          author: 'Ana Torres',
          role: 'Senior Software Engineer',
        },
      ],
    },
    {
      title: 'Historias de Éxito',
      data: [
        {
          id: 3,
          type: 'story',
          title: 'De ingeniera junior a líder de equipo en Google',
          author: 'Patricia Morales',
          readTime: '8 min de lectura',
          content: 'Mi viaje de 5 años en la industria tech y cómo superé los desafíos como mujer en un ambiente predominantemente masculino...',
          likes: 456,
          category: 'Carrera',
        },
        {
          id: 4,
          type: 'story',
          title: 'Construyendo el futuro: Mi startup de IA para diagnóstico médico',
          author: 'Elena Ruiz',
          readTime: '6 min de lectura',
          content: 'Cómo transformé mi investigación doctoral en una startup que está revolucionando el diagnóstico médico temprano...',
          likes: 289,
          category: 'Emprendimiento',
        },
      ],
    },
    {
      title: 'Proyectos Destacados',
      data: [
        {
          id: 5,
          type: 'project',
          title: 'Algoritmo de detección temprana de cáncer',
          description: 'Red neuronal que mejora la detección de tumores en un 94% de precisión.',
          author: 'María González',
          tags: ['Machine Learning', 'Salud'],
        },
        {
          id: 6,
          type: 'project',
          title: 'App de educación accesible para niñas en zonas rurales',
          description: 'Plataforma que ha llegado a más de 10,000 niñas en América Latina.',
          author: 'Elena Ruiz',
          tags: ['Educación', 'Impacto Social', 'Mobile'],
        },
        {
          id: 7,
          type: 'project',
          title: 'Sistema de energía solar inteligente',
          description: 'Optimiza el consumo energético en hogares reduciendo costos hasta 40%.',
          author: 'Sofía Chen',
          tags: ['Sustentabilidad', 'Innovación', 'Energía'],
        },
      ],
    },
  ];

  const renderQuoteItem = ({ item }) => (
    <View key={item.id} style={styles.quoteCard}>
      <Text style={styles.quoteContent}>"{item.content}"</Text>
      <View style={styles.quoteAuthor}>
        <Text style={styles.authorName}>- {item.author}</Text>
        <Text style={styles.authorRole}>{item.role}</Text>
      </View>
    </View>
  );

  const renderStoryItem = ({ item }) => (
    <Pressable key={item.id} style={styles.storyCard}>
      <View style={styles.storyHeader}>
        <View style={styles.storyCategory}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.readTime}>{item.readTime}</Text>
      </View>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyAuthor}>por {item.author}</Text>
      <Text style={styles.storyContent}>{item.content}</Text>
      <View style={styles.storyFooter}>
        <Pressable style={styles.likeButton}>
          <Text style={styles.likeText}>❤️ {item.likes}</Text>
        </Pressable>
        <Pressable style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Leer más</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderProjectItem = ({ item }) => (
    <Pressable key={item.id} style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={styles.projectTags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.projectTag}>
              <Text style={styles.projectTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <Text style={styles.projectAuthor}>por {item.author}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Inspiración</Text>
          <Text style={styles.subtitle}>
            Historias que motivan y transforman
          </Text>
        </View>

        {/* Filtros */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filter,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Contenido */}
        <SectionList
          sections={inspirationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, section }) => {
            if (section.title === 'Citas Motivadoras') {
              return renderQuoteItem({ item });
            } else if (section.title === 'Historias de Éxito') {
              return renderStoryItem({ item });
            } else {
              return renderProjectItem({ item });
            }
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              {title === 'Historias de Éxito' && (
                <Pressable>
                  <Text style={styles.seeAllText}>Ver todas</Text>
                </Pressable>
              )}
            </View>
          )}
          scrollEnabled={false}
        />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#8A2BE2',
  },
  filterText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteContent: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 12,
  },
  quoteAuthor: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  authorRole: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  storyCard: {
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
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storyCategory: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  readTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  storyAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 12,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    paddingHorizontal: 8,
  },
  likeText: {
    color: '#e74c3c',
    fontSize: 14,
  },
  readMoreButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  projectCard: {
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
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 1,
  },
  projectTag: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginBottom: 4,
  },
  projectTagText: {
    color: '#8A2BE2',
    fontSize: 10,
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 8,
  },
  projectAuthor: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});