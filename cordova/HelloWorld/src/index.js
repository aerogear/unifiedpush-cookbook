/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { PushRegistration } from '@aerogear/push';
import { push_config } from './push-config';

var app = {
  // Application Constructor
  initialize: function() {
    console.log('INIT');
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    this.registerToUPS();

    PushRegistration.onMessageReceived((notification => {
      console.log('Received push notification: ', notification.message);
      document.getElementById('nothing').style.display = 'none';
      app.addMessage(notification.message);
    }));
  },

  registerToUPS: () => {
    console.log('Registering...');
    new PushRegistration(push_config)
    .register()
    .then(() => {
      console.log('Registered!');
      app.ready();
      if (document.getElementById("messages").childElementCount === 0) {
        document.getElementById("nothing").style.display = 'block';
      }
    })
    .catch(error => {
      app.ready();
      console.log('Failed: ', error.message, JSON.stringify(error));
      app.addMessage('error registering ' + error);
    });
  },

  addMessage: (message) => {
    const messages = document.getElementById("messages"),
        element = document.createElement("li");
    //for ui testing add an id for easy (fast) selecting
    element.setAttribute("id", "message" + (messages.childElementCount + 1));
    messages.appendChild(element);
    element.innerHTML = message;
  },

  ready: () => {
    const waiting = document.getElementById("waiting");
    waiting.style.display = 'none';
  }
};

app.initialize();
