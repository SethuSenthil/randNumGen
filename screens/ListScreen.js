
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert} from 'react-native';

import { Accelerometer } from 'expo-sensors';

const diceImgs = [
    require('../assets/dice_1.png'),
    require('../assets/dice_2.png'),
    require('../assets/dice_3.png'),
    require('../assets/dice_4.png'),
    require('../assets/dice_5.png'),
    require('../assets/dice_6.png'),
  ]
  
  const pennyImgs = [
    require('../assets/heads.jpg'),
    require('../assets/tails.gif'),
  ]
  export default class RandNumScreen extends React.Component {
  
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = { number: null, maxNumber:6, minNumber:1, maxMaxNumber: 10,minMinNumber: 1};
      Alert.alert("TEST")
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
  
          if(Math.abs(magnitude-1)>2)
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
        out =  <Image resizeMode='contain' style={{width:"50%"}} source={diceImgs[this.state.number-1]}/>
      }
      if(this.state.maxNumber == 2 && this.state.minNumber == 1&&this.state.number){
        out =  <Image resizeMode='contain' style={{width:"50%"}} source={pennyImgs[this.state.number-1]}/>
      }
      return (
        <View style={{flex:1,justifyContent:'space-around'}}>
  
          <Text style={{fontSize:50,textAlign: 'center'}}>
              {this.state.minNumber} - {this.state.maxNumber}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center',padding: 0, height:"30%"}}>
          {out}
          </View>
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