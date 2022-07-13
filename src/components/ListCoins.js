import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import CoinItem from './CoinItem';

const ListCoins = ({navigation}) => {
  const [coins, setCoins] = useState([]);

  const loadData = async () => {
    // request to API
    const res = await fetch('https://mindicador.cl/api');

    const data = await res.json();
    // hacemos lo siguiente ya que necesitamos converitr "data" en un array y ademas solo pasar los que sean object y tengan propiedad "codigo"
    const dataArray = Object.values(data).filter(
      i => typeof i === 'object' && i.hasOwnProperty('codigo'),
    );
    // act el state
    setCoins(dataArray);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    // este prop debe llamarse "item" por defecto, porque si no da error
    return <CoinItem coinData={item} navigation={navigation} />;
    // hay que pasar navigation como prop para que se pueda navegar a otro component en el siguiente component
  };

  return (
    <View>
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={item => item.codigo}
      />
    </View>
  );
};

export default ListCoins;
