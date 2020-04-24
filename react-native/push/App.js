import React, { Component } from 'react';
import  Notifications  from './Notifications';
import 'react-native-gesture-handler';
import Splash from './Splash';
import Registration from './Registration';
import { Provider as PaperProvider, Appbar, DefaultTheme } from 'react-native-paper';
import { StatusBar, Text, NativeEventEmitter, NativeModules } from 'react-native';
import RnUnifiedPush from '@aerogear/aerogear-reactnative-push';


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={registered:false, showSplash:true, messages:["test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2","test","Test2"]};

    this.theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'orange',

      },
    };


    this.eventEmitter = new NativeEventEmitter(NativeModules.RnUnifiedPush);

  }

  componentDidMount() {
    setTimeout(()=>{this.setState({...this.state, showSplash:false})}, 3000)
    let callback = (message)=>{
      console.log("You have receieved a push message." + JSON.stringify(message));
      this.setState({
        ...this.state,
        messages:[...this.state.messages, message]
      });
      RnUnifiedPush.registerMessageHandler(callback);
    };

    RnUnifiedPush.registerMessageHandler(callback);

  }
  
  render() {
    let screen = null;
    if (this.state.showSplash) {
      screen = <Splash />;
    } else if (!this.state.registered) {
      screen = <Registration onRegister={()=>{this.setState({registered:true})}} />;
    } else {
      screen = <Notifications messages = {this.state.messages}/>;
    }


    return <PaperProvider theme={this.theme}>
      
      <Appbar.Header>
      <Appbar.Content
        color="white"
          title="UnifiedPush HelloWorld"
        />
        </Appbar.Header>
      {screen}
      <StatusBar backgroundColor="orange"/>
    </PaperProvider>

  }
}

