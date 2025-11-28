import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  Modal,
  Share,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CoursesScreen() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [certificateModalVisible, setCertificateModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
      expertise: ['Robótica', 'IA', 'Sistemas Embebidos'],
      availableSlots: {
        'Lun': ['09:00', '11:00', '14:00', '16:00'],
        'Mié': ['10:00', '13:00', '15:00', '17:00'],
        'Vie': ['08:00', '12:00', '14:00', '16:00']
      }
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
      expertise: ['Machine Learning', 'Python', 'Análisis de Datos'],
      availableSlots: {
        'Mar': ['09:30', '11:30', '14:30', '16:30'],
        'Jue': ['10:30', '13:30', '15:30', '17:30']
      }
    },
  ];

  // Logros actualizados con información para certificados
  const achievements = [
    {
      id: 1,
      title: 'Python para Ciencia de Datos',
      description: 'Completado con excelencia el curso de Python para Data Science',
      progress: 1,
      total: 1,
      icon: '🐍',
      unlocked: true,
      completionDate: '15 Nov 2024',
      instructor: 'Dra. Elena Martínez',
      duration: '8 semanas',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
      certificateId: 'CAPN-PYTHON-001',
    },
    {
      id: 2,
      title: 'Inteligencia Artificial Ética',
      description: 'Dominio de conceptos fundamentales de IA responsable',
      progress: 1,
      total: 1,
      icon: '🤖',
      unlocked: true,
      completionDate: '22 Nov 2024',
      instructor: 'Ing. Sofia Chen',
      duration: '10 semanas',
      skills: ['Machine Learning', 'Algoritmos', 'Ética IA'],
      certificateId: 'CAPN-AI-002',
    },
    {
      id: 3,
      title: 'Mentora Junior',
      description: 'Ayuda a 5 compañeras en su camino STEM',
      progress: 3,
      total: 5,
      icon: '💫',
      unlocked: false,
    },
  ];

  // Funciones para Certificados
  const handleAchievementPress = (achievement) => {
    if (achievement.unlocked) {
      setSelectedAchievement(achievement);
      setCertificateModalVisible(true);
    }
  };

  const handleShareCertificate = async () => {
    try {
      await Share.share({
        message: `¡Obtuve mi certificado en ${selectedAchievement.title} en CAPNSTEM! 🎓\n\nCompletado el: ${selectedAchievement.completionDate}\nID del certificado: ${selectedAchievement.certificateId}\n\n#MujeresEnSTEM #CAPNSTEM`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleDownloadCertificate = () => {
    alert(`📄 Certificado ${selectedAchievement.certificateId} descargado`);
  };

  // Funciones para Reservas de Mentorías
  const handleBookMentoring = (mentor) => {
    setSelectedMentor(mentor);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingModalVisible(true);
  };

  const handleConfirmBooking = () => {
    if (selectedMentor && selectedDate && selectedTime) {
      alert(`✅ Reserva confirmada!\n\nMentora: ${selectedMentor.name}\nDía: ${selectedDate}\nHora: ${selectedTime}\n\nRecibirás un recordatorio por correo.`);
      setBookingModalVisible(false);
      setSelectedMentor(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert('Por favor selecciona un día y hora para tu sesión.');
    }
  };

  const getNextDays = () => {
    const days = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const dayName = dayNames[date.getDay()];
      const dayNumber = date.getDate();
      const month = monthNames[date.getMonth()];
      
      days.push({
        id: i,
        dayName,
        dayNumber,
        month,
        fullDate: `${dayName} ${dayNumber} ${month}`,
        dateObj: date
      });
    }
    return days;
  };

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
        <Pressable 
          style={[styles.bookButton, { backgroundColor: '#8A2BE2' }]}
          onPress={() => handleBookMentoring(mentor)}
        >
          <Text style={styles.bookButtonText}>Reservar Sesión</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderAchievement = (achievement) => (
    <Pressable 
      key={achievement.id} 
      style={[
        styles.achievementCard, 
        { 
          borderLeftColor: achievement.unlocked ? '#8A2BE2' : '#CCCCCC',
          borderLeftWidth: 4 
        }
      ]}
      onPress={() => handleAchievementPress(achievement)}
    >
      <View style={[
        styles.achievementIcon, 
        { backgroundColor: achievement.unlocked ? '#667eea20' : '#F3F4F6' }
      ]}>
        <Text style={[
          styles.achievementIconText, 
          { color: achievement.unlocked ? '#8A2BE2' : '#9CA3AF' }
        ]}>
          {achievement.icon}
        </Text>
      </View>
      
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        <Text style={styles.achievementDesc}>{achievement.description}</Text>
        
        {achievement.unlocked && (
          <View style={styles.completionBadge}>
            <Text style={styles.completionText}>✅ Completado</Text>
            <Text style={styles.completionDate}>{achievement.completionDate}</Text>
          </View>
        )}
        
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
          <Text style={styles.unlockedText}>🎓</Text>
        </View>
      )}
    </Pressable>
  );

  // Componente de Certificado Mejorado
  const CertificateModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={certificateModalVisible}
      onRequestClose={() => setCertificateModalVisible(false)}
    >
      <View style={styles.certificateModalContainer}>
        <View style={styles.certificateModalContent}>
          {selectedAchievement && (
            <>
              {/* Encabezado del Modal */}
              <View style={styles.certificateModalHeader}>
                <Text style={styles.certificateModalTitle}>🎓 Certificado de Logro</Text>
                <Pressable 
                  onPress={() => setCertificateModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>

              {/* Contenedor del Certificado con Marco */}
              <View style={styles.certificateFrame}>
                {/* Marco decorativo superior */}
                <View style={styles.certificateTopBorder}>
                  <Text style={styles.borderIcon}>✦</Text>
                  <Text style={styles.borderIcon}>✦</Text>
                  <Text style={styles.borderIcon}>✦</Text>
                </View>

                {/* Contenido principal del certificado */}
                <View style={styles.certificateContent}>
                  
                  {/* Encabezado del certificado */}
                  <View style={styles.certificateHeader}>
                    <Text style={styles.certificateAward}>Certificado de Excelencia</Text>
                    <Text style={styles.certificateOrganization}>CAPNSTEM Academy</Text>
                  </View>

                  {/* Sección de reconocimiento */}
                  <View style={styles.recognitionSection}>
                    <Text style={styles.certificatePresentedTo}>Se otorga a</Text>
                    <Text style={styles.certificateRecipient}>Estudiante Destacada</Text>
                    <View style={styles.divider} />
                    <Text style={styles.certificateFor}>por completar exitosamente</Text>
                    <Text style={styles.certificateCourseTitle}>{selectedAchievement.title}</Text>
                  </View>

                  {/* Detalles del curso */}
                  <View style={styles.courseDetailsGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Instructora</Text>
                      <Text style={styles.detailValue}>{selectedAchievement.instructor}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duración</Text>
                      <Text style={styles.detailValue}>{selectedAchievement.duration}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Completado</Text>
                      <Text style={styles.detailValue}>{selectedAchievement.completionDate}</Text>
                    </View>
                  </View>

                  {/* Habilidades desarrolladas */}
                  <View style={styles.skillsSection}>
                    <Text style={styles.skillsTitle}>Habilidades Desarrolladas</Text>
                    <View style={styles.skillsGrid}>
                      {selectedAchievement.skills.map((skill, index) => (
                        <View key={index} style={styles.skillBadge}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* ID del certificado y mensaje inspirador */}
                  <View style={styles.certificateFooter}>
                    <Text style={styles.certificateId}>ID: {selectedAchievement.certificateId}</Text>
                    <Text style={styles.inspirationalMessage}>
                      "Tu dedicación inspira a la próxima generación de mujeres en STEM"
                    </Text>
                  </View>
                </View>

                {/* Marco decorativo inferior */}
                <View style={styles.certificateBottomBorder}>
                  <Text style={styles.borderIcon}>✦</Text>
                  <Text style={styles.borderIcon}>✦</Text>
                  <Text style={styles.borderIcon}>✦</Text>
                </View>
              </View>

              {/* Botones de acción */}
              <View style={styles.certificateActions}>
                <Pressable 
                  style={styles.downloadButton}
                  onPress={handleDownloadCertificate}
                >
                  <Text style={styles.downloadButtonText}>📥 Descargar PDF</Text>
                </Pressable>
                
                <Pressable 
                  style={styles.shareButton}
                  onPress={handleShareCertificate}
                >
                  <Text style={styles.shareButtonText}>📤 Compartir Logro</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  // Componente de Modal de Reserva
  // Componente de Modal de Reserva - CORREGIDO
// Componente de Modal de Reserva - CORREGIDO CON SCROLL
const BookingModal = () => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={bookingModalVisible}
    onRequestClose={() => setBookingModalVisible(false)}
  >
    <View style={styles.bookingModalContainer}>
      <View style={styles.bookingModalContent}>
        {selectedMentor && (
          <>
            {/* Header del Modal - FIJO */}
            <View style={styles.bookingModalHeader}>
              <Text style={styles.bookingModalTitle}>Reservar Sesión</Text>
              <Pressable 
                onPress={() => setBookingModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            {/* CONTENIDO CON SCROLL */}
            <ScrollView 
              style={styles.bookingScrollContent}
              showsVerticalScrollIndicator={true}
            >
              {/* Información de la mentora */}
              <View style={styles.mentorBookingInfo}>
                <View style={[styles.mentorAvatar, { backgroundColor: '#667eea20' }]}>
                  <Text style={styles.avatarText}>{selectedMentor.avatar}</Text>
                </View>
                <View style={styles.mentorBookingDetails}>
                  <Text style={styles.mentorBookingName}>{selectedMentor.name}</Text>
                  <Text style={styles.mentorBookingRole}>{selectedMentor.role}</Text>
                  <Text style={styles.mentorBookingCompany}>{selectedMentor.company}</Text>
                </View>
              </View>

              {/* Selección de Fecha */}
              <View style={styles.bookingSection}>
                <Text style={styles.bookingSectionTitle}>Selecciona un día</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.datesContainer}
                  contentContainerStyle={styles.datesContentContainer}
                >
                  {getNextDays().map((day) => {
                    const isAvailable = selectedMentor.availability.includes(day.dayName);
                    const isSelected = selectedDate === day.fullDate;
                    
                    return (
                      <Pressable
                        key={day.id}
                        style={[
                          styles.dateCard,
                          !isAvailable && styles.dateCardDisabled,
                          isSelected && styles.dateCardSelected
                        ]}
                        onPress={() => {
                          if (isAvailable) {
                            setSelectedDate(day.fullDate);
                            setSelectedTime(null);
                          }
                        }}
                        disabled={!isAvailable}
                      >
                        <Text style={[
                          styles.dateDayName,
                          !isAvailable && styles.dateTextDisabled,
                          isSelected && styles.dateTextSelected
                        ]}>
                          {day.dayName}
                        </Text>
                        <Text style={[
                          styles.dateNumber,
                          !isAvailable && styles.dateTextDisabled,
                          isSelected && styles.dateTextSelected
                        ]}>
                          {day.dayNumber}
                        </Text>
                        <Text style={[
                          styles.dateMonth,
                          !isAvailable && styles.dateTextDisabled,
                          isSelected && styles.dateTextSelected
                        ]}>
                          {day.month}
                        </Text>
                        {!isAvailable && (
                          <Text style={styles.unavailableText}>No disponible</Text>
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Selección de Hora */}
              {selectedDate && (
                <View style={styles.bookingSection}>
                  <Text style={styles.bookingSectionTitle}>Selecciona una hora</Text>
                  <View style={styles.timesContainer}>
                    {selectedMentor.availableSlots[selectedDate.split(' ')[0]]?.map((time, index) => (
                      <Pressable
                        key={index}
                        style={[
                          styles.timeSlot,
                          selectedTime === time && styles.timeSlotSelected
                        ]}
                        onPress={() => setSelectedTime(time)}
                      >
                        <Text style={[
                          styles.timeSlotText,
                          selectedTime === time && styles.timeSlotTextSelected
                        ]}>
                          {time}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              {/* Resumen de la reserva - SIEMPRE VISIBLE */}
              <View style={styles.bookingSummary}>
                <Text style={styles.bookingSummaryTitle}>
                  {selectedDate && selectedTime ? 'Resumen de tu reserva:' : 'Completa tu reserva'}
                </Text>
                {selectedDate && selectedTime ? (
                  <>
                    <Text style={styles.bookingSummaryText}>
                      📅 {selectedDate} a las {selectedTime}
                    </Text>
                    <Text style={styles.bookingSummaryText}>
                      ⏰ Duración: 45 minutos
                    </Text>
                    <Text style={styles.bookingSummaryText}>
                      💰 Sesión gratuita
                    </Text>
                  </>
                ) : (
                  <Text style={styles.bookingSummaryText}>
                    {selectedDate 
                      ? 'Por favor selecciona una hora disponible' 
                      : 'Por favor selecciona un día y hora disponible'
                    }
                  </Text>
                )}
              </View>
            </ScrollView>

            {/* Botones de acción - FIJO EN LA PARTE INFERIOR */}
            <View style={styles.bookingActions}>
              <Pressable 
                style={styles.cancelButton}
                onPress={() => setBookingModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              
              <Pressable 
                style={[
                  styles.confirmButton,
                  (!selectedDate || !selectedTime) && styles.confirmButtonDisabled
                ]}
                onPress={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime}
              >
                <Text style={styles.confirmButtonText}>
                  {selectedDate && selectedTime ? 'Confirmar Reserva' : 'Selecciona día y hora'}
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  </Modal>
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
                Celebra tus progresos en STEM - Toca un logro para ver tu certificado
              </Text>
            </View>
            
            <View style={styles.achievementStats}>
              <View style={[styles.statCard, { backgroundColor: '#667eea20' }]}>
                <Text style={[styles.statNumber, { color: '#667eea' }]}>
                  {achievements.filter(a => a.unlocked).length}
                </Text>
                <Text style={styles.statDescription}>Certificados</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#764ba220' }]}>
                <Text style={[styles.statNumber, { color: '#764ba2' }]}>
                  {achievements.reduce((sum, a) => sum + a.progress, 0)}
                </Text>
                <Text style={styles.statDescription}>Logros</Text>
              </View>
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

      {/* Modal del Certificado Mejorado */}
      <CertificateModal />

      {/* Modal de Reserva de Mentorías */}
      <BookingModal />
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
  // Estilos para logros y certificados
  achievementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
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
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  completionText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginRight: 10,
  },
  completionDate: {
    fontSize: 12,
    color: '#7F8C8D',
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

  // Estilos para el Modal del Certificado - POSICIÓN CORREGIDA
  certificateModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  certificateModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  certificateModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#8A2BE2',
  },
  certificateModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Marco del certificado
  certificateFrame: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    margin: 15,
    borderRadius: 15,
    backgroundColor: '#FAF5FF',
    overflow: 'hidden',
  },
  certificateTopBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  certificateBottomBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  borderIcon: {
    fontSize: 16,
    color: '#8A2BE2',
    opacity: 0.6,
  },

  // Contenido del certificado
  certificateContent: {
    padding: 25,
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#8A2BE2',
    borderBottomStyle: 'dashed',
  },
  certificateAward: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    textAlign: 'center',
    marginBottom: 5,
  },
  certificateOrganization: {
    fontSize: 16,
    color: '#7C3AED',
    textAlign: 'center',
    fontWeight: '600',
  },

  // Sección de reconocimiento
  recognitionSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  certificatePresentedTo: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  certificateRecipient: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  certificateFor: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  certificateCourseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2BE2',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Detalles del curso en grid
  courseDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Habilidades
  skillsSection: {
    marginBottom: 20,
  },
  skillsTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  skillText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Footer del certificado
  certificateFooter: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  certificateId: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  inspirationalMessage: {
    fontSize: 12,
    color: '#7C3AED',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 16,
  },

  // Botones de acción
  certificateActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8A2BE2',
  },
  shareButtonText: {
    color: '#8A2BE2',
    fontSize: 14,
    fontWeight: '600',
  },

  // ========== NUEVOS ESTILOS PARA RESERVAS DE MENTORÍAS ==========
  // ========== ESTILOS ACTUALIZADOS PARA RESERVAS DE MENTORÍAS ==========
  
bookingModalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
bookingModalContent: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  width: '100%',
  maxWidth: 400,
  maxHeight: '85%', // Aumentado ligeramente
  overflow: 'hidden',
},
bookingModalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#8A2BE2',
},
bookingModalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
},

// Información de la mentora en el modal
mentorBookingInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},
mentorBookingDetails: {
  flex: 1,
  marginLeft: 12,
},
mentorBookingName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#2C3E50',
  marginBottom: 2,
},
mentorBookingRole: {
  fontSize: 14,
  color: '#667eea',
  fontWeight: '600',
  marginBottom: 2,
},
mentorBookingCompany: {
  fontSize: 12,
  color: '#7F8C8D',
},

// Secciones de booking
bookingSection: {
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},
bookingSectionTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#2C3E50',
  marginBottom: 15,
},

// Selector de fechas - ACTUALIZADO
datesContainer: {
  marginHorizontal: -5,
},
datesContentContainer: {
  paddingHorizontal: 5,
},
dateCard: {
  alignItems: 'center',
  padding: 15,
  marginHorizontal: 5,
  borderRadius: 12,
  backgroundColor: '#F8F9FA',
  minWidth: 70,
  borderWidth: 2,
  borderColor: 'transparent',
},
dateCardSelected: {
  backgroundColor: '#8A2BE2',
  borderColor: '#8A2BE2',
},
dateCardDisabled: {
  backgroundColor: '#F3F4F6',
  opacity: 0.5,
},
dateDayName: {
  fontSize: 12,
  fontWeight: '600',
  color: '#6B7280',
  marginBottom: 4,
},
dateNumber: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#2C3E50',
  marginBottom: 2,
},
dateMonth: {
  fontSize: 11,
  color: '#6B7280',
  fontWeight: '500',
},
dateTextSelected: {
  color: '#FFFFFF',
},
dateTextDisabled: {
  color: '#9CA3AF',
},
unavailableText: {
  fontSize: 8,
  color: '#EF4444',
  marginTop: 4,
  fontWeight: '600',
},

// Selector de horas
timesContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
},
timeSlot: {
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: '#F8F9FA',
  borderWidth: 2,
  borderColor: 'transparent',
  minWidth: 80,
  alignItems: 'center',
},
timeSlotSelected: {
  backgroundColor: '#8A2BE2',
  borderColor: '#8A2BE2',
},
timeSlotText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#2C3E50',
},
timeSlotTextSelected: {
  color: '#FFFFFF',
},

// Resumen de la reserva - ACTUALIZADO (SIEMPRE VISIBLE)
bookingSummary: {
  padding: 20,
  backgroundColor: '#F0F7FF',
  margin: 20,
  borderRadius: 12,
  borderLeftWidth: 4,
  borderLeftColor: '#8A2BE2',
  minHeight: 100, // Para mantener espacio consistente
  justifyContent: 'center',
},
bookingSummaryTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#2C3E50',
  marginBottom: 8,
},
bookingSummaryText: {
  fontSize: 13,
  color: '#4B5563',
  marginBottom: 4,
},

// Botones de acción
bookingActions: {
  flexDirection: 'row',
  padding: 20,
  gap: 12,
  backgroundColor: '#F8F9FA',
  borderTopWidth: 1,
  borderTopColor: '#E5E7EB',
},
cancelButton: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#D1D5DB',
},
cancelButtonText: {
  color: '#6B7280',
  fontSize: 14,
  fontWeight: '600',
},
confirmButton: {
  flex: 2,
  backgroundColor: '#8A2BE2',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
confirmButtonDisabled: {
  backgroundColor: '#9CA3AF',
  opacity: 0.6,
},
confirmButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 'bold',
},
});