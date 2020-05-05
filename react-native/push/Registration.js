import React, { Component } from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

import { Image, View, NativeEventEmitter, NativeModules, Text } from 'react-native';
import RNUnifiedPush from '@aerogear/aerogear-reactnative-push';

const ups = new RNUnifiedPush();

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.onRegister=props.onRegister;
  }

  render() {

    ups.init(
            { 
              alias: 'reactNative' ,
              url: 'http://10.1.10.51:9999/',
              variantId: '91c039f9-d657-49cd-b507-cb78bea786e3',
              secret: '4b7fd0b4-58b5-46e8-80ef-08a6b8d449cd'
            },
            () => {
              console.log("Yay!")
              if(this.onRegister)this.onRegister(); 
            },
            (err) => {
              console.log("Err", err)
            });

    return (//`require('./path/to/image.png')`

      <View style={{
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        
        <Text style={{fontSize:20, fontWeight:"bold", flexShrink:1, paddingBottom:10}}>
          Registering
        </Text>
        
        <ProgressBar indeterminate={true} style={{ width:250, height:4 }}/>
        

      </View>
    );
  }
}
