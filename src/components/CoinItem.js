import {View, Text} from 'react-native';
import React from 'react';

const CoinItem = ({moneda}) => {
  return (
    <View>
      <Text>{moneda.nombre}</Text>
    </View>
  );
};

export default CoinItem;
