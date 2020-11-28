import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListMessage from '../components/ListMessage';
import SliderIcon from '../components/SliderIcon';

class MailScreen extends Component {
  render() {
    return (
      <>
        <SliderIcon />
        <ListMessage />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddEmailMessage')}
          style={styles.addButton}>
          <Icon name="plus" size={30} color="#a2a2db" />
        </TouchableOpacity>
      </>
    );
  }
}

export default MailScreen;

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1,
    borderColor: '#a2a2db',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
