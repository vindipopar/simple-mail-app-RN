import React, {Component} from 'react';
import {Button, Text, View, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import {FlatList} from 'react-native-gesture-handler';
import DATA_MESSAGE from '../data/DATA_MESSAGE';

class EmailMessage extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      isShow: 'false',
      counter: 0,
      data: [],
      show: false,
    };
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    const interval = setInterval(() => {
      this.onGetData()
    }, 100);
    return () => clearInterval(interval);
  }

  onGetData = async () => {
    try {
      let msgs = await AsyncStorage.getItem('messages');
      if (msgs === null) {
        await this.setState({data: DATA_MESSAGE});
        await AsyncStorage.setItem('messages', JSON.stringify(DATA_MESSAGE));
      } else {
        let data = JSON.parse(msgs);
        this.setState({data});
      }
    } catch (e) {
      console.log(e);
    }
  };

  onDeleteItem = async () => {
    let data = this.state.data.filter((v) => v.id !== this.state.id);
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(data));
      this.onGetData();
    } catch (e) {
      console.log(e);
    }
  };

  onFavoriteItem = async () => {
    let data = this.state.data;
    let item = data.splice(
      data.findIndex((v) => v.id === this.state.id),
      1,
    );
    item[0].favorite = !item[0].favorite;

    if (item[0].favorite) {
      data.unshift(item[0]);
    } else {
      data.push(item[0]);
    }
    console.log(data);

    try {
      await AsyncStorage.setItem('messages', JSON.stringify(data));
      this.onGetData();
    } catch (e) {
      console.log(e);
    }
  };

  show = async (id) => {
    let data = this.state.data;
    for (let i in data) {
      if (data[i].id === id) {
        data[i].show = !data[i].show;
        break;
      }
    }

    this.setState({data});
  };

  _renderData = ({item}) => {
    return (
      <View>
        {item !== null ? (
          <Swipeout
            right={[
              {
                component: (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}>
                    <Icon name="trash" size={30} color="white" />
                  </View>
                ),
                onPress: () => this.onDeleteItem(),
                backgroundColor: '#CD5C5C',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              },
            ]}
            left={[
              {
                component: (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}>
                    <Icon
                      name="star"
                      size={30}
                      color={item.favorite ? 'yellow' : 'white'}
                    />
                  </View>
                ),
                backgroundColor: '#E3B778',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => this.onFavoriteItem(),
              },
            ]}
            onOpen={() => this.setState({id: item.id})}
            autoClose="true"
            backgroundColor="transparent">
            <TouchableOpacity
              onPress={() => this.show(item.id)}
              style={{
                backgroundColor: 'white',
                height: 120,
                width: 400,
                borderRadius: 5,
                marginRight: 10,
                paddingTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: -15,
                  paddingHorizontal: 20,
                  flex: 1,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Image
                    source={require('../assets/images/alami.png')}
                    style={{width: 35, height: 35}}
                  />
                  <Icon
                    name="ellipsis-v"
                    size={30}
                    style={{paddingTop: 20, paddingLeft: 14, color: 'grey'}}
                  />
                </View>

                <View
                  style={{flexDirection: 'column', flex: 1, paddingLeft: 20}}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{color: 'grey', fontWeight: 'bold', fontSize: 14}}>
                      {item.name}
                    </Text>
                    <Text style={{color: 'grey'}}>{item.date}</Text>
                  </View>
                  <Text
                    style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                    {item.subject}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{color: 'grey', paddingRight: 20, paddingTop: 5, paddingBottom: 10}}>
                    {item.message}
                  </Text>
                  {item.show ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 30
                      }}>
                                <Icon name="forward" size={18} color="#a2a2db" />
                                <Icon name="reply" size={18} color="#a2a2db" />
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          </Swipeout>
        ) : (
          <View>
            <Text>Belum ada Inbox</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <>
        <FlatList data={this.state.data} renderItem={this._renderData} />
      </>
    );
  }
}

export default EmailMessage;
