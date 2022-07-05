import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = props => {

    const { onPress, text } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Text>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
