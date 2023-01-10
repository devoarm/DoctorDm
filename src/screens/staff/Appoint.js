import {StyleSheet, View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import SessionBg from '../../themes/BackGroundSession';
import CardBorder from '../../components/CardBorder';
import DatePicker from 'react-native-date-picker';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {TextInput, Button, HelperText, IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../themes/Colors';
import moment from 'moment';
export default function AppointScreen({navigation}) {
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState('');
  const [openPicker, setOpenPicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [openPickerTime, setOpenPickerTime] = React.useState(false);
  const handleSave = async () => {
    const data = {
      date: moment(date).format('YYYY-MM-DD'),
      time: moment(date).format('HH:MM:DD'),
      location: location,
    };
    try {
      const res = await firestore()
        .collection(`appoint`)
        .doc(moment(date).format('YYYY'))
        .set(data);
      navigation.goBack();
    } catch (error) {}
    
  };
  return (
    <SessionBg>
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          จัดการข้อมูลกำหนดการ {'\n'}ตรวจสุขภาพประจำปี
        </Text>
        <CardBorder>
          <Pressable
            onPress={() => setOpenPicker(true)}
            style={{marginVertical: 5}}>
            <TextInput
              label="
                  กรุณาเลือกวัน
                "
              value={date.toLocaleDateString()}
              left={<TextInput.Icon icon="calendar-alt" />}
              editable={false}
              style={{backgroundColor: Colors.green}}
            />
          </Pressable>
          <DatePicker
            title="กรุณาเลือกวัน"
            modal
            mode="date"
            open={openPicker}
            date={date}
            onConfirm={date => {
              setOpenPicker(false);
              setDate(date);
              console.log(date.getDate());
            }}
            onCancel={() => {
              setOpenPicker(false);
            }}
          />
          <Pressable
            onPress={() => {
              setOpenPickerTime(true);
              console.log('click');
            }}
            style={{marginVertical: 5}}>
            <TextInput
              label="
                  กรุณาเลือกเวลา
                "
              value={date.toLocaleTimeString()}
              left={<TextInput.Icon icon="calendar-alt" />}
              editable={false}
              style={{backgroundColor: Colors.green}}
            />
          </Pressable>
          <DatePicker
            title="กรุณาเลือกเวลา"
            modal
            mode="time"
            open={openPickerTime}
            date={date}
            onConfirm={date => {
              setOpenPickerTime(false);
              setTime(date);
            }}
            onCancel={() => {
              setOpenPickerTime(false);
            }}
          />
          <TextInput
            label="
            สถานที่
                "
            style={{backgroundColor: Colors.green, marginVertical: 5}}
            onChangeText={setLocation}
            value={location}
          />
        </CardBorder>
        <Button
          style={{backgroundColor: 'green'}}
          mode="contained"
          onPress={() => {
            handleSave();
          }}>
          ลงทะเบียน
        </Button>
      </View>
    </SessionBg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
