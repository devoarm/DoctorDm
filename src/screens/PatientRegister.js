import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {TextInput, Button, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
const PatientRegisterScreen = () => {  
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const onSubmit = async () => {
    const res = await firestore()
      .collection(`users`)
      .doc(user.uid)
      .collection('healt_check')
      .doc(moment().format('YYYY'))
      .set({register: true});
    navigation.navigate('resultPatientRegister');
  };
  return (
    <SessionBg>
      <BtGoBack />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>ข้อมูลการลงทะเบียน</Text>
          {user.photoURL ? (
            <Avatar.Image
              size={80}
              style={{margin: 10}}
              source={{uri: user.photoURL}}
            />
          ) : (
            <Avatar.Image
              size={80}
              source={require('../../assets/person.png')}
              style={{margin: 10}}
            />
          )}
          <View style={styles.rowDetail}>
            <View style={{flex: 1}}>
              <Text>ขื่อ </Text>
            </View>
            <View style={styles.cardDetail}>
              <Text>{user.f_name}</Text>
            </View>
          </View>
          <View style={styles.rowDetail}>
            <View style={{flex: 1}}>
              <Text>นามสกุล</Text>
            </View>
            <View style={styles.cardDetail}>
              <Text>{user.l_name}</Text>
            </View>
          </View>
          <View style={styles.rowDetail}>
            <View style={{flex: 1}}>
              <Text>เลขบัตรประชาชน</Text>
            </View>
            <View style={styles.cardDetail}>
              <Text>{user.cid}</Text>
            </View>
          </View>
          <View style={styles.rowDetail}>
            <View style={{flex: 1}}>
              <Text>เบอร์โทรศัพท์</Text>
            </View>
            <View style={styles.cardDetail}>
              <Text>{user.phone}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={{color: Colors.black}}>
            ท่านต้องการลงทะเบียนตรวจสุขภาพประจำปี 2565
            เพื่อตรวจโรคเบาหวานและความดันโลหิตสูง ใช่หรือไม่ กรุณากด ยืนยัน
            เพื่อทำการลงทะเบียน
          </Text>
        </View>
        <Button
          mode="contained"
          style={{backgroundColor: 'green'}}
          onPress={() => onSubmit()}>
          ยืนยัน
        </Button>
      </View>
    </SessionBg>
  );
};

export default PatientRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardFooter: {
    backgroundColor: Colors.green,
    padding: 10,
    marginVertical: 15,
    borderRadius: 20,
  },
  card: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenShade,
    borderRadius: 15,
  },
  rowDetail: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetail: {
    backgroundColor: Colors.white,
    padding: 5,
    flex: 3,
    borderRadius: 10,
  },
});
