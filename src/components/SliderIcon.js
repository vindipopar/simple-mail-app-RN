import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SliderIcon = () => {
  return (
    <View>
      <View style={styles.container}>
        <Icon
          name="angle-left"
          size={20}
          color="#a2a2db"
          style={{paddingLeft: 20}}
        />
        <Icon name="folder" size={24} color="#a2a2db" />
        <Icon name="star" size={24} color="#a2a2db" />
        <Icon name="inbox" size={24} color="#CD5C5C" />
        <Icon name="history" size={24} color="#a2a2db" />
        <Icon name="calendar" size={24} color="#a2a2db" />
        <Icon
          name="angle-right"
          size={20}
          color="#a2a2db"
          style={{paddingRight: 20}}
        />
      </View>
      <View style={styles.bottom} />
    </View>
  );
};

export default SliderIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  bottom: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingTop: 10,
  },
});
