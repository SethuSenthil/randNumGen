import React from 'react';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import { Text, View, StyleSheet, Button, Slider,Vibration, Image, Alert, FlatList, ImageBackground, Platform, TouchableOpacity} from 'react-native';

import { Accelerometer } from 'expo-sensors';
import { ListItem } from 'react-native-elements'
import { FlatGrid } from 'react-native-super-grid';

import { Icon } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      /*this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        };*/
    }

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
      };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}