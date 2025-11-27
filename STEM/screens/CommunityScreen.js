import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  TextInput,
  SectionList,
} from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('Publicaciones');
  const [activeFilter, setActiveFilter] = useState('Todo');

  const filters = ['Todo', 'IA & ML', 'Ingeniería', 'Ciencia'];
  
  const posts = [
    {
      id: 1,
      user: 'Elena Morales',
      role: 'Data Scientist',
      time: 'Hace 1 hora',
      content: '¿Alguien tiene experiencia con TensorFlow 2.0? Estoy trabajando en un proyecto de visión por computadora y me encantaría conectar con otras desarrolladoras 😊',
      tags: ['IA', 'Machine Learning', 'TensorFlow'],
      likes: 42,
      comments: 15,
    },
    {
      id: 2,
      user: 'Laura Kim',
      role: 'Estudiante de CS',
      time: 'Hace 2 horas',
      content: '¿Cómo manejan el balance entre vida personal y carrera en tech?',
      tags: [],
      likes: 24,
      comments: 24,
    },
    {
      id: 3,
      user: 'Ana Beltrán',
      role: 'Ingeniera de Software',
      time: 'Hace 4 horas',
      content: '¿Qué lenguaje recomiendan para empezar en desarrollo móvil?',
      tags: [],
      likes: 18,
      comments: 18,
    },
  ];

  const questions = [
    {
      id: 1,
      user: 'Carla Ruiz',
      time: 'Hace 3 horas',
      content: '¿Alguien sabe de buenos recursos para aprender Docker?',
      answers: 8,
    },
  ];

  const renderPost = (post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{post.user}</Text>
            <Text style={styles.userRole}>{post.role}</Text>
          </View>
        </View>
        <Text style={styles.time}>{post.time}</Text>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {post.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.postActions}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>👍 {post.likes}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {post.comments} respuestas</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Responder</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderQuestion = (question) => (
    <View key={question.id} style={styles.questionCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{question.user}</Text>
          </View>
        </View>
        <Text style={styles.time}>{question.time}</Text>
      </View>
      
      <Text style={styles.postContent}>{question.content}</Text>
      
      <View style={styles.postActions}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>{question.answers} respuestas</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Responder</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Comunidad</Text>
          <Text style={styles.subtitle}>
            Buscar publicaciones, temas...
          </Text>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en la comunidad..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'Publicaciones' && styles.activeTab]}
            onPress={() => setActiveTab('Publicaciones')}
          >
            <Text style={[styles.tabText, activeTab === 'Publicaciones' && styles.activeTabText]}>
              Publicaciones
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Preguntas' && styles.activeTab]}
            onPress={() => setActiveTab('Preguntas')}
          >
            <Text style={[styles.tabText, activeTab === 'Preguntas' && styles.activeTabText]}>
              Preguntas
            </Text>
          </Pressable>
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
        <View style={styles.content}>
          {activeTab === 'Publicaciones' ? (
            <>
              {posts.map(renderPost)}
            </>
          ) : (
            <>
              {questions.map(renderQuestion)}
            </>
          )}
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
  searchContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  tabsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#8A2BE2',
  },
  tabText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#8A2BE2',
    fontWeight: '600',
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
  content: {
    padding: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8A2BE2',
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  userRole: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  time: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  postContent: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E6E6FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#8A2BE2',
    fontSize: 12,
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  actionButton: {
    paddingHorizontal: 8,
  },
  actionText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
});