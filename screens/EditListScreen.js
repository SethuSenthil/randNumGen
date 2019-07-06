
import * as React from 'react';
import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, FlatList, ImageBackground, Platform, TouchableOpacity} from 'react-native';

import { Accelerometer } from 'expo-sensors';
import { ListItem } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid';

import { Icon } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';

export default class EditListScreen extends React.Component {
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      // this.state = { number: null, maxNumber:6, minNumber:1, maxMaxNumber: 10,minMinNumber: 1};
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("title","Title"),
        }
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
            //subtitle={item.items.length}
            //avatar={{ uri: item.picture.thumbnail }}
        />
    )

    keyExtractor = (item, index) => index.toString()

    openCamera = () =>{
        this.props.navigation.navigate('Camera')
    }
  
    render() {
        const items = [{add:true},
            { name: 'TURQUOISE', img: {uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='} }, { name: 'EMERALD', code: '#2ecc71' },
            { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
            { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
            { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
            { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
            { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
            { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
            { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
            { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
            { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
        ];
        return (
            <FlatGrid
                itemDimension={130}
                items={items}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                // spacing={20}
                renderItem={({ item, index }) => {
                    if(item["add"])
                        return(
                            <TouchableOpacity 
                                style={[styles.itemContainer,{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },{ backgroundColor: item.code }]}
                                onPress={this.openCamera}
                            >
                                <Ionicons   
                                    size={50}
                                    name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                                />
                                <Text>Add</Text>
                            </TouchableOpacity>
                        )
                    if(item["img"])
                        return(
                            <ImageBackground 
                                style={[styles.itemContainer, { backgroundColor: item.code }]} 
                                resizeMode="cover"
                                source={item["img"]}
                            >
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>{item.code}</Text>
                            </ImageBackground>
                        )
                    return(
                        <View style={[styles.itemContainer, { backgroundColor: item.code }]} >
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemCode}>{item.code}</Text>
                        </View>
                    )

                }}
            />
        );
    }
}
      
      const styles = StyleSheet.create({
        gridView: {
          flex: 1,
        },
        itemContainer: {
          justifyContent: 'flex-end',
          borderRadius: 5,
          padding: 10,
          height: 150,
        },
        itemName: {
          fontSize: 16,
          color: '#fff',
          fontWeight: '600',
        },
        itemCode: {
          fontWeight: '600',
          fontSize: 12,
          color: '#fff',
        },
      });