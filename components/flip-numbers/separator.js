import React from 'react';
import { View } from 'react-native';

import style from '../../style';

export default function Separator() {
  return (
    <View style={style.separator}>
      <View style={style.circle} />
      <View style={style.circle} />
    </View>
  );
}