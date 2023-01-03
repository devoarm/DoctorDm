import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import Background from '../themes/Background';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import {ProgressDialog} from 'react-native-simple-dialogs';
const RegisterGoogle = ({navigation}) => {  
  const [date, setDate] = React.useState(new Date());
  const [openPicker, setOpenPicker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    try {
      const googleRegister = firestore().collection('users').doc(user.uid).set({
        f_name: data.f_name,
        l_name: data.l_name,
        cid: data.cid,
        birthday: date.toLocaleDateString(),
        phone: data.phone,
        email: user.email,
        isAdmin: false
      });
      navigation.navigate('loading');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setLoading(false);
  };
  if (initializing) return null;
  if (!user) {
    return navigation.replace('login');
  }
  return (
    <Background>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณารอสักครู่..."
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{justifyContent: 'center', marginHorizontal: 30}}>
            <Text style={styles.text}>ลงทะเบียน | Register</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="ชื่อ"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.f_name && true}
                />
              )}
              name="f_name"
              rules={{required: true}}
            />
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกชื่อ !</HelperText>
            )}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="นามสกุล"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.l_name && true}
                />
              )}
              name="l_name"
              rules={{required: true}}
            />
            {errors.f_name && (
              <HelperText type="error">กรุณากรอกนามสกุล !</HelperText>
            )}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="รหัสบัตรประชาชน(username)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.cid && true}
                />
              )}
              name="cid"
              rules={{required: true}}
            />
            {errors.cid && (
              <HelperText type="error">
                กรุณากรอกรหัสบัตรประชาชน(username) !
              </HelperText>
            )}
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="เบอร์โทรศัพท์"
                  value={value}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.phone && true}
                />
              )}
              name="phone"
              rules={{required: true}}
            />
            {errors.phone && (
              <HelperText type="error">กรุณากรอกเบอร์โทรศัพท์ !</HelperText>
            )}
            <Pressable onPress={() => setOpenPicker(true)}>
              <TextInput
                label="
                  กรุณาเลือกวันเกิด
                "
                value={date.toLocaleDateString()}
                left={<TextInput.Icon icon="calendar-alt" />}
                editable={false}
              />
            </Pressable>
            <DatePicker
              title="กรุณาเลือกวันเกิด"
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'grey'}}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                ลงทะเบียน
              </Button>
              <Text>|</Text>
              <Button
                style={{marginHorizontal: 10, backgroundColor: 'goldenrod'}}
                mode="contained"
                onPress={() => navigation.goBack()}>
                ยกเลิก
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 25,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterGoogle;
