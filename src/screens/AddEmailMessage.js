import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  AsyncStorage,
} from 'react-native';

class AddEmailMessage extends Component {
  state = {
    name: '',
    subject: '',
    message: '',
  };
  handleFrom = (text) => {
    this.setState({name: text});
  };
  handleSubject = (text) => {
    this.setState({subject: text});
  };
  handleMessage = (text) => {
    this.setState({message: text});
  };
  sendMessage = async (name, subject, message) => {
    let date = new Date();
    let dateFormat =
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    try {
      let data = await AsyncStorage.getItem('messages');
      let msgs = data !== null ? JSON.parse(data) : [];
      let id;
      for (var i in msgs) {
        let arr = [];
        arr.push(msgs[i].id);
        arr.sort((a, b) => a - b);
        id = arr[arr.length - 1] + 1;
      }
      if (id === undefined) {
        id = 1;
      }

      let item = {
        id,
        name,
        subject,
        message,
        show: false,
        favorite: false,
        date: dateFormat,
      };

      msgs.push(item);
      await AsyncStorage.setItem('messages', JSON.stringify(msgs));
      this.props.navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const {name, message, subject} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/alami.png')}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="From"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          maxLength={25}
          onChangeText={this.handleFrom}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Subject"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          maxLength={50}
          onChangeText={this.handleSubject}
        />

        <TextInput
          style={styles.inputMessage}
          underlineColorAndroid="transparent"
          placeholder="Message"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          multiline={true}
          onChangeText={this.handleMessage}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.sendMessage(name, subject, message)}>
          <Text style={styles.submitButtonText}> Send </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default AddEmailMessage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#a2a2db',
    borderWidth: 1,
  },
  inputMessage: {
    margin: 15,
    height: 140,
    borderColor: '#a2a2db',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#a2a2db',
    padding: 10,
    margin: 15,
    height: 40,
    width: 100,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
