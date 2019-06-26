import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, AsyncStorage, ActivityIndicator, StatusBar, TouchableOpacity} from 'react-native';

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

export default class RandNumFullScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            number: null,
            loading:true, 
            number: this.props.navigation.getParam('number'),
            maxNumber: this.props.navigation.getParam('maxNumber'),
            minNumber: this.props.navigation.getParam('minNumber'),
            loading:false
        };
    }

    static navigationOptions = { tabBarVisible: false }

    componentWillMount = () =>{
        AsyncStorage.getItem('randomorg').then((val)=>{
            if(val && val=="false")
                this.setState({randomOrg:false})
            else
                this.setState({randomOrg:true})   
        })
    }

    static navigationOptions = ({ navigation }) => {
        return  {
            header: null,
            tabBarVisible: false
        }
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
        let out = <ActivityIndicator size="large"/>
        if(!this.state.loading)
            if(this.state.maxNumber == 6 && this.state.minNumber == 1&&this.state.number){
                out =  <Image resizeMode='contain' style={{width:"50%"}} source={diceImgs[this.state.number-1]}/>
            }else if(this.state.maxNumber == 2 && this.state.minNumber == 1&&this.state.number){
                out =  <Image resizeMode='contain' style={{width:"50%"}} source={pennyImgs[this.state.number-1]}/>
            }else{
                out = <Text adjustsFontSizeToFit style={{fontSize:4000,textAlign: 'center'}}>
                    {this.state.number}
                </Text>
            }
        return (
            <TouchableOpacity style={{flex:1,justifyContent: 'center', alignItems: 'center'}} onPress={()=>this.roll()} disabled={this.state.loading}>
                <StatusBar hidden></StatusBar>
                {out}
            </TouchableOpacity>
        );
    }
  
    roll = () => {
        if(!this.state.loading){
            Vibration.vibrate(10000);
            //Defaults to true
            this.setState({loading:true});
            if(!this.state.randomOrg)
                //Generate random number on device
                this.setState({
                    number:Math.floor(Math.random()*(this.state.maxNumber-this.state.minNumber+1)+this.state.minNumber), 
                    loading:false
                })
            else{
                if(this.state.minNumber!=this.state.maxNumber){
                    //Generate random number using random.org's API
                    fetch("https://www.random.org/integers/?num=1&col=1&base=10&format=plain&rnd=new&min="+this.state.minNumber+"&max="+this.state.maxNumber)
                    .then(res=>{
                        return res.json()
                    })
                    .then(num=>this.setState({
                        number:num,
                        loading:false
                    }))
                    .catch(err=>{
                        this.setState({
                            number:Math.floor(Math.random()*(this.state.maxNumber-this.state.minNumber+1)+this.state.minNumber), 
                            loading:false
                        })
                        Alert.alert("ERROR - Check your connection","This random number will be calculated without Random.org. You can prevent this popup from appearing again by turning off Random.org in the Settings tab")
                    })
                }else{
                    //Don't waste bandwidth by querying random.org if max and min are the same
                    Alert.alert("Your max and min values are the same")
                    this.setState({
                        number: this.state.minNumber, 
                        loading:false
                    })
                }
            }    
            console.log(this.state.minNumber)
            console.log(this.state.maxNumber)
        }
    }
}