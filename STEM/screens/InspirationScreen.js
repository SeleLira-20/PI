import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  SectionList,
  Modal,
} from 'react-native';

export default function InspirationScreen() {
  // Definir filters PRIMERO, antes de cualquier uso
  const filters = ['Todas', 'Carrera', 'Emprendimiento', 'Innovación', 'Liderazgo'];
  
  // Luego los estados
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [inspiredStories, setInspiredStories] = useState(new Set());

  // Datos iniciales como constante fuera del estado para evitar problemas
  const initialInspirationData = [
    {
      title: '💫 Citas Motivadoras',
      data: [
        {
          id: 1,
          type: 'quote',
          content: 'La ciencia no tiene género, pero necesita más mujeres valientes que rompan barreras.',
          author: 'Dra. María Fernández',
          role: 'Astrofísica',
          gradient: ['#667eea', '#764ba2'],
          category: 'Carrera'
        },
        {
          id: 2,
          type: 'quote',
          content: 'Cada línea de código que escribes es un paso hacia cambiar el mundo.',
          author: 'Ana Torres',
          role: 'Senior Software Engineer',
          gradient: ['#f093fb', '#f5576c'],
          category: 'Innovación'
        },
        {
          id: 8,
          type: 'quote',
          content: 'El emprendimiento no se trata de tener todas las respuestas, sino de tener el coraje de hacer las preguntas correctas.',
          author: 'Isabel Mendoza',
          role: 'Fundadora de TechMujer',
          gradient: ['#4facfe', '#00f2fe'],
          category: 'Emprendimiento'
        },
      ],
    },
    {
      title: '🚀 Historias de Éxito',
      data: [
        {
          id: 3,
          type: 'story',
          title: 'De ingeniera junior a líder de equipo en Google',
          author: 'Patricia Morales',
          readTime: '8 min de lectura',
          content: 'Mi viaje de 5 años en la industria tech y cómo superé los desafíos como mujer en un ambiente predominantemente masculino...',
          fullContent: `Mi nombre es Patricia Morales y quiero compartir mi viaje de transformación profesional. Comencé como ingeniera junior en Google hace 5 años, recién graduada de la universidad con muchos sueños pero poca experiencia.

Los primeros meses fueron desafiantes. Como una de las pocas mujeres en mi equipo, a veces me sentía invisible en las reuniones. Pero en lugar de desanimarme, decidí convertirme en mi propia defensora.

Empecé a prepararme meticulosamente para cada reunión, a hacer preguntas estratégicas y a compartir mis ideas con confianza. También encontré una mentora dentro de la empresa que me guió y me ayudó a navegar la cultura corporativa.

El punto de inflexión llegó cuando lideré un proyecto que mejoró la eficiencia de nuestro equipo en un 40%. No solo demostré mis habilidades técnicas, sino también mi capacidad de liderazgo.

Hoy, soy líder de un equipo de 15 ingenieros y mi misión es crear un ambiente inclusivo donde todas las voces sean escuchadas. Mi consejo para otras mujeres en STEM: nunca subestimen su valor y siempre busquen oportunidades para crecer.`,
          likes: 456,
          category: 'Carrera',
          image: '👩‍💻',
        },
        {
          id: 4,
          type: 'story',
          title: 'Liderando equipos diversos hacia la innovación',
          author: 'Carolina Reyes',
          readTime: '7 min de lectura',
          content: 'Cómo implementé estrategias de liderazgo inclusivo que aumentaron la productividad y creatividad de mi equipo en un 60%...',
          fullContent: `Soy Carolina Reyes, y durante los últimos 8 años he trabajado en transformar equipos de tecnología a través del liderazgo inclusivo.

Cuando asumí la dirección de mi departamento, noté que aunque teníamos talento diverso, las mismas personas siempre dominaban las conversaciones. Decidí implementar cambios sistemáticos.

Comencé con "rondas de ideas" donde cada miembro del equipo, sin importar su seniority, tenía tiempo dedicado para compartir sus perspectivas. También establecí un programa de mentoría inversa donde los miembros junior podían enseñar a los senior sobre nuevas tecnologías.

Las reuniones de brainstorming se transformaron. Implementamos la regla del "no interrumpir" y creamos un espacio virtual anónimo para que las personas más introvertidas pudieran compartir ideas.

Los resultados fueron extraordinarios: en 6 meses, la productividad aumentó un 60% y lanzamos 3 productos innovadores que surgieron de ideas de miembros del equipo que antes no se atrevían a hablar.

El liderazgo inclusivo no es solo lo correcto, es estratégico. Cuando todas las voces son escuchadas, la innovación florece.`,
          likes: 321,
          category: 'Liderazgo',
          image: '👑',
        },
      ],
    },
    {
      title: '💡 Proyectos Destacados',
      data: [
        {
          id: 5,
          type: 'project',
          title: 'Algoritmo de detección temprana de cáncer',
          description: 'Red neuronal que mejora la detección de tumores en un 94% de precisión.',
          author: 'María González',
          tags: ['Machine Learning', 'Salud'],
          icon: '🔬',
          category: 'Innovación'
        },
        {
          id: 6,
          type: 'project',
          title: 'App de educación accesible para niñas en zonas rurales',
          description: 'Plataforma que ha llegado a más de 10,000 niñas en América Latina.',
          author: 'Elena Ruiz',
          tags: ['Educación', 'Impacto Social', 'Mobile'],
          icon: '📱',
          category: 'Emprendimiento'
        },
        {
          id: 7,
          type: 'project',
          title: 'Sistema de energía solar inteligente',
          description: 'Optimiza el consumo energético en hogares reduciendo costos hasta 40%.',
          author: 'Sofía Chen',
          tags: ['Sustentabilidad', 'Innovación', 'Energía'],
          icon: '☀',
          category: 'Innovación'
        },
      ],
    },
  ];

  const [inspirationData, setInspirationData] = useState(initialInspirationData);

  // Función para abrir el modal con la historia completa
  const handleExploreStory = (story) => {
    setSelectedStory(story);
    setStoryModalVisible(true);
  };

  // Función para manejar el "Me inspira" - CORREGIDA
  const handleInspire = (storyId) => {
    const isCurrentlyInspired = inspiredStories.has(storyId);
    
    // Actualizar el estado de inspiredStories
    setInspiredStories(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyInspired) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });

    // Actualizar los likes en inspirationData
    setInspirationData(prevData => {
      return prevData.map(section => ({
        ...section,
        data: section.data.map(item => {
          if (item.id === storyId && item.type === 'story') {
            return {
              ...item,
              likes: isCurrentlyInspired ? item.likes - 1 : item.likes + 1
            };
          }
          return item;
        })
      }));
    });

    // Actualizar la historia seleccionada en el modal si está abierto
    if (selectedStory && selectedStory.id === storyId) {
      setSelectedStory(prev => 
        prev ? { 
          ...prev, 
          likes: isCurrentlyInspired ? prev.likes - 1 : prev.likes + 1 
        } : null
      );
    }
  };

  // Verificar si una historia ya fue inspirada
  const isStoryInspired = (storyId) => {
    return inspiredStories.has(storyId);
  };

  // Filtrar el contenido según el filtro activo
  const filteredData = inspirationData.map(section => ({
    ...section,
    data: activeFilter === 'Todas' 
      ? section.data 
      : section.data.filter(item => item.category === activeFilter)
  })).filter(section => section.data.length > 0);

  const renderQuoteItem = ({ item }) => (
    <View style={[
      styles.quoteCard,
      {
        backgroundColor: item.gradient ? 'transparent' : '#fff',
      }
    ]}>
      {item.gradient && (
        <View 
          style={[
            styles.gradientBackground,
            {
              backgroundColor: item.gradient[0],
            }
          ]}
        />
      )}
      <Text style={styles.quoteContent}>"{item.content}"</Text>
      <View style={styles.quoteAuthor}>
        <View style={styles.authorBadge}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.authorRole}>{item.role}</Text>
        </View>
      </View>
    </View>
  );

  const renderStoryItem = ({ item }) => (
    <Pressable style={styles.storyCard}>
      <View style={styles.storyImageContainer}>
        <Text style={styles.storyEmoji}>{item.image}</Text>
      </View>
      <View style={styles.storyContentContainer}>
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
            <Text style={styles.likeText}>❤ {item.likes}</Text>
          </Pressable>
          <Pressable 
            style={styles.readMoreButton}
            onPress={() => handleExploreStory(item)}
          >
            <Text style={styles.readMoreText}>Explorar Historia</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  const renderProjectItem = ({ item }) => (
    <Pressable style={styles.projectCard}>
      <View style={styles.projectIcon}>
        <Text style={styles.projectIconText}>{item.icon}</Text>
      </View>
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
        <View style={styles.projectTags}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.projectTag}>
              <Text style={styles.projectTagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.projectAuthor}>por {item.author}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header que se mueve con el scroll */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Inspiración STEM</Text>
            <Text style={styles.subtitle}>
              Descubre historias que transforman el mundo
            </Text>
          </View>
          <View style={styles.decorativeCircle} />
        </View>

        {/* Filtros */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
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

        {/* Stats rápidas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150+</Text>
            <Text style={styles.statLabel}>Mentoras</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5K+</Text>
            <Text style={styles.statLabel}>Historias</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Proyectos</Text>
          </View>
        </View>

        {/* Contenido principal filtrado */}
        {filteredData.length > 0 ? (
          <SectionList
            sections={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, section }) => {
              if (section.title.includes('Citas')) {
                return renderQuoteItem({ item });
              } else if (section.title.includes('Historias')) {
                return renderStoryItem({ item });
              } else {
                return renderProjectItem({ item });
              }
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>{title}</Text>
                  <View style={styles.sectionAccent} />
                </View>
                {title.includes('Historias') && (
                  <Pressable style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>Ver todas</Text>
                  </Pressable>
                )}
              </View>
            )}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🔍</Text>
            <Text style={styles.emptyStateText}>
              No hay contenido disponible para {activeFilter}
            </Text>
            <Pressable 
              style={styles.resetFilterButton}
              onPress={() => setActiveFilter('Todas')}
            >
              <Text style={styles.resetFilterText}>Ver todo el contenido</Text>
            </Pressable>
          </View>
        )}

        {/* Espacio al final */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Modal para mostrar la historia completa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={storyModalVisible}
        onRequestClose={() => setStoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedStory && (
              <>
                {/* Header del modal */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalImageContainer}>
                    <Text style={styles.modalEmoji}>{selectedStory.image}</Text>
                  </View>
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalCategory}>{selectedStory.category}</Text>
                    <Text style={styles.modalTitle}>{selectedStory.title}</Text>
                    <Text style={styles.modalAuthor}>por {selectedStory.author}</Text>
                  </View>
                  <Pressable 
                    style={styles.closeButton}
                    onPress={() => setStoryModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </Pressable>
                </View>

                {/* Contenido de la historia */}
                <ScrollView 
                  style={styles.modalScrollView}
                  contentContainerStyle={styles.modalScrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.storyMeta}>
                    <Text style={styles.readTime}>{selectedStory.readTime}</Text>
                    <View style={styles.likesContainer}>
                      <Text style={styles.likesText}>❤ {selectedStory.likes} personas inspiradas</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.fullContent}>
                    {selectedStory.fullContent}
                  </Text>

                  {/* Sección de reflexión mejorada */}
                  <View style={styles.reflectionSection}>
                    <View style={styles.reflectionHeader}>
                      <Text style={styles.reflectionIcon}>💭</Text>
                      <Text style={styles.reflectionTitle}>Reflexión</Text>
                    </View>
                    <Text style={styles.reflectionText}>
                      Esta historia nos recuerda que el éxito en STEM se construye con perseverancia, 
                      comunidad y la valentía de abrir nuevos caminos. Cada paso que das inspira a otras 
                      mujeres a seguir sus sueños en la ciencia y tecnología.
                    </Text>
                    <View style={styles.reflectionQuote}>
                      <Text style={styles.reflectionQuoteText}>
                        "Tu camino único es tu mayor fortaleza"
                      </Text>
                    </View>
                  </View>

                  {/* Espacio para los botones */}
                  <View style={styles.modalButtonsSpacer} />
                </ScrollView>

                {/* Footer del modal - SOLO UN BOTÓN */}
                <View style={styles.modalFooter}>
                  <Pressable 
                    style={[
                      styles.inspireButton,
                      isStoryInspired(selectedStory.id) && styles.inspireButtonDisabled
                    ]}
                    onPress={() => handleInspire(selectedStory.id)}
                    disabled={isStoryInspired(selectedStory.id)}
                  >
                    <Text style={styles.inspireButtonIcon}>
                      {isStoryInspired(selectedStory.id) ? '✨' : '❤'}
                    </Text>
                    <Text style={styles.inspireButtonText}>
                      {isStoryInspired(selectedStory.id) ? '¡Ya te inspira!' : 'Esta historia me inspira'}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Los estilos se mantienen igual que en el código anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  scrollView: {
    flex: 1,
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
  decorativeCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -50,
  },
  filtersContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeFilter: {
    backgroundColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  filterText: {
    color: '#7f8c8d',
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '700',
  },
  statsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ecf0f1',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  sectionTitleContainer: {
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  sectionAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 4,
    backgroundColor: '#8A2BE2',
    borderRadius: 2,
  },
  seeAllButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  seeAllText: {
    color: '#8A2BE2',
    fontWeight: '600',
    fontSize: 14,
  },
  quoteCard: {
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  quoteContent: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#fff',
    lineHeight: 26,
    marginBottom: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  quoteAuthor: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: 16,
  },
  authorBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  authorRole: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  storyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  storyImageContainer: {
    width: 80,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyEmoji: {
    fontSize: 32,
  },
  storyContentContainer: {
    flex: 1,
    padding: 20,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storyCategory: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  readTime: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 24,
  },
  storyAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    fontWeight: '500',
  },
  storyContent: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 16,
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
    fontWeight: '500',
  },
  readMoreButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  projectCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
  },
  projectIcon: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  projectIconText: {
    fontSize: 20,
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 20,
  },
  projectDescription: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 12,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  projectTag: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  projectTagText: {
    color: '#8A2BE2',
    fontSize: 10,
    fontWeight: '600',
  },
  projectAuthor: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 16,
  },
  resetFilterButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  resetFilterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: '#8A2BE2',
    position: 'relative',
  },
  modalImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalEmoji: {
    fontSize: 28,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalCategory: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 24,
  },
  modalAuthor: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    padding: 25,
    paddingBottom: 100,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  likesContainer: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  likesText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '600',
  },
  fullContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
    marginBottom: 25,
  },
  reflectionSection: {
    backgroundColor: 'rgba(138, 43, 226, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8A2BE2',
    marginBottom: 20,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reflectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  reflectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  reflectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6B7280',
    marginBottom: 12,
  },
  reflectionQuote: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#8A2BE2',
  },
  reflectionQuoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#8A2BE2',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalButtonsSpacer: {
    height: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inspireButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  inspireButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowColor: '#9CA3AF',
  },
  inspireButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  inspireButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});