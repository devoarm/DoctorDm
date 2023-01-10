import * as React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  StackActions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Background from '../themes/Background';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {useSelector, useDispatch} from 'react-redux';
import {setUserSlice} from '../store/userSlice';

GoogleSignin.configure({
  webClientId:
    '833899447588-jdrsimoomurqvvirl5bqubsu8prrb24s.apps.googleusercontent.com',
});

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [secureText, setsecureText] = React.useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    firestore()
      .collection('users')
      .where('cid', '==', data.cid)
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          firestore()
            .collection('users')
            .where('password', '==', data.password)
            .limit(1)
            .get()
            .then(querySnapshotPw => {
              if (querySnapshotPw.size > 0) {
                querySnapshotPw.docs.forEach(doc => {
                  console.log(doc.data());
                  auth()
                    .signInWithEmailAndPassword(
                      doc.data().email,
                      doc.data().password,
                    )
                    .then(() => {
                      navigation.replace('loading');
                    });
                });
              } else {
                setError('password', {
                  type: 'custom',
                  message: 'รหัสผ่านไม่ถูกต้อง!',
                });
              }
            });
        } else {
          setError('cid', {type: 'custom', message: 'เลขบัตรไม่ถูกต้อง!'});
        }
      });
    setLoading(false);
  };
  const handleGoogleSingin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      const userDocument = await firestore()
        .collection('users')
        .doc(user.user.uid)
        .get();
      if (userDocument.data()) {
        console.log('Has Data');
        navigation.navigate('home');
      } else {
        console.log('No Data');
        navigation.navigate('registerGoogle');
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  return (
    <Background>
      <ProgressDialog
        visible={loading}
        title="กำลังโหลด"
        message="กรุณารอสักครู่..."
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text style={styles.text}>เข้าสู้ระบบ | Login</Text>
          <View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{marginVertical: 5}}
                  label="รหัสบัตรประชาชน"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  error={errors.cid && true}
                />
              )}
              name="cid"
              rules={{required: 'กรุณากรอกรหัสบัตรประชาชน!'}}
            />
            {errors.cid && (
              <HelperText type="error">{errors.cid.message}</HelperText>
            )}
          </View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{marginVertical: 5}}
                label="รหัสผ่าน(password)"
                value={value}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                error={errors.password && true}
                secureTextEntry={secureText}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setsecureText(!secureText);
                    }}
                  />
                }
              />
            )}
            name="password"
            rules={{required: 'กรุณากรอกรหัสผ่าน !'}}
          />

          {errors.password && (
            <HelperText type="error">{errors.password.message}</HelperText>
          )}
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
              เข้าสู้ระบบ
            </Button>
            <Text>|</Text>
            <Button
              style={{marginHorizontal: 10, backgroundColor: 'goldenrod'}}
              mode="contained"
              onPress={() => navigation.navigate('register')}>
              ลงทะเบียน
            </Button>
          </View>
          <Text style={{textAlign: 'center', marginVertical: 20}}>หรือ</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSingin}
          />
        </View>
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
export default Login;
