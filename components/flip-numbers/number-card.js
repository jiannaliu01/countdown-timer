import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import style from '../../style';

import TransformUtil from '../../utils';
import FlipCard from './flip-card';
import Card from './card';

const width = 1000;

export default function NumberCard({
  textColor, flipColorGrad, flipColor, size, number, previousNumber, perspective, cardStyle, numberStyle, flipCardStyle
}) {
    // const rotateFront = useRef(new Animated.Value(0)).current;
    // const rotateBack = useRef(new Animated.Value(-180)).current;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [value, setValue] = useState(0);
    const frontInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    const backInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    const frontAnimatedStyle = {
      transform: [
        {rotateX: frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {rotateX: backInterpolate}
      ]
    }
    var frontRef = useRef(null);
    var backRef = useRef(null);

    //const width = Dimensions.get('window');

    useEffect(() => {
        animateTick();
        // rotateFront.addListener(({ value }) => {
        //     transformRef(frontRef, value, size*0.3)
        // })
        // rotateBack.addListener(({value}) => {
        //     transformRef(backRef, value, -size*0.3)
        // })  
       // value = 0
        animatedValue.addListener(({value}) => {
          setValue(value);
        })

    }, []);

    useEffect(() => {
        animateTick();
    }, [previousNumber]);

    const setFrontRef = (ref) => {
      // console.log('I AM HERE FONRT REF', ref)
      // console.log(frontRef)
      if (!frontRef) {
        return;
      }
      frontRef.current = ref;
    }

    const setBackRef = (ref) => {
      if (!backRef) {
        return;
      }
      // console.log('I AM HERE BACK REF', ref)
      // console.log(backRef)
      backRef.current = ref;
    }

    const transformRef = (ref, deg, y) => {
        const matrix = TransformUtil.createIdentityMatrix();
        TransformUtil.translateMatrix(matrix, { x: 0, y, z: 0 });
        TransformUtil.perspectiveMatrix(matrix, perspective);
        TransformUtil.rotateXMatrix(matrix, deg);
        TransformUtil.untranslateMatrix(matrix, { x: 0, y, z: 0 });
        //console.log('ref transformref', ref)
        //console.log('ref CURREENTTTT', ref.current)
        if (ref.current) {
          //console.log('ref CURRENT INSIDEEE', ref)
          ref.current.setNativeProps({ style: { transform: [{ matrix }] } });
        }
      }

    const animateTick = () => {
        // rotateFront.setValue(0);
        // rotateBack.setValue(-180);
        console.log(value, 'value')
        if (value >= 90) {
          Animated.spring(animatedValue, {
            toValue: 0,
            duration: 800,
          }).start();
        } else {
          Animated.spring(animatedValue, {
            toValue: 180,
            duration: 800,
          }).start();
        }
        // Animated.parallel([
        //   Animated.timing(rotateFront, {
        //     toValue: 180,
        //     duration: 800,
        //     //useNativeDriver: true,ok 
        //   }),
        //   Animated.timing(rotateBack, {
        //     toValue: 0,
        //     duration: 800,
        //     //useNativeDriver: true,
        //   }),
        // ]).start();
      }
    return (
        <View style={[style.numberWrapper,
            { backgroundColor: flipColor, width: size * 0.8, height: size * 1.2, borderRadius: size / 10 },
            ]}
          >
            <Card
              type="upper"
              size={size}
              number={number}
              cardStyle={cardStyle}
              flipColor = {flipColor}
              flipColorGrad = {flipColorGrad}
              numberStyle={numberStyle}
              textColor = {textColor}
            />
            <Card
              type="lower"
              size={size}
              number={number}
              cardStyle={cardStyle}
              flipColor = {flipColor}
              flipColorGrad = {flipColorGrad}
              numberStyle={numberStyle}
              textColor = {textColor}
            />
            <FlipCard
              animatedStyle={frontAnimatedStyle}
              flipColor = {flipColor}
              flipColorGrad = {flipColorGrad}
              setRef={transformRef}
              type="front"
              size={size}
              number={number}
              flipCardStyle={flipCardStyle}
              numberStyle={numberStyle}
              textColor = {textColor}
            />
            <FlipCard
              animatedStyle = {backAnimatedStyle}
              flipColor = {flipColor}
              flipColorGrad = {flipColorGrad}
              setRef={transformRef}
              type="back"
              size={size}
              number={number}
              flipCardStyle={flipCardStyle}
              numberStyle={numberStyle}
              textColor = {textColor}
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