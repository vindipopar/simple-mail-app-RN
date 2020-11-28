import * as React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph} from 'react-native-paper';
import StackNavigator from './StackNavigator';
import AdminScreen from '../screens/AdminScreen';
import DATA_MESSAGE from '../data/DATA_MESSAGE';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    onGetData();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      onGetData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onGetData = async () => {
    try {
      let data;
      let msgs = await AsyncStorage.getItem('messages');
      if (msgs === null) {
        data = DATA_MESSAGE;
        await AsyncStorage.setItem('messages', JSON.stringify(DATA_MESSAGE));
      } else {
        data = JSON.parse(msgs);
      }
      setTotal(data.length);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={require('../assets/images/alami.png')}
            size={50}
          />
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <Title style={styles.title}>Vindi pop</Title>
            <Caption style={styles.caption}>vindi@admin.inc</Caption>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>
              ^20%
            </Paragraph>
            <Caption style={styles.caption}>Ujrah</Caption>
          </View>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>
              {total}
            </Paragraph>
            <Caption style={styles.caption}>AllInbox</Caption>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.bottomDrawerSection}
        label="Close"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Admin" component={AdminScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
