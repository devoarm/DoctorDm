import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

const CardWalk = props => {
  return (
    <View style={styles.container}>      
      <Image source={props.image} />
      <Text>{props.lable}</Text>
    </View>
  );
};

export default CardWalk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'flex-start',
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
});
