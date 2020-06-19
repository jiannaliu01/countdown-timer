import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import style from '../../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

const width = 1000;

export default function NumberCard({
    size, number, previousNumber, perspective, cardStyle, numberStyle, flipCardStyle
}) {
    const rotateFront = useRef(new Animated.Value(0)).current;
    const rotateBack = useRef(new Animated.Value(-180)).current;
    const [frontRef, setFrontRef] = useState(null);
    const [backRef, setBackRef] = useState(null);

    //const width = Dimensions.get('window');

    useEffect(() => {
        animateTick();
        rotateFront.addListener(({ value }) => {
            transformRef(frontRef, value, size*0.3)
        })
        rotateBack.addListener(({value}) => {
            transformRef(backRef, value, -size*0.3)
        })  
    }, []);

    useEffect(() => {
        animateTick();
    }, [previousNumber]);

    const transformRef = (ref, deg, y) => {
        const matrix = TransformUtil.createIdentityMatrix();
        TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
        TransformUtil.perspectiveMatrix(matrix, perspective);
        TransformUtil.rotateXMatrix(matrix, deg);
        TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
        if (ref) {
          ref.setNativeProps({ style: { transform: [{ matrix }] } });
        }
      }

    const animateTick = () => {
        rotateFront.setValue(0);
        rotateBack.setValue(-180);
        Animated.parallel([
          Animated.timing(rotateFront, {
            toValue: 180,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(rotateBack, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }
    return (
        <View style={[style.numberWrapper,
            { width: size * 0.8, height: size * 1.2, borderRadius: size / 10 },
            ]}
          >
            <Card
              type="upper"
              size={size}
              number={previousNumber}
              cardStyle={cardStyle}
              numberStyle={numberStyle}
            />
            <Card
              type="lower"
              size={size}
              number={number}
              cardStyle={cardStyle}
              numberStyle={numberStyle}
            />
            <FlipCard
              setRef={setFrontRef}
              type="front"
              size={size}
              number={number}
              flipCardStyle={flipCardStyle}
              numberStyle={numberStyle}
            />
            <FlipCard
              setRef={setBackRef}
              type="back"
              size={size}
              number={previousNumber}
              flipCardStyle={flipCardStyle}
              numberStyle={numberStyle}
            />
          </View>
    );
}

NumberCard.defaultProps = {
    size: width / 6,
    perspective: 250,
  };
  
NumberCard.propTypes = {
number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]).isRequired,
previousNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]),
perspective: PropTypes.number,
size: PropTypes.number,
numberWrapperStyle: PropTypes.object,
cardStyle: PropTypes.object,
flipCardStyle: PropTypes.object,
numberStyle: PropTypes.object,
};