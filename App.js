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
        <Stack.Screen name="Home" component={Intro} />
        <Stack.Screen name="ListCoins" component={ListCoins} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
