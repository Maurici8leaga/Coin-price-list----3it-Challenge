import React from 'react';
import {View, Text} from 'react-native';
import Button from '../tools/Button';

const Intro = ({navigation}) => {
  return (
    <View>
      <Text>Lo que sea que vaya aqui</Text>
      <Button
        text="Ver monedas"
        onPress={() => navigation.navigate('listCoins')}
      />
    </View>
  );
};

export default Intro;
