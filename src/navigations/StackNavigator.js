import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddEmailMessage from '../screens/AddEmailMessage';
import MailScreen from '../screens/MailScreen';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function StackNavigator({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Mail">
      <Stack.Screen
        name="Home"
        component={MailScreen}
        options={{
          headerTitleStyle: {alignSelf: 'center'},
          title: 'Inbox',
          headerLeft: () => (
            <View style={styles.containerHeader}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name="bars"
                  size={30}
                  color="#a2a2db"
                  style={{paddingRight: 20}}
                />
              </TouchableOpacity>
              <Icon name="search" size={30} color="#a2a2db" />
            </View>
          ),
          headerRight: () => (
            <View style={styles.containerHeader}>
              <Image
                source={require('../assets/images/alami.png')}
                style={styles.imageHeaderRight}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddEmailMessage"
        component={AddEmailMessage}
        options={{
          headerTitle: 'Send Message',
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;

const styles = StyleSheet.create({
  containerHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  imageHeaderRight: {
    width: 35,
    height: 35,
  },
});
