import {createStackNavigator} from '@react-navigation/stack';
import {
  CREATE_QUIZ_SCREEN,
  LANDING_SCREEN,
  QUIZ_SCREEN,
  RESULT_SCREEN,
} from '../constants/navigation';
import LandingScreen from '../screens/Quiz/Landing';
import QuizScreen from '../screens/Quiz/Quiz';
import ResultScreen from '../screens/Quiz/Result';
import CreateQuizScreen from '../screens/Quiz/CreateQuizScreen';

const Stack = createStackNavigator();
const screenOptions = {
  headerMode: 'none',
};

const AppNavigator = () => (
  // <LandingScreen />
  <Stack.Navigator
    initialRouteName={LANDING_SCREEN}
    screenOptions={screenOptions}>
    <Stack.Screen name={LANDING_SCREEN} component={LandingScreen} />
    <Stack.Screen name={QUIZ_SCREEN} component={QuizScreen} />
    <Stack.Screen name={CREATE_QUIZ_SCREEN} component={CreateQuizScreen} />
    <Stack.Screen name={RESULT_SCREEN} component={ResultScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
