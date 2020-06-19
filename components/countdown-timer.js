import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from 'react-native';

import FlipNumber from './flip-numbers';
import Separator from './flip-numbers/separator';
import PropTypes from 'prop-types';

import style from '../style';

export default function CountdownTimer({play, wrapperStyle, flipNumberProps}) {
    const [today, setToday] = useState(new Date());
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const month_to_days = {0: 31, 1: 28, 2: 31, 3: 30, 4:31, 5:30, 6:31, 7:31, 
                                8: 30, 9: 31, 10: 30, 11: 31}

    useEffect(() => {
        //do API call right here to get launch date
        const launchDate = new Date(2020, 3, 4, 11, 0, 0);
        setToday(new Date());
        console.log(today, today.getMonth(), today.getSeconds, "TODAY")
        //const today = new Date();
        console.log(today, 'heyyyy')
        const timer = setInterval(() =>
            updateTime(), 1000,
        )
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updateTime()
          }, 1000);
        console.log(hours, days, minutes, seconds)
          return () => clearInterval(interval);
    }, [today]);

    const updateTime = () => {
        const launchDate = new Date(2020, 3, 4, 11, 0, 0);
        setToday(new Date());
        const difference = getDifference(launchDate, new Date());
        console.log(difference, "HEYY DIFF")
        setDays(difference[0]);
        setHours(difference[1]);
        setMinutes(difference[2]);
        setSeconds(difference[3]);
    };

    const countLeapYears = (day) => {
        var years = day.getFullYear();

        if (day.getMonth() <= 2) {
            years -= 1
        }
        return Math.round(years/4-years/100+years/400);
    };

    const getDifference = (launchDate, today) => {
        var n1 = launchDate.getFullYear() * 365 + launchDate.getDay();
        for(var i =0; i < launchDate.getMonth(); i++) {
            n1 += month_to_days[i]
        }
        n1 += countLeapYears(launchDate);

        var n2 = today.getFullYear()* 365 + today.getDay()
        for(var i =0; i < launchDate.getMonth(); i++) {
            n2 += month_to_days[i]
        }
        n2 += countLeapYears(today);

        var seconds = launchDate.getSeconds() - today.getSeconds();
        console.log(launchDate.getSeconds(), today.getSeconds(), 'SECONDS')
        var minutes = launchDate.getMinutes() - today.getMinutes();
        console.log(launchDate.getMinutes(), today.getMinutes(), 'MINUTES')
        var hours = launchDate.getHours() - today.getHours();
        console.log(launchDate.getHours(), today.getHours(), 'HOURS')
        var days = n1 - n2;
        console.log()
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
        {!!days && <FlipNumber number={days} unit="days" {...flipNumberProps} />}
        <Separator />
        {!!hours && <FlipNumber number={hours} unit="hours" {...flipNumberProps} />}
        <Separator />
        {!!minutes && <FlipNumber number={minutes} unit="minutes" {...flipNumberProps} />}
        <Separator />
        {!!seconds && <FlipNumber number={seconds} unit="seconds" {...flipNumberProps} />}
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