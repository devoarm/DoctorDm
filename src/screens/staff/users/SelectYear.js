import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import SessionBg from '../../../themes/BackGroundSession';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import CardBorder from '../../../components/CardBorder';
import BtGoBack from '../../../components/BtGoBack';
import Colors from '../../../themes/Colors';
export default function SelectYear({route, navigation}) {
  const {userData} = route.params;
  const [healYears, setHealYears] = React.useState([]);
  const fetchYear = async () => {
    firestore()
      .collection('users')
      .doc(userData.key)
      .collection('healt_check')
      .onSnapshot(querySnapshot => {
        const addUsers = [];
        querySnapshot.forEach(documentSnapshot => {
          addUsers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log(addUsers);
        setHealYears(addUsers);
        // setUsers(addUsers);
      });
  };

  React.useEffect(() => {
    fetchYear();
  }, []);
  return (
    <SessionBg>
      <View style={styles.container}>
        <BtGoBack />
        <Text style={{textAlign: 'center', marginTop: 50}}>เลือกปีตรวจ</Text>
        <CardBorder>
          <FlatList
            data={healYears}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {        
                  console.log(userData)          
                  navigation.navigate('reportUser', {
                    userData: userData,
                    year: item.key,
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    margin: 5,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      backgroundColor: Colors.greenBold,
                      width: 100,
                      borderRadius: 20,
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {item.key}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </CardBorder>
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
});
