# HelloWorld Push - Cordova

The helloworld project demonstrates how to include basic push functionality in Cordova applications using the AeroGear Cordova Push plug-in.

This simple project consists of a ready-to-build Cordova application. Before building the application, you must register 
the Android or iOS variant of the application with a running AeroGear UnifiedPush Server instance and Google Cloud Messaging 
for Android or Apple Push Notification Service for iOS. The resulting unique IDs and other parameters must then be inserted
 into the application source code. After this is complete, the application can be built and deployed to Android or iOS devices.

When the application is deployed to an Android or iOS device, the push functionality enables the device to register with 
the running AeroGear UnifiedPush Server instance and receive push notifications.

## How do I run it?

### Prerequisites

The Cordova command line tooling is based on node.js so first you'll need to install [node](http://nodejs.org/download/), 
then you can install Cordova by executing:

```bash
npm install -g cordova
```

To deploy on iOS you need to install the ios-deploy package as well

```bash
npm install -g ios-deploy
```

You will also need to have UPS up and running and have a variant for each of the platform you want to test (_ios_ or _android_) 
setup correctly.

#### Configure the app

In src/push-config.js change *url* with the url of your AeroGear UnifiedPush Server instance. You also need to change 
*senderID*, *variantID* and *variantSecret* with the values assigned by _UnifiedPush Server_ and Firebase:

```javascript
export let push_config = {
   url: '<pushServerURL e.g http(s)//host:port/context >',
   android: {
      senderID: '<senderID as you read it into you firebase account>',
      variantID: '<variantID e.g. 1234456-234320>',
      variantSecret: '<variantSecret e.g. 1234456-234320>'
   },
   ios: {
      variantID: '<variantID e.g. 1234456-234320>',
      variantSecret: '<variantSecret e.g. 1234456-234320>'
   }
}
```

*Note:* You can also copy/paste these settings from your AeroGear UnifiedPush Server console

#### iOS

For iOS you'll need a valid provisioning profile as you will need to test on an actual device (push notification is not 
available when using a simulator). Replace the bundleId with your bundleId (the one associated with your certificate),
by editing the config.xml at the root of this project, change the id attribute of the widget node. After that run 

```bash
cordova platform add ios
``` 

If you want to change your bundleId later on, you will still have to remove (`cordova platform remove ios`) and re-add 
the ios platform to change the Xcode project template.

#### Android

To deploy and run Cordova applications on Android the Android SDK needs to be installed and you need a va;od _Firebase 
Cloud Messaging_ project setup.

Some steps needs to be performed before you can successfully run the app:

1. Change the package name inside the `config.xml` to make it match your _Firebase Cloud Messaging configuration_ (the `id` 
attribute of the `widget` tag)
2. Add the `android` platform:
    ```bash
    cordova platform add android
    ```
3. Download the `google-services.json` file and put it into the `platforms/android/app` folder

### Run the application

On android, the application can be run either on the emulator or a real device.
To run into an emulator, issue:

```bash
cordova emulate android
```

*Note:* An emulator must be already up and running before you issue the `cordova emulate` command.

On iOS a real device is required since push notifications are not supported by the simulator.
To run the app on a real device issue:

```bash
cordova run ios
``` 

to run on _iOS device_ or

```bash
cordova run android
```

to run on an _Android device_

If the application is correctly running, you should just see a message that says that no push messages have been received 
so far. You can now go to the UPS console and send messages to your variant: they will immediately appear in the app.