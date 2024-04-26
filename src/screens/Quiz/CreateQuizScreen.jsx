import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Touchable,
} from 'react-native';

const CreateQuizScreen = ({navigation}) => {
  // State to hold quiz data
  const [quizzes, setQuizzes] = useState([]);
  // State to hold new quiz data
  const [newQuiz, setNewQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
  });

  // Function to fetch quizzes from localStorage
  const fetchQuizzes = () => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    }
  };

  // Function to handle input change in new quiz
  const handleInputChange = (index, value) => {
    const updatedOptions = [...newQuiz.options];
    updatedOptions[index] = value;
    setNewQuiz({...newQuiz, options: updatedOptions});
  };

  // Function to handle adding new quiz
  const handleAddQuiz = () => {
    const updatedQuizzes = [...quizzes, {...newQuiz}];
    setQuizzes(updatedQuizzes);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    // Reset newQuiz state after adding
    setNewQuiz({question: '', options: ['', '', '', ''], correctOption: ''});
  };

  // Fetch quizzes from localStorage on component mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Quiz</Text>
      {/* Table */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>#</Text>
            <Text style={styles.tableHeaderText}>Question</Text>
            <Text style={styles.tableHeaderText}>Options</Text>
            <Text style={styles.tableHeaderText}>Action</Text>
          </View>
          {quizzes.map((quiz, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableData}>{index + 1}</Text>
              <Text style={styles.tableData}>{quiz.question}</Text>
              <Text style={styles.tableData}>{quiz.options.join(', ')}</Text>
              <View style={styles.tableActions}>
                <Button title="Edit" onPress={() => console.log('Edit')} />
                <Button title="Delete" onPress={() => console.log('Delete')} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Add New Quiz */}
      <View style={styles.newQuizContainer}>
        <Text style={styles.label}>Question:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter question"
          value={newQuiz.question}
          onChangeText={text => setNewQuiz({...newQuiz, question: text})}
        />
        <Text style={styles.label}>Options:</Text>
        {newQuiz.options.map((option, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Option ${index + 1}`}
            value={option}
            onChangeText={text => handleInputChange(index, text)}
          />
        ))}
        <Button title="Add Quiz" onPress={handleAddQuiz} />
      </View>
      {/* Back Button */}
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableContainer: {
    maxHeight: 200,
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
  tableData: {
    flex: 1,
    padding: 10,
  },
  tableActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 10,
  },
  newQuizContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CreateQuizScreen;
