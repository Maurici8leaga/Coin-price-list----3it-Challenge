import React from 'react';
import {ListItem} from '@react-native-material/core';
import moment from 'moment';

const CoinPriceByYear = ({coinData}) => {
  const dateFormated = moment(coinData.fecha).format('YYYY-MM-DD');

  return (
    <>
      <ListItem title={dateFormated} meta={'$' + coinData.valor} />
    </>
  );
};

export default CoinPriceByYear;
