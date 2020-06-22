import * as React from 'react';
import {useState} from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import FlipNumber from "./components/flip-numbers";
import CountdownTimer from './components/countdown-timer';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  const [play, setPlay] = useState(true);

  return (
    <View style={styles.container}>
        <CountdownTimer 
          launchYear = {2020} 
          launchMonth = {5}
          launchDate = {21}
          launchHour = {11}
          launchMinute = {0}
          launchSecond = {30}
          time={500} 
          play={play} 
          countdown={false} 
          textColor = {'white'}
          flipColor = {'#333333'}
          />
        <TouchableOpacity style={styles.button} onPress={() => setPlay(!play)}>
          <Text style={styles.text}>{play ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    backgroundColor: '#333333',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cccccc',
  },
});
