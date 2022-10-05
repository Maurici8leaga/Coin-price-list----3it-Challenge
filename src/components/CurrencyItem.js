import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CoinPriceByYear from './CoinPriceByYear';
import {AppBar} from '@react-native-material/core';

const CurrencyItem = ({route}) => {
  // se coloca "route" para acceder a los props que esta recibiendo este component desde su parent component

  const [infoCoins, setInfoCoins] = useState([]);

  const {idCoin} = route.params;
  // con "route.params" podemos acceder al objeto con la  data que nos esta mandando desde el otro component

  const loadData = async () => {
    // request to API
    const res = await fetch(`https://mindicador.cl/api/${idCoin}`);
    const data = await res.json();
    // act el state
    setInfoCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    // ACLARAR AQUI SOLO VAN LA INFO QUE VA IR DENTRO DEL FLATLIST
    return <CoinPriceByYear coinData={item} />;
  };

  return (
    <View>
      <AppBar title={infoCoins.nombre} centerTitle={true} />
      <FlatList data={infoCoins.serie} renderItem={renderItem} />
      {/* // atraves de "coinData" solo se manda los valores del precio y fechas */}
    </View>
  );
};

export default CurrencyItem;
