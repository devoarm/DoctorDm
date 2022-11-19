import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function CircleColor({color}) {
  return (
    <View
      style={{
        height: 20,
        width: 20,
        backgroundColor: color,
        borderRadius: 20,
        marginHorizontal: 5,
      }}
    />
  );
}

const styles = StyleSheet.create({});
