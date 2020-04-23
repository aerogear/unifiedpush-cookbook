import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View ,NativeEventEmitter,NativeModules} from 'react-native';
import RnUnifiedPush from '@aerogear/aerogear-reactnative-push';

export default class App extends Component<{}> {
  state = {
    status: 'starting',
    message: '--'
  };
  componentDidMount() {
    RnUnifiedPush.init(
      { 
        alias: 'rn' ,
        url: 'http://10.0.2.2:9999/',
        senderId: '294932137806',
        variantId: 'b683ddeb-dc54-41e9-999c-68da4e95ff4b',
        secret: '4aed76dd-61ca-497a-a746-c99555ec5b73'
      },
      () => {
        console.log("Yay!")
        this.setState({
          status: 'registered',
          message: 'registered'
        })
      },
      (err) => {
        console.log(err)
        this.setState({
          status: 'error',
          message: 'error'
        })
      });


      RnUnifiedPush.registerMessageHandler((message)=>{
        console.log("You have receieved a push message." + JSON.stringify(message));
          this.setState({
            status: 'receieved',
            message: JSON.stringify(message)
          })
      });

      const eventEmitter = new NativeEventEmitter(NativeModules.RnUnifiedPush);

      this.eventListener = eventEmitter.addListener('onDefaultMessage', (event) => {
          console.log("You have receieved a push message." + JSON.stringify(event));
          this.setState({
            status: 'registered',
            message: JSON.stringify(event)
          })
       });

  }


  
  render() {



    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆RnUnifiedPush example☆</Text>
        <Text style={styles.instructions}>STATUS: {this.state.status}</Text>
        <Text style={styles.welcome}>☆NATIVE CALLBACK MESSAGE☆</Text>
        <Text style={styles.instructions}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
