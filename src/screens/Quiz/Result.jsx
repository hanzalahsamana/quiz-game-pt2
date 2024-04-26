import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {LANDING_SCREEN, QUIZ_SCREEN} from '../../constants/navigation';

// Import your images
import congratsImage from '../../assets/images/congrats-image.png';
import greatImage from '../../assets/images/great-image.png';
import workImage from '../../assets/images/work-image.png';

const ResultScreen = ({route, navigation}) => {
  const {score, totalQuestions} = route.params;
  const percentage = (score / totalQuestions) * 100;

  let message, imageSource;

  if (percentage >= 70) {
    message = 'Congratulations!';
    imageSource = congratsImage;
  } else if (percentage >= 50) {
    message = 'You did great!';
    imageSource = greatImage;
  } else {
    message = 'You need to work on your skills.';
    imageSource = workImage;
  }

  const handleReplayQuiz = () => {
    navigation.navigate(QUIZ_SCREEN);
  };

  const handleGoToHome = () => {
    navigation.navigate(LANDING_SCREEN); // Navigate to the Home screen
  };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={styles.resultText}>
        Your score: {score}/{totalQuestions}
      </Text>
      <Text style={styles.resultText}>
        Percentage: {percentage.toFixed(2)}%
      </Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReplayQuiz}>
          <Text style={styles.buttonText}>Replay Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoToHome}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: SIZES.base,
    width: SIZES.width,
    minHeight: SIZES.height,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: SIZES.base * 2,
  },
  resultText: {
    fontSize: SIZES.base * 1.8,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.base * 2,
  },
  message: {
    fontSize: SIZES.base * 1.5,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.base * 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.base,
    marginHorizontal: SIZES.base,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.base * 1.4,
  },
});

export default ResultScreen;
