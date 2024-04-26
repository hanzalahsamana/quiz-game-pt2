import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {CREATE_QUIZ_SCREEN, QUIZ_SCREEN} from '../../constants/navigation';

const LandingScreen = () => {
  const navigation = useNavigation();

  const handleStartQuiz = () => {
    navigation.navigate(QUIZ_SCREEN);
  };

  const handleCreateQuiz = () => {
    // Navigate to Create Quiz screen
    navigation.navigate(CREATE_QUIZ_SCREEN);
  };

  const handlePlayQuiz = () => {
    // Navigate to Play Quiz screen
    navigation.navigate(QUIZ_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Welcome to Quizify</Text>
        <Text style={styles.subheading}>Dive into the World of Quizzes</Text>
      </View>
      <Image
        source={require('./../../assets/images/quiz-image.png')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Welcome to Quizify, your ultimate destination for challenging quizzes on
        various topics. Test your knowledge and learn new facts every day!
      </Text>
      {/* <TouchableOpacity style={styles.button} onPress={handleCreateQuiz}>
        <Text style={styles.buttonText}>Create Quiz</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.startButton} onPress={handlePlayQuiz}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2024 Quizify. All Rights Reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base * 3,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.base * 1,
  },
  heading: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subheading: {
    fontSize: SIZES.h3,
    color: COLORS.secondary,
    marginTop: SIZES.base,
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    resizeMode: 'contain',
    marginBottom: SIZES.base * 1,
  },
  description: {
    fontSize: SIZES.body3,
    marginBottom: SIZES.base * 1,
    textAlign: 'center',
    paddingHorizontal: SIZES.base * 2,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 3,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 1,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 3,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: SIZES.base,
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
});

export default LandingScreen;
