import React, { Component } from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

import { Image, View, NativeEventEmitter, NativeModules, Text } from 'react-native';
import RNUnifiedPush from '@aerogear/aerogear-reactnative-push';
import pushConfig from './push-config.json';

const ups = new RNUnifiedPush();

export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.onRegister=props.onRegister;
  }

  render() {

    ups.init(pushConfig).then(
            () => {
              return ups.register({
                "alias":"summersgetserious",
                "categories":["cat1", "cat2"]
              })
            }).then(()=>{
              if(this.onRegister)this.onRegister();
            }).catch(
            (err) => {
              console.log("Err 2", err)
            });

    return (

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
