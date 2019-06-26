
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, AsyncStorage,Linking} from 'react-native';
import { ListItem } from 'react-native-elements'

import { Accelerometer } from 'expo-sensors';

import { updateMaxMaxNumber } from './RandNumScreen';
  export default class SettingScreen extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {randomorg:null};
    }

    componentWillMount = () =>{
        //Get the previous value of the random.org button and updated the state accordingly
        AsyncStorage.getItem('randomorg').then((val)=>{
            //Defaults to true
            if(val && val=="false")
                this.setState({randomorg:false})
            else
                this.setState({randomorg:true})
        })
        updateMaxMaxNumber(100)
    }

    switchValueUpdated = (newValue) =>{
        this.setState({
            randomorg:newValue
        })
        //Save value for next app launch
        AsyncStorage.setItem('randomorg',newValue.toString())
    }
  
    render() {
      return (
          <View>
                <ListItem
                    title="Use Random.org"
                    subtitle="A tool to generate truly random numbers."
                    leftIcon={{ name: "web" , type: 'material-community' }}
                    topDivider
                    bottomDivider
                    switch={{
                        onValueChange:this.switchValueUpdated,
                        //disable switch until the previously saved value of the switch loads in
                        disabled:this.state.randomorg==null,
                        value:this.state.randomorg,
                    }}
                />
                <Text style={{fontSize:10,paddingHorizontal:10}}><Text style={{color: 'blue',textDecorationLine: 'underline'}} onPress={()=>Linking.openURL("http://random.org")}>Random.org</Text> is not affliated with this app in anyway.</Text>
                <View style={{height:40}}></View>
                <ListItem
                    title="Use Random.org"
                    subtitle="A tool to generate truly random numbers."
                    leftIcon={{ name: "web" , type: 'material-community' }}
                    topDivider
                    bottomDivider
                    switch={{
                        onValueChange:this.switchValueUpdated,
                        //disable switch until the previously saved value of the switch loads in
                        disabled:this.state.randomorg==null,
                        value:this.state.randomorg,
                    }}
                />
            
          </View>
      );
    }
  }