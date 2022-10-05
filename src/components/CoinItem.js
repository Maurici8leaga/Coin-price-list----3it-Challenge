import React from 'react';
import {ListItem} from '@react-native-material/core';
import {Stack} from 'react-native-flex-layout';
import ButtonInfoCoin from '../tools/ButtonInfoCoin';

const CoinItem = ({coinData, navigation}) => {
  const {nombre, unidad_medida} = coinData;

  const buttonCoinInfo = () => {
    let key = coinData.codigo;

    navigation.navigate('CurrencyItem', {idCoin: key});
    // el 2da parametro objeto, es la forma que podemos enviar alguna informacion al otro component en este caso
    // CurrencyItem es el que va a recibir este nuevo objeto
  };

  return (
    <Stack>
      <ListItem
        title={nombre}
        secondaryText={unidad_medida}
        onPress={() => buttonCoinInfo()}
        trailing={() => (
          <ButtonInfoCoin navigation={navigation} coinData={coinData} />
        )}
      />
    </Stack>
  );
};

export default CoinItem;
