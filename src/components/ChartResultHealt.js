import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import Colors from '../themes/Colors';

export default function ChartResultHealt({
  bloodSugar,
  upperPressure,
  lowerPressure,
  sum,
}) {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View>      
      <ProgressChart
        data={{
          labels: ['ระดับน้ำตาลในเลือด', 'ค่าบน', 'ค่าล่าง'], // optional
          data: [
            (bloodSugar / sum),
            (upperPressure / sum),
            (lowerPressure / sum)
          ],
          colors: [
            Colors.bloodSugar,
            Colors.upperPressure,
            Colors.lowerPressure,
          ],
        }}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        hideLegend={true}
        withCustomBarColorFromData={true}
        radius={35}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          backgroundColor: Colors.grayGreen,
          backgroundGradientFrom: Colors.green,
          backgroundGradientTo: Colors.red,
          propsForLabels: {fill: Colors.black},
          decimalPlaces: 2,
          color: (opacity = 1, _index) => `rgba(0,0,0,${opacity})`,
        }}
        style={{margin: 10, borderRadius: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
