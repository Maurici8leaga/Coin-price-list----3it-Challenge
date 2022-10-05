import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = props => {
  // este es un component reciclable

  const {onPress, text} = props;
  // usamos este props, para pasarle la funcion de que haga cuando lo presionen
  // y text es el contenido que llevara este button

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
