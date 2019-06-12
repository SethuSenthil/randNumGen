import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert} from 'react-native';

import RNShake from 'react-native-shake';
import { ShakeEventExpo } from './ShakeEventExpo';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { number: null, maxNumber:6, minNumber:1, maxMaxNumber: 100,minMinNumber: 1};
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      accelerometerData => {
        let magnitude = Math.pow(  Math.pow(accelerometerData.x, 2) + Math.pow(accelerometerData.y, 2) + Math.pow(accelerometerData.z, 2)  ,.5)

        if(Math.abs(this.state.magnitude-1)>1.5)
          this.roll();
      }
    ); 
    Accelerometer.setUpdateInterval(
      16
    ); 
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove(); 
    this._subscription = null;
  };

  render() {
    var out = <Text style={{fontSize:200,textAlign: 'center'}}>
    {this.state.number}
  </Text>;
    if(this.state.maxNumber == 6 && this.state.minNumber == 1&&this.state.number){
      out =  <Image source={require('/assets/dice_'+this.state.number+'.png')}
    />
    }
    return (
      <View style={{flex:1,justifyContent:'space-around'}}>

        <Text style={{fontSize:50,textAlign: 'center'}}>
            {this.state.minNumber} - {this.state.maxNumber}
          </Text>
        {out}
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

