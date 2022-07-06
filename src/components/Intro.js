import React from 'react';
import {View, Text} from 'react-native';
import Button from '../tools/Button';

const Intro = ({navigation}) => {
  return (
    <View>
      <Text>Esta es la mejor app para revisar tus monedas</Text>
      <Button
        text="Ver monedas"
        onPress={() => navigation.navigate('ListCoins')}
      />
    </View>
  );
};

export default Intro;
