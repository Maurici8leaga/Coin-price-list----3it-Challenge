import {Text, Stack} from '@react-native-material/core';
import React from 'react';

const ButtonInfoCoin = ({navigation, coinData}) => {
  const buttonCoinDetail = () => {
    let key = coinData.codigo;

    navigation.navigate('CoinDetails', {idCoin: key});
    // el 2da parametro objeto, es la forma que podemos enviar alguna informacion al otro component en este caso
    // CoinDetails es el que va a recibir este nuevo objeto
  };

  return (
    <Stack>
      <Text variant="h6" onPress={() => buttonCoinDetail()}>
        ℹ
      </Text>
    </Stack>
  );
};

export default ButtonInfoCoin;
