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
const HealthCheckScreen = () => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('healt_check')
        .doc(moment().format('YYYY'))
        .set({
          lowerPressure: data.lowerPressure,
          upperPressure: data.upperPressure,
          height: data.height,
          width: data.width,
          bloodSugar: data.bloodSugar,
        });
        navigation.navigate('resultHealthCheck')
    } catch (error) {
      Alert.alert('ไม่สำเร็จ', `${error.message}`);
    }
    console.log(moment().format('YYYY'));
    console.log(data);
    setLoading(false);
  };
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
            <Image
              size={80}
              source={require('../../assets/patient.png')}
              style={{margin: 10}}
            />
            <Text>
              คำแนะนำ การตรวจระดับน้ำตาลในเลือดควรทำโดยผู้เชี่ยวชาญ
              เพื่อค่าที่ถูกต้องและแม่นยำ
            </Text>
          </View>
          <CardBorder>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.titleCard}>ระดับน้ำตาลในเลือด</Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <InputHealtCheck
                    color="#EDB18B"
                    placeholder="000"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    onError={errors.bloodSugar && true}
                  />
                )}
                name="bloodSugar"
                rules={{required: 'กรุณากรอกระดับน้ำตาลในเลือด!'}}
              />
              {errors.bloodSugar && (
                <HelperText type="error" style={{textAlign: 'center'}}>
                  {errors.bloodSugar.message}
                </HelperText>
              )}
              <Text style={{textAlign: 'center'}}>มิลลิกรัม</Text>
            </View>
          </CardBorder>
          <CardBorder>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.titleCard}>ความดันโลหิต</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>ค่าบน</Text>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <InputHealtCheck
                        color="#F2B8E6"
                        placeholder="00"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        onError={errors.upperPressure && true}
                      />
                    )}
                    name="upperPressure"
                    rules={{required: 'กรุณากรอกความดันโลหิตค่าบน!'}}
                  />
                  {errors.upperPressure && (
                    <HelperText type="error" style={{textAlign: 'center'}}>
                      {errors.upperPressure.message}
                    </HelperText>
                  )}
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.verticleLine}></View>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{textAlign: 'center'}}>ค่าล่าง</Text>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <InputHealtCheck
                        color="#94D4F2"
                        placeholder="00"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        onError={errors.lowerPressure && true}
                      />
                    )}
                    name="lowerPressure"
                    rules={{required: 'กรุณากรอกความดันโลหิตค่าล่าง!'}}
                  />
                  {errors.lowerPressure && (
                    <HelperText type="error" style={{textAlign: 'center'}}>
                      {errors.lowerPressure.message}
                    </HelperText>
                  )}
                </View>
              </View>
              <Text style={{textAlign: 'center'}}>มิลลิเมตรปรอท</Text>
            </View>
          </CardBorder>
          <CardBorder>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flexDirection: 'column', alignContent: 'center'}}>
                  <View style={{alignItems: 'center', marginBottom: 5}}>
                    <Image
                      source={require('../../assets/health/height.png')}
                      size={80}
                    />
                  </View>
                  <Text style={styles.titleCard}>ความสูง</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <InputHealtCheck
                        color={Colors.gray}
                        placeholder="000"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        onError={errors.height && true}
                      />
                    )}
                    name="height"
                    rules={{required: 'กรุณากรอกความสูง!'}}
                  />
                  {errors.height && (
                    <HelperText type="error" style={{textAlign: 'center'}}>
                      {errors.height.message}
                    </HelperText>
                  )}
                  <Text style={{textAlign: 'center'}}>เซนติเมตร</Text>
                </View>
              </View>
              <Divider bold={true} style={{backgroundColor: Colors.black}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <View style={{flexDirection: 'column', alignContent: 'center'}}>
                  <View style={{alignItems: 'center', marginBottom: 5}}>
                    <Image
                      source={require('../../assets/health/width.png')}
                      size={80}
                    />
                  </View>
                  <Text style={styles.titleCard}>น้ำหนัก</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <InputHealtCheck
                        color={Colors.gray}
                        placeholder="000"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        onError={errors.width && true}
                      />
                    )}
                    name="width"
                    rules={{required: 'กรุณากรอกน้ำหนัก!'}}
                  />
                  {errors.width && (
                    <HelperText type="error" style={{textAlign: 'center'}}>
                      {errors.width.message}
                    </HelperText>
                  )}

                  <Text style={{textAlign: 'center'}}>กิโลกรัม</Text>
                </View>
              </View>
            </View>
          </CardBorder>

          <Button
            mode="contained"
            style={{backgroundColor: 'green', marginVertical: 20}}
            onPress={handleSubmit(onSubmit)}>
            ประมวลผล
          </Button>
        </View>
      </ScrollView>
    </BackGround1>
  );
};

export default HealthCheckScreen;

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
    height: 80,
    width: 1,
    backgroundColor: Colors.black,
  },
});
