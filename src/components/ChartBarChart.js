import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import Colors from '../themes/Colors';
export default function ChartBarChart({
  bloodSugar,
  upperPressure,
  lowerPressure,
}) {
  return (
    <View>
      <BarChart
        data={{
          labels: ['ระดับตาลในเลือด', 'ค่าบน', 'ค่าล่าง'],
          datasets: [
            {
              data: [bloodSugar, upperPressure, lowerPressure],
              colors: [
                (opacity = 1) => Colors.bloodSugar,
                (opacity = 1) => Colors.upperPressure,
                (opacity = 1) => Colors.lowerPressure,
              ],
            },
          ],
        }}
        strokeWidth={16}
        hideLegend={true}
        radius={35}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          backgroundColor: Colors.grayGreen,
          backgroundGradientFrom: Colors.green,
          backgroundGradientTo: Colors.red,
          propsForLabels: {fill: Colors.black},
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        width={Dimensions.get('window').width - 50}
        height={220}
        withCustomBarColorFromData={true}
        flatColor={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
