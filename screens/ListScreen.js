
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, FlatList} from 'react-native';

import { Accelerometer } from 'expo-sensors';
import { ListItem } from 'react-native-elements'
import Swipeable from 'react-native-swipeable-row';

export default class ListScreen extends React.Component {
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      // this.state = { number: null, maxNumber:6, minNumber:1, maxMaxNumber: 10,minMinNumber: 1};
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Lists',
            headerRight: (
                <Button
                    onPress={navigation.getParam("addList",()=>{Alert.alert("Whoa! Aren't you in a rush? This button is still loading in.")})}
                    title="ADD"
                />
            ),
        }
    }

    componentWillMount = () =>{
        this.props.navigation.setParams({addList:this.addList})
    }

    addList = () =>{
        this.launchGrid({title:"New List",items:[]})
    }

    renderSeparator = () => {
        return (
            <View 
                style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <View 
                    style={{
                        height: 1, 
                        width: '96%', 
                        backgroundColor: '#C8C8C8', 
                    }}
                />
            </View>
        );
    };

    renderEmptyComponent = () => {
        return (
            <View
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize:25,
                        alignSelf: 'center',
                        paddingVertical:30,
                    }}
                >
                    You dont have any lists
                </Text>
                <Text
                    style={{
                        fontSize:20,
                        alignSelf: 'center',
                    }}
                >
                    You can create one with the add button
                </Text>
            </View>
        );
    };

    renderItem = ({ item }) =>(
        <ListItem
            roundAvatar
            title={item.title}
            onPress={()=>{
                this.launchGrid(item)
            }}
            //subtitle={item.items.length}
            //avatar={{ uri: item.picture.thumbnail }}
        />
    )

    keyExtractor = (item, index) => index.toString()

    launchGrid = (gridObj) => {
        this.props.navigation.navigate('EditList',{title:gridObj["title"],items:gridObj["items"]})
    }
  
    render() {
      return (
        <FlatList
            data={[/*{title: 'a',items:[1,2]}, {title: 'b',items:[1,2]}*/]}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmptyComponent}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
        />
      );
    }
  }