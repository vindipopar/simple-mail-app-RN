import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Speedometer from 'react-native-speedometer-chart';

class AdminScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.dateUpdate}>Last Updated 04/07/2020 10:40</Text>
        <View style={styles.containerSpidometer}>
          <Speedometer
            value={3284}
            totalValue={4000}
            size={200}
            outerColor="#d3d3d3"
            internalColor="#ff0000"
            percentSize={0.9}
            showText
            text="3284 of 4000(MB)"
            textStyle={{fontSize: 15, color: 'red', marginBottom: 20}}
            showLabels
          />
          <Text style={styles.text}>
            INTERNET
          </Text>
        </View>
        <View style={styles.containerSpidometer}>
          <Speedometer
            value={500}
            totalValue={600}
            size={200}
            outerColor="#d3d3d3"
            internalColor="yellow"
            percentSize={0.9}
            showText
            text="600 of 500(MIN)"
            textStyle={{fontSize: 15, color: '#D2B55B', marginBottom: 20}}
            showLabels
          />
          <Text style={styles.text}>TELENOR MINS</Text>
        </View>
        <View style={styles.containerSpidometer}>
          <Speedometer
            value={1474}
            totalValue={1536}
            size={200}
            outerColor="#d3d3d3"
            internalColor="#73B504"
            percentSize={0.9}
            showText
            text="1474 of 1536(MIN)"
            textStyle={{fontSize: 15, color: '#73B504', marginBottom: 20}}
            showLabels
          />
          <Text style={styles.text}>
            SOCIAIL(MBs)
          </Text>
        </View>
      </View>
    );
  }
}

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateUpdate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
  containerSpidometer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
