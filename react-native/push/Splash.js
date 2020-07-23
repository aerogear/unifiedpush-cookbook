import React, { Component } from 'react';
import { Image, View,  Text,StatusBar } from 'react-native';
import RnUnifiedPush from '@aerogear/aerogear-reactnative-push';

export default class Splash extends Component {


  render() {
    return (//`require('./path/to/image.png')`

      <View style={{
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <Image source={require('./img/splash.png')} resizeMode="contain"
          style={{ width:250, height:80 }} />
        <Text style={{fontSize:20, fontWeight:"bold",paddingTop:10}}>
          UnifiedPush HelloWorld
        </Text>
      </View>
    );
  }
}
