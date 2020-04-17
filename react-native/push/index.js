/**
 * @format
 */

import {AppRegistry, NativeEventEmitter,NativeModules,RCTNativeAppEventEmitter, HMRClient,RCTDeviceEmitter} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


const eventEmitter = new NativeEventEmitter(NativeModules.RnUnifiedPush);
this.eventListener = eventEmitter.addListener('onDefaultMessage', (event) => {
    console.log("You have receieved a push message." + JSON.stringify(event));
 });

AppRegistry.registerComponent(appName, () => App);
