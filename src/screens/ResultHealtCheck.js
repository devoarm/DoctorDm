import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackGround1 from '../themes/Background';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {Button, Avatar, Text, Divider, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CardBorder from '../components/CardBorder';
import InputHealtCheck from '../components/InputHealtCheck';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'moment';
import ChartResultHealt from '../components/ChartResultHealt';
import CircleColor from '../components/CircleColor';
const ResultHealtCheckScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const [healtCheck, setHealtCheck] = useState({});
  const [bloodSugar, setBloodSugar] = useState(0);
  const [sumValue, setSumValue] = useState(100);
  const [upperPressure, setUpperPressure] = useState(0);
  const [lowerPressure, setLowerPressure] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchHealt = async () => {
    try {
      const query = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('healt_check')
        .doc(moment().format('YYYY'))
        .get();
      console.log(query.data());
      const fB = parseInt(query.data().bloodSugar);
      const fU = parseInt(query.data().upperPressure);
      const fL = parseInt(query.data().lowerPressure);
      const sum = fB + fU + fL;
      setBloodSugar(fB);
      setUpperPressure(fU);
      setLowerPressure(fL);
      setSumValue(sum);
      setHealtCheck(query.data());
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchHealt();    
  }, []);

  return (
    <BackGround1>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณารอสักครู่..."
      />
      <ScrollView>
        <BtGoBack />
        <View style={styles.container}>
          <View style={styles.cardHeader}>
            <Text>ภาวะสุขภาพของ คุณ </Text>
            <Text style={{fontWeight: 'bold'}}>
              {user.f_name} {user.l_name}
            </Text>
          </View>

          <ChartResultHealt
            bloodSugar={bloodSugar}
            upperPressure={upperPressure}
            lowerPressure={lowerPressure}
            sum={sumValue}
          />

          <CardBorder>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <CircleColor color={Colors.bloodSugar} />
              <Text>น้ำตาลในเลือด</Text>
              <CircleColor color={Colors.upperPressure} />
              <Text>ความดันบน</Text>
              <CircleColor color={Colors.lowerPressure} />
              <Text>ความดันล่าง</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text style={{textAlign: 'center', fontSize: 25}}>
                  {healtCheck.bloodSugar}
                </Text>
                <Text style={{textAlign: 'center'}}>มิลลิกรัม</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{textAlign: 'center'}}>ความดันโลหิต</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 25}}>
                    {healtCheck.upperPressure}
                  </Text>
                  <View style={styles.subVerticleLine}></View>
                  <Text style={{textAlign: 'center', fontSize: 25}}>
                    {healtCheck.lowerPressure}
                  </Text>
                </View>
                <Text style={{textAlign: 'center'}}>มิลลิเมตรปรอท</Text>
              </View>
            </View>
          </CardBorder>
          
          <View style={styles.cardStatus}>
            <Text>ภาวะสุขภาพ</Text>
            <Text style={{textAlign: 'center', fontSize: 25}}>
              คุณอยู่ในกลุ่มปกติ
            </Text>
          </View>
          <Button
            mode="contained"
            icon="arrow-right"
            style={{backgroundColor: 'green', marginVertical: 20}}
            onPress={() => {
              navigation.navigate('doctorAdvice');
            }}>
            คำแนะนำการดูแลสุขภาพ
          </Button>
        </View>
      </ScrollView>
    </BackGround1>
  );
};

export default ResultHealtCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 15,
    flexDirection: 'row',
  },
  titleCard: {
    backgroundColor: Colors.grayGreen,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  verticleLine: {
    height: 50,
    width: 1,
    backgroundColor: Colors.black,
  },
  subVerticleLine: {
    height: 20,
    width: 1,
    backgroundColor: Colors.black,
  },
  cardStatus: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
  },
});
