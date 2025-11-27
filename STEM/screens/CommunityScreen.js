import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('Publicaciones');
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Elena Morales',
      role: 'Data Scientist',
      time: 'Hace 1 hora',
      content: '¿Alguien tiene experiencia con TensorFlow 2.0? Estoy trabajando en un proyecto de visión por computadora y me encantaría conectar con otras desarrolladoras 😊',
      tags: ['IA', 'Machine Learning', 'TensorFlow'],
      likes: 42,
      comments: 15,
      avatar: '👩‍💻',
      category: 'IA & ML'
    },
    {
      id: 2,
      user: 'Laura Kim',
      role: 'Estudiante de CS',
      time: 'Hace 2 horas',
      content: '¿Cómo manejan el balance entre vida personal y carrera en tech? Compartan sus tips 💫',
      tags: ['Bienestar', 'Carrera'],
      likes: 24,
      comments: 24,
      avatar: '👩‍🎓',
      category: 'Carreras'
    },
    {
      id: 3,
      user: 'Ana Beltrán',
      role: 'Ingeniera de Software',
      time: 'Hace 4 horas',
      content: '¿Qué lenguaje recomiendan para empezar en desarrollo móvil? Estoy entre Kotlin y Swift 🚀',
      tags: ['Desarrollo Móvil', 'Programación'],
      likes: 18,
      comments: 18,
      avatar: '👩‍🔧',
      category: 'Ingeniería'
    },
    {
      id: 4,
      user: 'María González',
      role: 'Bioingeniera',
      time: 'Hace 5 horas',
      content: 'Acabo de publicar mi investigación sobre nuevos materiales biocompatibles. ¡Estoy muy emocionada! 🧪',
      tags: ['Investigación', 'Biotecnología'],
      likes: 32,
      comments: 8,
      avatar: '👩‍🔬',
      category: 'Biotecnología'
    },
  ]);

  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);

  const filters = ['Todo', 'IA & ML', 'Ingeniería', 'Ciencia', 'Mentoría', 'Carreras', 'Desarrollo Web', 'Data Science', 'Robótica', 'Biotecnología'];
  
  const questions = [
    {
      id: 1,
      user: 'Carla Ruiz',
      time: 'Hace 3 horas',
      content: '¿Alguien sabe de buenos recursos para aprender Docker?',
      answers: 8,
      avatar: '👩‍🔬',
      category: 'Ingeniería'
    },
    {
      id: 2,
      user: 'Sofia Chen',
      time: 'Hace 6 horas',
      content: '¿Qué consejos tienen para postular a internships en FAANG companies?',
      answers: 12,
      avatar: '👩‍💼',
      category: 'Carreras'
    },
  ];

  // Función para aumentar los corazones
  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  // Función para mostrar comentarios en modal
  const handleShowComments = (postId) => {
    // Datos de ejemplo para comentarios
    const commentsData = [
      {
        id: 1,
        user: 'María López',
        avatar: '👩‍💼',
        time: 'Hace 30 min',
        comment: '¡Excelente pregunta! Yo he usado TensorFlow en varios proyectos.'
      },
      {
        id: 2,
        user: 'Ana García',
        avatar: '👩‍🔬',
        time: 'Hace 15 min',
        comment: 'Te recomiendo empezar con los tutoriales oficiales, son muy buenos.'
      }
    ];
    
    setSelectedPostComments(commentsData);
    setCommentsModalVisible(true);
  };

  const filteredPosts = activeFilter === 'Todo' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  const filteredQuestions = activeFilter === 'Todo'
    ? questions
    : questions.filter(question => question.category === activeFilter);

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>{post.avatar}</Text>
          </View>
          <View style={styles.userText}>
            <Text style={styles.userName}>{post.user}</Text>
            <Text style={styles.userRole}>{post.role}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{post.time}</Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.postActions}>
        <Pressable 
          style={styles.actionButton}
          onPress={() => handleLike(post.id)}
        >
          <Text style={styles.actionText}>💜 {post.likes}</Text>
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={() => handleShowComments(post.id)}
        >
          <Text style={styles.actionText}>💬 {post.comments}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>🔄 Compartir</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderQuestion = (question) => (
    <View key={question.id} style={styles.questionCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>{question.avatar}</Text>
          </View>
          <View style={styles.userText}>
            <Text style={styles.userName}>{question.user}</Text>
            <View style={styles.questionBadge}>
              <Text style={styles.questionBadgeText}>Pregunta</Text>
            </View>
          </View>
        </View>
        <Text style={styles.time}>{question.time}</Text>
      </View>
      
      <Text style={styles.postContent}>{question.content}</Text>
      
      <View style={styles.postActions}>
        <Pressable style={styles.answerButton}>
          <Text style={styles.answerButtonText}>📝 Responder</Text>
        </Pressable>
        <Text style={styles.answerCount}>{question.answers} respuestas</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Inspirador */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Comunidad</Text>
            <Text style={styles.subtitle}>
              Conecta, comparte y crece con mujeres en STEM {'\n'}
            </Text>
          </View>
          <View style={styles.decorativeCircle} />
        </View>

        {/* Tabs con diseño moderno */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'Publicaciones' && styles.activeTab]}
            onPress={() => setActiveTab('Publicaciones')}
          >
            <Text style={[styles.tabText, activeTab === 'Publicaciones' && styles.activeTabText]}>
              📝 Publicaciones
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Preguntas' && styles.activeTab]}
            onPress={() => setActiveTab('Preguntas')}
          >
            <Text style={[styles.tabText, activeTab === 'Preguntas' && styles.activeTabText]}>
              ❓ Preguntas
            </Text>
          </Pressable>
        </View>

        {/* Filtros con scroll horizontal - MÁS TEMAS */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Explorar temas</Text>
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
        </View>

        {/* Botón de nueva publicación */}
        <Pressable style={styles.newPostButton}>
          <Text style={styles.newPostButtonText}>+ Nueva Publicación</Text>
        </Pressable>

        {/* Contenido filtrado */}
        <View style={styles.content}>
          {activeTab === 'Publicaciones' ? (
            <>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(renderPost)
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateEmoji}>👩‍🔬</Text>
                  <Text style={styles.emptyStateText}>
                    No hay publicaciones en {activeFilter}
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map(renderQuestion)
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateEmoji}>❓</Text>
                  <Text style={styles.emptyStateText}>
                    No hay preguntas en {activeFilter}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        {/* Espacio al final */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Modal para comentarios */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentsModalVisible}
        onRequestClose={() => setCommentsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comentarios</Text>
              <Pressable 
                style={styles.closeButton}
                onPress={() => setCommentsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            
            <ScrollView style={styles.commentsList}>
              {selectedPostComments.map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <View style={styles.commentUser}>
                      <Text style={styles.commentAvatar}>{comment.avatar}</Text>
                      <Text style={styles.commentUserName}>{comment.user}</Text>
                    </View>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Escribe un comentario..."
                placeholderTextColor="#9CA3AF"
              />
              <Pressable style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Enviar</Text>
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
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 5,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filtersSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C1D95',
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filtersContent: {
    paddingRight: 20,
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#8A2BE2',
    borderColor: '#7C3AED',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newPostButton: {
    backgroundColor: '#8A2BE2',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  newPostButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDE9FE',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DDD6FE',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  userText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4C1D95',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '500',
  },
  timeContainer: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  postContent: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  tagText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 15,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
  },
  actionText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  questionBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  questionBadgeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  answerButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  answerCount: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
    alignSelf: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
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
  },
  bottomSpace: {
    height: 30,
  },
  // Estilos para el modal de comentarios
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C1D95',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  commentsList: {
    flex: 1,
    marginBottom: 15,
  },
  commentItem: {
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    fontSize: 16,
    marginRight: 8,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4C1D95',
  },
  commentTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 14,
    color: '#374151',
  },
  sendButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});