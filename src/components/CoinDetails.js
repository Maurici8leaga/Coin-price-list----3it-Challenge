import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {AppBar} from '@react-native-material/core';
import {Divider} from '@react-native-material/core';
import {
  VictoryChart,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';
import moment from 'moment';

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

    // making a new array for only the last 10  dates and  prices & sorting the dates in chronological order
    const sortArrayPriceAndDates = data.serie
      .slice(0, 10)
      // con slice escogemos solos los ultimos 10 fechas
      .map(obj => {
        // aca debemos cambiar el formato de las fechas a formato Epoch para luego poder ordenar las fechas
        // gracias a "getTime" es una funcion de javascript que puede devuelve la fecha segun el formato Epoch
        return {...obj, fecha: new Date(obj.fecha).getTime(), valor: obj.valor};
      })
      .sort((objA, objB) => objA.fecha - objB.fecha)
      // de esta forma ordenamos las fechas de forma cronologica
      .map(d => {
        // por ultimo necesitamos volver a cambiar el formato de las fechas a formato ISO para poder
        // mandarlas a la grafica, con "toISOString" esto es posible
        return {...d, fecha: new Date(d.fecha).toISOString(), valor: d.valor};
      });

    // changing the format dates
    const arrayPriceAndDates = sortArrayPriceAndDates.map(e => {
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

  const chartHeight = Dimensions.get('window').height * 0.5;
  const chartWidth = Dimensions.get('window').width;

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
          domainPadding={{x: 12}}
          // domainPadding es un prop que especifica un numero de pixeles de separacion en el axis, ya sea x o y
          style={{background: {fill: '#008ae6'}}}
          // se usa el prop "fill" para colocar el color
          height={chartHeight}
          width={chartWidth}>
          <VictoryLine
            data={last10Price}
            x="fecha"
            y="valor"
            style={{
              data: {opacity: 0.8, stroke: '#FFFF00'},
              // stroke es la linea de la grafica
              labels: {fontSize: 11, fill: () => '#000000'},
            }}
            labels={({datum}) => `${datum.valor}`}
            // para colocar label en la grafica se usa "datum" ya que es el prop designado por Victory
            labelComponent={
              <VictoryLabel
                angle={90}
                // usamos "angle" para colocar la inclinacion de las fechas en este caso y hacerlas vertical
                textAnchor="start"
                // "textAnchor" dependiendo de la especificacion el va a colocar los label por encima de los puntos de la grafica o por debajo de ellos
                verticalAnchor="start"
                // "verticalAnchor" sucede lo mismo que textAnchor solo que en vertical
              />
            }
          />
          <VictoryAxis
            style={{
              tickLabels: {angle: 90, padding: 25, fontSize: 11},
              // en "tickLabels" podemos indicar el style que queremos que lleve la data en el axis
            }}
          />
          <VictoryAxis
            dependentAxis
            // el prop "dependentAxis" es para especificar que el axis va a ser el Y de la grafica
            style={{
              tickLabels: {fontSize: 11},
            }}
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
