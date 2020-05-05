import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeEventEmitter, NativeModules } from 'react-native';
import RnUnifiedPush from '@aerogear/aerogear-reactnative-push';
import { Banner } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';

export default class Notifications extends Component {


    constructor(props) {
        super(props);
        this.FlatListItemSeparator = () => {
            return (
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#000",
                }}
              />
            );
          }
    }

    render() {

        if (!this.props.messages || this.props.messages.length == 0) {

            return (

                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    
                    <Text>Nothing here yet!</Text>
                    <Text>Send notifications from the console</Text>
                </View>


            );

        } else {
            console.log(this.props.messages.map((item)=>{return {key:item}}))
            return <View style={{
                backgroundColor: 'white',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }} >

                <FlatList
                          ItemSeparatorComponent = { this.FlatListItemSeparator }
                    style={{width:"100%"}}
                    data={this.props.messages.map((item)=>{return {key:item}})}
                    renderItem={({ item }) => <Text style={{fontSize:14, paddingBottom:20, paddingTop:20, paddingLeft:16, paddingRight:16, alignContent:"flex-start"}} >{item.key}</Text>}
                />
            </View>

        }
    }
}
