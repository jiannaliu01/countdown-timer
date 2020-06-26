import React, { useEffect, useState, useCallback } from "react";
import { View } from 'react-native';
import NumberCard from "./number-card";

import PropTypes from 'prop-types';
import style from '../../style';

export default function FlipNumber({
  textColor, flipColor, flipColorGrad, number, unit, size, perspective, numberWrapperStyle, cardStyle, flipCardStyle, numberStyle,
}) {
    var previousNumber = number - 1;
    console.log(previousNumber, number, "HEY NUMBER")
    if (unit != 'hours') {
        previousNumber = previousNumber === -1 ? 59 : previousNumber;
    }
    else {
        previousNumber = previousNumber === -1 ? 23 : previousNumber;
    }
    number = number < 10 ? `0${number}` : number;
    previousNumber = previousNumber < 10 ? `0${previousNumber}` : previousNumber;

    const numberSplit = number.toString().split('');
    const previousNumberSplit = previousNumber.toString().split('');
    return(
    <View style={[style.wrapper]}>
      <NumberCard
        flipColor = {flipColor}
        flipColorGrad = {flipColorGrad}
        textColor = {textColor}
        number={numberSplit[0]}
        previousNumber={previousNumberSplit[0]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
      <NumberCard
        flipColor = {flipColor}
        flipColorGrad = {flipColorGrad}
        textColor = {textColor}
        number={numberSplit[1]}
        previousNumber={previousNumberSplit[1]}
        size={size}
        perspective={perspective}
        numberWrapperStyle={numberWrapperStyle}
        cardStyle={cardStyle}
        flipCardStyle={flipCardStyle}
        numberStyle={numberStyle}
      />
    </View>
    );
};

FlipNumber.defaultProps = {
    unit: 'seconds',
  };
  
FlipNumber.propTypes = {
number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]).isRequired,
unit: PropTypes.oneOf(['days', 'hours', 'minutes', 'seconds']),
size: PropTypes.number,
perspective: PropTypes.number,
numberWrapperStyle: PropTypes.object,
cardStyle: PropTypes.object,
flipCardStyle: PropTypes.object,
numberStyle: PropTypes.object,
};
  