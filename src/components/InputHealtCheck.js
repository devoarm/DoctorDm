import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

export default function InputHealtCheck({
  color,
  placeholder,
  onError = false,
  ...props
}) {
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        style={{
          height: 50,
          width: 100,
          margin: 12,
          backgroundColor: color,
          padding: 10,
          textAlign: 'center',
          fontSize: 20,
          borderColor: onError ? Colors.red : null,
          borderWidth: onError ? 2 : null,
        }}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
