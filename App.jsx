// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/navigators/AppNavigator';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
     <AppNavigator />
    </NavigationContainer>
  );
}

export default App;