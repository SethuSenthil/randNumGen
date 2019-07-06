
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, AsyncStorage, ActivityIndicator, TouchableOpacity} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
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

const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };

export function updateMaxMaxNumber(val){
    this.setState({maxMaxNumber:val})
}
export function updateMinMinNumber(val){
    this.setState({minMinNumber:val})
}
export function updateRandomOrg(val){
    this.setState({randomOrg:val})
}
export function randNumScreenReset(){
    this.componentWillMount();
}

export default class RandNumScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {number: null,loading:true};
        updateMaxMaxNumber = updateMaxMaxNumber.bind(this);
        updateMinMinNumber = updateMinMinNumber.bind(this);
        updateRandomOrg = updateRandomOrg.bind(this)
        randNumScreenReset = randNumScreenReset.bind(this)
    }

    static navigationOptions = {
        header: null,
        tabBarVisible: false
    }
  
    componentWillMount = () =>{
        //Run all the storage resolution asynchronously for faster load times
        let randomOrgPromise = AsyncStorage.getItem('randomorg').then((val)=>{
            if(val && val=="false")
                this.setState({randomOrg:false})
            else
                this.setState({randomOrg:true})   
        })
        let maxMaxNumberPromise = AsyncStorage.getItem('maxMaxNumber').then((val)=>{
            if(val&&Number(val)!=NaN)
                this.setState({maxMaxNumber:Number(val)})
            else
                this.setState({maxMaxNumber:10})   //Default to 10
        })
        let minMinNumberPromise = AsyncStorage.getItem('minMinNumber').then((val)=>{
            if(val&&Number(val)!=NaN)
                this.setState({minMinNumber:Number(val)})
            else
                this.setState({minMinNumber:0})   //Default to 0
        })
        let maxNumberPromise = AsyncStorage.getItem('maxNumber').then((val)=>{
            if(val&&Number(val)!=NaN)
                this.setState({maxNumber:Number(val)})
            else
                this.setState({maxNumber:6})   //Default to 6
        })
        let minNumberPromise = AsyncStorage.getItem('minNumber').then((val)=>{
            if(val&&Number(val)!=NaN)
                this.setState({minNumber:Number(val)})
            else
                this.setState({minNumber:1})   //Default to 1
        })
        //Stop loading once all the permenantly stored information is resolved
        Promise.all([randomOrgPromise,maxMaxNumberPromise,minMinNumberPromise,maxNumberPromise,minNumberPromise]).then(values => {
            this.setState({loading:false}) 
        });
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
        Alert.alert("BYE")
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

    setMinNumber = (val) => {
        AsyncStorage.setItem('minNumber',val.toString())
        this.setState({minNumber: val})
    }

    setMaxNumber = (val) => {
        AsyncStorage.setItem('maxNumber',val.toString())
        this.setState({maxNumber: val})
    }
  
    render() {
        var out = <Text adjustsFontSizeToFit style={{fontSize:400,textAlign: 'center'}}>
            {this.state.number}
        </Text>;
        if(this.state.maxNumber == 6 && this.state.minNumber == 1&&this.state.number){
            out =  <Image resizeMode='contain' style={{width:"50%"}} source={diceImgs[this.state.number-1]}/>
        }else if(this.state.maxNumber == 2 && this.state.minNumber == 1&&this.state.number){
            out =  <Image resizeMode='contain' style={{width:"50%"}} source={pennyImgs[this.state.number-1]}/>
        }
        if(this.state.loading)
            out = <ActivityIndicator size="large"/>
        return (
            <View style={{flex:1,justifyContent:'space-around'}}>
    
                <Text style={{fontSize:50,textAlign: 'center'}}>
                    {this.state.minNumber} - {this.state.maxNumber}
                </Text>
                <TouchableOpacity onPress={()=>this.roll()} style={{justifyContent: 'center', alignItems: 'center',padding: 0, height:"30%"}} disabled={this.state.loading}>
                    {out}
                </TouchableOpacity>
                <View style={{padding: 20}}>
                    <Button
                        title = "Get Random Number"
                        onPress={this.roll}
                        disabled={this.state.loading}
                    />
                    <Text style={{textAlign: 'center',marginTop: 30}}>
                    Max
                    </Text>
                    <Slider
                        disabled={this.state.maxMaxNumber==null}
                        step={1}
                        minimumValue={this.state.minNumber}
                        maximumValue={this.state.maxMaxNumber}
                        onValueChange={this.setMaxNumber}
                        value={this.state.maxNumber}
                    />
    
                    <Text style={{textAlign: 'center'}}>
                    Min
                    </Text>
                    <Slider
                        disabled={this.state.minMinNumber==null}
                        step={1}
                        minimumValue={this.state.minMinNumber}
                        maximumValue={this.state.maxNumber}
                        onValueChange={this.setMinNumber}
                        value={this.state.minNumber}
                    />
                    <Button title="Fullscreen" onPress={()=>this.props.navigation.navigate('FullScreen',{number:this.state.number,minNumber:this.state.minNumber,maxNumber:this.state.maxNumber})}/>
                </View>
            </View>
        );
    }
  
    roll = () => {
        if(!this.state.loading){
            //Vibration.vibrate(10000);
            ReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
            //Defaults to true
            this.setState({loading:true});
            if(!this.state.randomOrg){
                //Generate random number on device
                ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions);
                this.setState({
                    number:Math.floor(Math.random()*(this.state.maxNumber-this.state.minNumber+1)+this.state.minNumber), 
                    loading:false
                })
            }else{
                if(this.state.minNumber!=this.state.maxNumber){
                    //Generate random number using random.org's API
                    fetch("https://www.random.org/integers/?num=1&col=1&base=10&format=plain&rnd=new&min="+this.state.minNumber+"&max="+this.state.maxNumber)
                    .then(res=>{
                        return res.json()
                    })
                    .then(num=>{
                        ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions);
                        this.setState({
                            number:num,
                            loading:false
                        })
                    })
                    .catch(err=>{
                        this.setState({
                            number:Math.floor(Math.random()*(this.state.maxNumber-this.state.minNumber+1)+this.state.minNumber), 
                            loading:false
                        })
                        Alert.alert("ERROR - Check your connection","This random number will be calculated without Random.org. You can prevent this popup from appearing again by turning off Random.org in the Settings tab")
                    })
                }else{
                    //Don't waste bandwidth by querying random.org if max and min are the same
                    ReactNativeHapticFeedback.trigger("impactHeavy", hapticOptions);
                    Alert.alert("Your max and min values are the same")
                    this.setState({
                        number: this.state.minNumber, 
                        loading:false
                    })
                }
            }    
        }
    }
}