import React from 'react';
import { Text, View, Animated } from 'react-native';

import style from '../../style';
import PropTypes from 'prop-types';

export default function Card({
  flipColor, flipColorGrad, textColor, type, size, number, cardStyle, numberStyle,
}) {
  return ( 
    <View style={[style.card, type === 'upper' ? { backgroundColor: [flipColor, flipColorGrad], borderBottomWidth: 0.5 } : { backgroundColor: flipColor, borderTopWidth: 0.5 }, cardStyle]}>
      <Text style={[style.number, {
        color: textColor,
        transform: [type === 'upper' ? { translateY: size * 0.3 } : { translateY: -size * 0.3 }],
        fontSize: size / 1.5,
        lineHeight: size / 1.5,
      }, numberStyle]}
      >
        {number}
      </Text>
    </View>
  );
}

Card.defaultProps = {
    cardStyle: {},
    numberStyle: {},
  };
  
  Card.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    cardStyle: PropTypes.object,
    numberStyle: PropTypes.object,
  };
  