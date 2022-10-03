import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {AppBar} from '@react-native-material/core';
import {Divider} from '@react-native-material/core';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
} from 'victory-native';
import moment from 'moment';

const {width, height} = Dimensions.get('screen');

const CoinDetails = ({route}) => {
  // se coloca "route" para acceder a los props que esta recibiendo este component desde su parent component

  const [dataCoin, setDataCoin] = useState([]);

  const [actualPrice, setActualPrice] = useState([]);

  const [last10Price, setLast10Price] = useState([]);

  const {idCoin} = route.params;
  // con "route.params" podemos acceder al objeto con la  data que nos esta mandando desde el otro component

  const loadData = async () => {
    // request to API
    const res = await fetch(`https://mindicador.cl/api/${idCoin}`);
    const data = await res.json();
    // act the state of the coin
    setDataCoin(data);

    // making a new array for only the last 10  dates and  prices
    const arrayPriceAndDates = data.serie.slice(0, 10).map(e => {
      // con slice escogemos solos los ultimos 10
      const dateFormated = {
        // de esta forma formateamos todas las fechas al formato que queremos
        fecha: moment(e.fecha).format('YYYY-MM-DD'),
        valor: e.valor,
      };

      return dateFormated;
    });

    // act the state for the last 10 dates and prices
    setLast10Price(arrayPriceAndDates);

    // get the last price and date
    const lastItem = arrayPriceAndDates[0] ? arrayPriceAndDates[0] : {valor: 0};
    const lastPrice = lastItem.valor;
    const lastDate = lastItem.fecha;
    // act the state for the last date and price
    setActualPrice({precio: lastPrice, fecha: lastDate});
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartHeight = Dimensions.get('window').height * 0.3;
  const chartWidth = Dimensions.get('window').width;

  console.log(last10Price, '<- last10Price');

  return !actualPrice && !dataCoin ? (
    <Text>Loading...</Text>
  ) : (
    <View>
      <AppBar title={dataCoin.nombre} centerTitle={true} />

      <View style={styles.container}>
        <Text variant="h3" style={styles.bigPrice}>
          ${actualPrice.precio}
        </Text>

        <Text>Nombre: {dataCoin.nombre}</Text>
        <Divider
          style={{marginTop: 6}}
          leadingInset={32}
          trailingInset={32}
          color="green"
        />
        <Text>Fecha: {actualPrice.fecha}</Text>
        <Divider
          style={{marginTop: 6}}
          leadingInset={32}
          trailingInset={32}
          color="green"
        />

        <Text>Unidad de medida: {dataCoin.unidad_medida}</Text>
        <Divider
          style={{marginTop: 6}}
          leadingInset={32}
          trailingInset={32}
          color="green"
        />

        <VictoryChart
          height={chartHeight}
          width={chartWidth}
          style={{background: {fill: '#008ae6'}}}>
          <VictoryLine
            animate
            data={last10Price}
            x="fecha"
            y="valor"
            width={width}
            height={height}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigPrice: {
    color: 'green',
  },
});

export default CoinDetails;
