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
              pushServerURL: "http://10.1.10.51:9999/",
              ios: {
                variantID: "91c039f9-d657-49cd-b507-cb78bea786e3",
                variantSecret: "4b7fd0b4-58b5-46e8-80ef-08a6b8d449cd"
              }, 
              android: {
	             senderID: "557802659713",
		    variantID: "c046f7b6-cf86-4ae6-9eb0-bb39104ea38b",
		    variantSecret: "4907e063-cd39-477f-8938-2d817eabff97"
             }
            }).then(
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
