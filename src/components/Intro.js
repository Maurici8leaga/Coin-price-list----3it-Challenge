import React from 'react';
import {Text, Stack} from '@react-native-material/core';
import {Button} from '@react-native-material/core';

const Intro = ({navigation}) => {
  return (
    <Stack m={20} mt={250} spacing={20} center={true}>
      <Text variant="h6">Bienvenido a MauriCoins</Text>
      <Button
        title="Muestrame"
        onPress={() => navigation.navigate('ListCoins')}
      />
    </Stack>
  );
};

export default Intro;
