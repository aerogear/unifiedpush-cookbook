import React, { Component } from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

import { Image, View, NativeEventEmitter, NativeModules, Text } from 'react-native';
import RnUnifiedPush from '@aerogear/aerogear-reactnative-push';

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.onRegister=props.onRegister;
  }

  render() {

    RnUnifiedPush.init(
            { 
              alias: 'rn2' ,
              url: 'http://10.0.2.2:9999/',
              senderId: '294932137806',
              variantId: 'b6c16daa-2cd0-4544-9360-2c60fd9227e6',
              secret: 'e8d019ca-c9f5-497a-89ac-9cd37892613f'
            },
            () => {
              console.log("Yay!")
              if(this.onRegister)this.onRegister(); 
            },
            (err) => {
              console.log(err)
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
