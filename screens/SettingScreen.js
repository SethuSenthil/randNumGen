
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, AsyncStorage,Linking, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements'

import { Accelerometer } from 'expo-sensors';

import { updateMaxMaxNumber } from './RandNumScreen';
import { updateMinMinNumber } from './RandNumScreen';
import { updateRandomOrg } from './RandNumScreen';
import { randNumScreenReset } from './RandNumScreen';

export default class SettingScreen extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {randomorg:null,maxMaxNumber:null, minMinNumber:null};
    }

    componentWillMount = () =>{
        //Get the previous value of the random.org button and updated the state accordingly
        AsyncStorage.getItem('randomorg').then((val)=>{
            //Defaults to true
            if(val && val==="false")
                this.setState({randomorg:false})
            else
                this.setState({randomorg:true})
        })
        AsyncStorage.getItem('maxMaxNumber').then((val)=>{
            if(val&&Number(val))
                this.setState({maxMaxNumber:val.toString()})
            else
                this.setState({maxMaxNumber:"10"})   //Default to 10
        })
        AsyncStorage.getItem('minMinNumber').then((val)=>{
            if(val&&Number(val))
                this.setState({minMinNumber:val.toString()})
            else
                this.setState({minMinNumber:"0"})   //Default to 0
        })
    }

    switchValueUpdated = (val) =>{
        //Save value for next app launch
        AsyncStorage.setItem('randomorg',val.toString())
        this.setState({
            randomorg:val
        })
        //Call global function to update RandNumScreen
        updateRandomOrg(val)
    }

    setMaxMaxNumber = (val) =>{
        val = val.nativeEvent.text
        if(val.trim()!=""&&Number(val)!=NaN){
            if(Number(val)>this.state.minMinNumber){
                //Save value for next app launch
                AsyncStorage.setItem('maxMaxNumber',val.toString())
                this.setState({
                    maxMaxNumber: val,
                    maxMaxNumberError: false
                })
                //Call global function to update RandNumScreen
                updateMaxMaxNumber(val)
            }else{
                Alert.alert("Maximum can not be less than or equal Minimum")
                this.setState({
                    maxMaxNumberError: true
                })
            }
        }else{
            this.setState({
                maxMaxNumberError: true
            })
        }
    }

    setMinMinNumber = (val) =>{
        val = val.nativeEvent.text
        if(val.trim()!=""&&Number(val)!=NaN){
            if(Number(val)<this.state.maxMaxNumber){
                //Save value for next app launch
                AsyncStorage.setItem('minMinNumber',val.toString())
                this.setState({
                    minMinNumber: val,
                    minMinNumberError: false
                })
                //Call global function to update RandNumScreen
                updateMinMinNumber(val)
            }else{
                Alert.alert("Minimum can not be greater than or equal to Maximum")
                this.setState({
                    minMinNumberError: true
                })
            }
        }else{
            this.setState({
                minMinNumberError: true
            })
        }
    }

    reset = () =>{
        AsyncStorage.clear();
        this.componentWillMount();
        randNumScreenReset()
        Alert.alert("Defaults restored")
    }
  
    render() {
        return (
            <ScrollView>
                <View style={{height:40}}></View>
                <Text style={{fontSize:20}}>Random Number</Text>
                <ListItem
                    title="Maximum"
                    subtitle="The highest number the slider can obtain"
                    leftIcon={{ name: "web" , type: 'material-community' }}
                    topDivider
                    bottomDivider
                    input={{
                        editable: this.state.maxMaxNumber!=null,
                        placeholder:this.state.maxMaxNumber,
                        keyboardType:"numeric",
                        inputStyle:{
                            borderColor: this.state.maxMaxNumberError? "red" : "grey", 
                            borderWidth: 6, 
                            borderRadius: 80,
                            textAlign: 'center',
                        },
                        onEndEditing:this.setMaxMaxNumber,
                    }}
                />
                <ListItem
                    title="Minimum"
                    subtitle="The lowest number the slider can obtain"
                    leftIcon={{ name: "web" , type: 'material-community' }}
                    topDivider
                    bottomDivider
                    input={{
                        editable: this.state.minMinNumber!=null,
                        placeholder:this.state.minMinNumber,
                        keyboardType:"numeric",
                        inputStyle:{
                            borderColor: this.state.minMinNumberError? "red" : "grey", 
                            borderWidth: 2, 
                            borderRadius: 70,
                            textAlign: 'center',
                        },
                        onEndEditing:this.setMinMinNumber,
                    }}
                />
                <View style={{height:40}}></View>
                <Text style={{fontSize:20}}>General</Text>
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
                <ListItem
                    title="Reset"
                    subtitle="Reset all values back to default"
                    leftIcon={{ name: "web" , type: 'material-community' }}
                    topDivider
                    bottomDivider
                    onPress={this.reset}
                />
                <Text style={{fontSize:70,paddingHorizontal:30}}><Text style={{color: 'red',textDecorationLine: 'underline'}} onPress={()=>Linking.openURL("http://example.com")}>Random.org</Text> is not affliated with this app in anyway.</Text>
                <View style={{height:40}}></View>
            </ScrollView>
        );
    }
  }
