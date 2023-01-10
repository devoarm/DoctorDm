import {StyleSheet, View, Image, Button, ScrollView} from 'react-native';
import React from 'react';
import BackGround1 from '../themes/Background';
import SessionBg from '../themes/BackGroundSession';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../components/BtGoBack';
import Colors from '../themes/Colors';
import {useSelector} from 'react-redux';
import {TextInput, Avatar, Text, ToggleButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CardWalk from '../components/CardWalk';
const DoctorAdvice = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  return (
    <BackGround1>
      <BtGoBack />
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.textHeader}>คำแนะนำด้านการดูแลสุขภาพ</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16}}>คุณ </Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {user.f_name} {user.l_name}
            </Text>
          </View>
        </View>
        {/* <View style={styles.underHeader}>
          <View style={{flex: 3}}>
            <Text>
              เราจะส่งแจ้งเตือนการดูแลสุขภาพให้คุณทุกวัน กรุณา เปิดแจ้งเตือน
              และปฏิบัติตามคำแนะนำ เพื่อสุขภาพที่ดียิ่งขึ้น
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="bell" size={30} />
          </View>
        </View> */}
        <View style={styles.cardAdvice}>
          <View style={{flex: 2}}>
            <Image source={require('../../assets/diet.png')} />
          </View>
          <View style={{flex: 2}}>
            <Text>งด อาหารรสจัด อาหารที่มีไขมันสูง อาหารหมักดอง</Text>
            <Text></Text>
            <Text>งด สูบบุหรี่และดื่ม เครื่องดื่มแอลกอฮอล</Text>
          </View>
        </View>
        <Text>เมนูอาหารที่แนะนำ</Text>
        <ScrollView horizontal={true}>
          <CardWalk
            lable="เดินเร็ว 30 นาที"
            image={require(`../../assets/walk/walking1.png`)}
          />
          <CardWalk
            lable="วิ่งเหยาะๆ 30 นาที"
            image={require(`../../assets/walk/walking2.png`)}
          />
          <CardWalk
            lable="วิ่งเหยาะๆ 30 นาที"
            image={require(`../../assets/walk/walking3.png`)}
          />
          <CardWalk
            lable="พาหมาไปเดินเล่น 30 นาที"
            image={require(`../../assets/walk/walking4.png`)}
          />
        </ScrollView>
      </View>
    </BackGround1>
  );
};

export default DoctorAdvice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    flexDirection: 'column',
  },
  cardHeader: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: Colors.green,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  underHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardAdvice: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenShade,
    padding: 20,
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 16,
  },
});
