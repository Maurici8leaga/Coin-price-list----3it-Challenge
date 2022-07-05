import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './src/components/Intro';
import ListCoins from './src/components/ListCoins';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Intro} />
        <Stack.Screen name="listCoins" component={ListCoins} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
