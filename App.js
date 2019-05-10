import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration } from 'react-native';

import RNShake from 'react-native-shake';
import { ShakeEventExpo } from './ShakeEventExpo';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { number: null, maxNumber:6, minNumber:1, maxMaxNumber: 100,minMinNumber: 1};
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      // Your code...
      this.roll()
    });
    ShakeEventExpo.addListener(() => {
      Alert.alert('Shaking!!!');
      this.roll()
    });
  }
 
  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
    ShakeEventExpo.removeListener();
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'space-around'}}>

        <Text style={{fontSize:50,textAlign: 'center'}}>
            {this.state.minNumber} - {this.state.maxNumber}
          </Text>
        <Text style={{fontSize:200,textAlign: 'center'}}>
          {this.state.number}
        </Text>
        <View style={{padding: 20}}>
                <Button
                title = "Roll"
                onPress={this.roll}
                />
          <Text style={{textAlign: 'center',marginTop: 30}}>
            Max
          </Text>
                  <Slider
            step={1}
            minimumValue={this.state.minNumber}
            maximumValue={this.state.maxMaxNumber}
            onValueChange={(value)=>{this.setState({maxNumber: value})}}
            value={this.state.maxNumber}
          />

          <Text style={{textAlign: 'center'}}>
            Min
          </Text>
                  <Slider
            step={1}
            minimumValue={this.state.minMinNumber}
            maximumValue={this.state.maxNumber}
            onValueChange={(value)=>{this.setState({minNumber: value})}}
            value={this.state.minNumber}
          />
        </View>
      </View>
    );
  }

  roll = () => {
    Vibration.vibrate(10000);
      this.setState({number:Math.floor(Math.random()*(this.state.maxNumber-this.state.minNumber+1)+this.state.minNumber)})
  }
}

