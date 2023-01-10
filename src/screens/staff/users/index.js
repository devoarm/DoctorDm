import React from 'react';
import SessionBg from '../../../themes/BackGroundSession';
import {DataTable} from 'react-native-paper';
import CardBorder from '../../../components/CardBorder';
import {StyleSheet, View, FlatList, IconButton} from 'react-native';
import {Text} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BtGoBack from '../../../components/BtGoBack';
export default function UserManagePage({navigation}) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState();
  const [users, setUsers] = React.useState();

  const fetchUser = async () => {
    firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const addUsers = [];
        querySnapshot.forEach(documentSnapshot => {
          addUsers.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(addUsers);
      });
  };

  React.useEffect(() => {
    setPage(0);
    fetchUser();
  }, [itemsPerPage]);
  return (
    <SessionBg>
      <BtGoBack />
      <View styles={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 20}}>
          จัดการข้อมูลกำหนดการ {'\n'}ตรวจสุขภาพประจำปี
        </Text>
        <CardBorder>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ลำดับ</DataTable.Title>
              <DataTable.Title>ชื่อ-นามสกุล</DataTable.Title>
              <DataTable.Title>อีเมล</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={users}
              renderItem={({item, index}) => (
                <DataTable.Row
                  onPress={() => {
                    navigation.navigate('detailUser', {
                      userData: item,
                    });
                  }}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>
                    {item.f_name} {item.l_name}
                  </DataTable.Cell>
                  <DataTable.Cell>{item.email}</DataTable.Cell>
                </DataTable.Row>
              )}
            />

            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={page => setPage(page)}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </CardBorder>
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
  title: {
    marginTop: 50,
  },
});
