import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from 'react-native';

import FlipNumber from './flip-numbers';
import Separator from './flip-numbers/separator';
import PropTypes from 'prop-types';

import style from '../style';

export default function CountdownTimer({
    countdown, 
    play, 
    launchYear,
    launchMonth,
    launchDate,
    launchHour,
    launchMinute,
    launchSecond,
    textColor, 
    wrapperStyle, 
    flipNumberProps,
    flipColor,
    flipColorGrad}) {
    const [today, setToday] = useState(new Date());
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const month_to_days = {0: 31, 1: 28, 2: 31, 3: 30, 4:31, 5:30, 6:31, 7:31, 
                                8: 30, 9: 31, 10: 30, 11: 31}

    useEffect(() => {
        //do API call right here to get launch date
        setToday(new Date());
        const timer = setInterval(() =>
            updateTime(), 1000,
        )
    }, []);

    useEffect(() => {
        if (countdown) {
            const interval = setInterval(() => {
                updateTime()
            }, 1000);
            return () => clearInterval(interval);
        }
        else {
            const interval = setInterval(() => {
                countUpTime()
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [today]);

    const countUpTime = () => {
        setToday(new Date());
        const difference = getDifference(new Date());
        setDays(-1*difference[0]);
        setHours(-1*difference[1]);
        setMinutes(-1*difference[2]);
        setSeconds(-1*difference[3]);
    }

    const updateTime = () => {
        setToday(new Date());
        const difference = getDifference(new Date());
        setDays(difference[0]);
        setHours(difference[1]);
        setMinutes(difference[2]);
        setSeconds(difference[3]);
    };

    const countLeapYears = (launchYear, launchMonth) => {
        var years = launchYear

        if (launchMonth <= 2) {
            years -= 1
        }
        return Math.round(years/4-years/100+years/400);
    };

    const getDifference = (today) => {
        var n1 = launchYear * 365 + launchDate;
        for(var i =0; i < launchMonth; i++) {
            n1 += month_to_days[i]
        }
        n1 += countLeapYears(launchYear, launchMonth);

        var n2 = today.getFullYear()* 365 + today.getDate()
        for(var i =0; i < today.getMonth(); i++) {
            n2 += month_to_days[i]
        }
        n2 += countLeapYears(today.getFullYear(), today.getMonth());

        if (countdown) {
            var seconds = launchSecond - today.getSeconds();
            var minutes = launchMinute - today.getMinutes();
            var hours = launchHour - today.getHours();
            var days = n1 - n2;
        }
        else {
            var seconds = today.getSeconds() - launchSecond
            var minutes = today.getMinutes() - launchMinute;
            var hours = today.getHours() - launchHour;
            var days = n2 - n1;
        }
        if (seconds < 0) {
            seconds = 60 + seconds
            minutes -= 1
        }
        if (minutes < 0) {
            minutes = 60 + minutes
            hours -= 1
        }
        if (hours < 0) {
            hours = 24 + hours
            days -= 1
        }
        return [days, hours, minutes, seconds]
    };


    return(
        <View style={[style.wrapper, wrapperStyle]}>
        {!!days && <FlipNumber textColor = {textColor} flipColor = {flipColor} flipColorGrad = {flipColorGrad} number={days} unit="days" {...flipNumberProps} />}
        <Separator />
        {!!hours && <FlipNumber textColor = {textColor} flipColor = {flipColor} flipColorGrad = {flipColorGrad} number={hours} unit="hours" {...flipNumberProps} />}
        <Separator />
        {!!minutes && <FlipNumber textColor = {textColor} flipColor = {flipColor} flipColorGrad = {flipColorGrad} number={minutes} unit="minutes" {...flipNumberProps} />}
        <Separator />
        {!!seconds && <FlipNumber textColor = {textColor} flipColor = {flipColor} flipColorGrad = {flipColorGrad} number={seconds} unit="seconds" {...flipNumberProps} />}
      </View>
    );
}

CountdownTimer.defaultProps = {
    play: true,
    wrapperStyle: {},
  };
  
  CountdownTimer.propTypes = {
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    play: PropTypes.bool,
    wrapperStyle: PropTypes.object,
    flipNumberProps: PropTypes.shape({
      size: PropTypes.number,
      perspective: PropTypes.number,
      numberWrapperStyle: PropTypes.object,
      cardStyle: PropTypes.object,
      flipCardStyle: PropTypes.object,
      numberStyle: PropTypes.object,
    }),
  };