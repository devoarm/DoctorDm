import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
} from 'react-native';
import Background from '../themes/BackGroundSession';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, Divider} from 'react-native-paper';
import Colors from '../themes/Colors';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('ยืนยัน', 'คุณต้องการออกจากระบบ จริงหรือไม่?', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'ยืนยัน',
        onPress: () => {
          auth()
            .signOut()
            .then(() => navigation.replace('login'));
        },
      },
    ]);
  };
  return (
    <Background>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headers}>
          <Icon
            size={25}
            color={Colors.black}
            style={{marginHorizontal: 10}}
            name="user-cog"
          />
          <TouchableWithoutFeedback onPress={handleLogout}>
            <Icon
              size={25}
              color={Colors.black}
              style={{marginHorizontal: 10}}
              name="sign-out-alt"
            />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.user}>
            <View style={{marginHorizontal: 10}}>
              <Text
                style={{textAlign: 'right', fontSize: 18, color: Colors.black}}>
                สวัดดีค่ะ
              </Text>
              <Text
                style={{textAlign: 'right', fontSize: 18, color: Colors.black}}>
                คุณ {user.f_name} {user.l_name}
              </Text>
            </View>
            <View style={{marginHorizontal: 10}}>
              {user.photoURL ? (
                <Avatar.Image size={80} source={{uri: user.photoURL}} />
              ) : (
                <Avatar.Image
                  size={80}
                  source={require('../../assets/person.png')}
                />
              )}
            </View>
          </View>
          <Divider
            bold
            style={{backgroundColor: Colors.black, marginHorizontal: 40}}
          />
          <Text
            style={{
              marginTop: 10,
              marginLeft: 45,
              fontSize: 18,
              color: Colors.black,
            }}>
            เมนูให้บริการ
          </Text>
          <View style={styles.rowCard}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('patientRegister');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/checklist.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ลงทะเบียนตรวจ{'\n'}สุขภาพประจำปี
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('schedule');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/schedule.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  กำหนดการ{'\n'}ตรวจสุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.rowCard}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('doctorAdvice');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/doctor.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  คำแนะนำ{'\n'}ด้านการดูแลรักษา
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('healthCheck');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/stethoscope.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ตรวจสุขภาพ{'\n'}ด้วยตนเอง
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.rowCard}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('resultHealthCheck');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/profile.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ภาวะสุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('resultHealthCare');
              }}>
              <View style={styles.box}>
                <Image
                  source={require('../../assets/card/clinic-history.png')}
                  style={{width: 70, height: 70}}
                />
                <Text style={{marginTop: 5, textAlign: 'center'}}>
                  ผลการดูแล{'\n'}รักษาสุขภาพ
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  headers: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  user: {
    marginTop: 30,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
  },
});

export default HomeScreen;
