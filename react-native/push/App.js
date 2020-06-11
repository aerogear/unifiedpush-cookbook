import React, { Component } from 'react';
import  Notifications  from './Notifications';
import 'react-native-gesture-handler';
import Splash from './Splash';
import Registration from './Registration';
import { Provider as PaperProvider, Appbar, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import RNUnifiedPush from '@aerogear/aerogear-reactnative-push';

const ups = new RNUnifiedPush();
let callback = (message)=>{
  console.log("You have receieved a background push message." + JSON.stringify(message));
};

ups.registerMessageHandler(callback);

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={registered:false, showSplash:true, messages:[]};

    this.theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'orange',

      },
    };
       ups.registerMessageHandler(message => this.setState({messages: [...this.state.messages, message] });    

  }

  componentDidMount() {
    setTimeout(()=>{this.setState({...this.state, showSplash:false})}, 3000)
  }
  
componentWillUnmount() {
  this.setState({registered:false, showSplash:true, messages:[]})
}

  render() {try {
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

  } catch (ignore) {
    console.log(ignore);
    return <Splash/>
  }
}
}
