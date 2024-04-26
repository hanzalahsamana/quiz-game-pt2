import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { allQuestions } from '../../constants/QuizData';
import { COLORS, SIZES } from '../../constants/theme';
import { RESULT_SCREEN } from '../../constants/navigation';

const QuizScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setTimer(10);
    if (isFocused) {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setScore(0);
      setShowResult(false);
      startTimer();
    }
  }, [isFocused]);

  useEffect(() => {
    if (timer === 0) {
      handleTimeUp();
    }
  }, [timer]);

  const startTimer = () => {
    clearInterval(intervalId); // Clear previous interval
    const id = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    setIntervalId(id); // Store the new interval ID
  };

  const handleTimeUp = () => {
    setTimer(10);
    validateAnswer(null); // Automatically validate with null option when time is up
  };

  const validateAnswer = option => {
    if (option === allQuestions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setShowResult(true);
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < allQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimer(10); // Reset timer for the next question
      startTimer(); // Start timer again
    } else {
      const percentage = (score / allQuestions.length) * 100;
      navigation.navigate(RESULT_SCREEN, {
        score,
        totalQuestions: allQuestions.length,
        percentage,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      <Text style={styles.heading}>Quiz Competition</Text>
      {currentQuestionIndex === 0 && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {allQuestions[currentQuestionIndex].question}
        </Text>
      </View>
      {allQuestions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && {
              backgroundColor:
                option === allQuestions[currentQuestionIndex].correctOption
                  ? 'lightgreen'
                  : 'pink',
              borderColor:
                option === allQuestions[currentQuestionIndex].correctOption
                  ? 'green'
                  : 'red',
              borderWidth: 1,
            },
            selectedOption === option && {
              color: 'white',
            },
            selectedOption !== null &&
              selectedOption !== option && {opacity: 0.5},
          ]}
          onPress={() => validateAnswer(option)}
          disabled={selectedOption !== null}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      {selectedOption !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {selectedOption === allQuestions[currentQuestionIndex].correctOption
              ? 'Correct!'
              : 'Incorrect!'}
          </Text>
        </View>
      )}
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
  heading: {
    fontSize: SIZES.base * 2.4,
    fontWeight: 'bold',
    marginBottom: SIZES.base * 2,
    color: COLORS.white,
  },
  backButton: {
    position: 'absolute',
    top: SIZES.base * 2,
    left: SIZES.base * 2,
  },
  backButtonText: {
    fontSize: SIZES.base * 1.4,
    color: COLORS.white,
  },
  questionContainer: {
    marginBottom: SIZES.base * 2,
  },
  questionText: {
    fontSize: SIZES.base * 1.8,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    marginBottom: SIZES.base,
    borderRadius: SIZES.base,
    minWidth: '80%',
  },
  optionText: {
    fontSize: SIZES.base * 1.4,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.base,
    marginTop: SIZES.base * 2,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.base * 1.4,
  },
  resultContainer: {
    marginTop: SIZES.base * 2,
  },
  resultText: {
    fontSize: SIZES.base * 1.8,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  timerContainer: {
    position: 'absolute',
    top: SIZES.base * 2,
    right: SIZES.base * 2,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.base * 2,
  },
  timerText: {
    color: COLORS.white,
    fontSize: SIZES.base * 1.4,
  },
});

export default QuizScreen;
