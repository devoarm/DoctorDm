import {Button, StyleSheet, View, TextInput, Alert} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import SessionBg from '../../../themes/BackGroundSession';
import CardBorder from '../../../components/CardBorder';
import Colors from '../../../themes/Colors';
import BtGoBack from '../../../components/BtGoBack';
export default function DetailUserPage({route, navigation}) {
  const {userData} = route.params;
  const [passwordChang, setPasswordChang] = React.useState('');
  const [statusChangePassword, setStatusChangePassword] = React.useState(false);
  const onChangePassword = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({password: passwordChang});
      Alert.alert('สำเร็จ', 'เปลี่ยนรหัสผ่านสำเร็จ');
      setStatusChangePassword(false);
      setPasswordChang('');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  const onSetToAdmin = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({isAdmin: true});
      Alert.alert('สำเร็จ', 'ให้สิทธิเป็นเจ้าหน้าที่สำเร็จ');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  const onSetToUser = async () => {
    try {
      const res = await firestore()
        .collection(`users`)
        .doc(userData.key)
        .update({isAdmin: false});
      Alert.alert('สำเร็จ', 'ให้สิทธิเป็นผู้ใช้งานสำเร็จ');
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง!');
    }
  };
  return (
    <SessionBg>
      <BtGoBack />
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 50}}>
          ข้อมูลส่วนตัวผู้ใช้
        </Text>
        <CardBorder>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>ชื่อ-นามสกุล</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>
                {userData.f_name} {userData.l_name}
              </Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>เลขบัตรประชาชน</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.cid}</Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>อีเมล</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.email}</Text>
            </View>
          </View>
          <View style={styles.textInCard}>
            <Text style={styles.textSubtitle}>เบอร์โทรศัพท์</Text>
            <View style={styles.cardText}>
              <Text style={styles.textValue}>{userData.phone}</Text>
            </View>
          </View>
        </CardBorder>

        {statusChangePassword ? (
          <View>
            <CardBorder>
              <TextInput
                style={styles.input}
                onChangeText={setPasswordChang}
                value={passwordChang}
                placeholder="กรอกรหัสผ่านใหม่"
              />
            </CardBorder>
            <Button
              title="บันทึก"
              color={Colors.primary}
              onPress={() => onChangePassword()}></Button>
            <View style={{paddingVertical: 5}}></View>
            <Button
              title="ยกเลิก"
              color={Colors.gray}
              onPress={() => setStatusChangePassword(false)}></Button>
          </View>
        ) : (
          <View>
            <Button
              title="เปลี่ยนรหัสผ่าน"
              color={Colors.primary}
              onPress={() => setStatusChangePassword(true)}
            />
            <View style={{paddingVertical: 5}}></View>
            {userData.isAdmin ? (
              <Button
                title="เปลี่ยนสิทธิเป็นผู้ใช้งานทั่วไป"
                color={Colors.primary}
                onPress={() => onSetToUser()}
              />
            ) : (
              <Button
                title="ให้สิทธิเป็นเจ้าหน้าที่"
                color={Colors.primary}
                onPress={() => onSetToAdmin()}
              />
            )}
          </View>
        )}
        <View style={{paddingVertical: 5}}></View>
        <Button
          title="ดูผลตรวจสุขภาพ"
          color={Colors.greenBold}
          onPress={() =>
            navigation.navigate('selectYear', {
              userData: userData,
            })
          }
        />
      </View>
    </SessionBg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  textInCard: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textSubtitle: {
    flex: 1,
  },
  cardText: {
    backgroundColor: Colors.grayGreen,
    flex: 2,
    padding: 5,
  },
  textValue: {
    fontWeight: 'bold',
  },
});
