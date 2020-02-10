# HelloWorld WebPush

The _HelloWorld WebPush_ project demonstrates how to include basic WebPush functionality in React applications using the AeroGear Push SDK.
                         
This simple project consists of a ready-to-run React application. To make the application work, you need to have an 
_UnifiedPush Server_ up and running with a configured _WebPush variant_. 

When the application is started it will ask you to configure the details of you connection:
* Unified Push Server URL: the URL of your UPS instance
* Variant ID: The ID of a WebPush Variant configured into the UPS
* Variant Secret: the secret of the WEbPush Variant identified by the _Variant ID_
* AppServerKey: the VAPID public key

A button is provided to **register/unregister** from UPS.

## How do I run it?

### Prerequisites

The React application needs _node.js_ to run so first you'll need to install [node](http://nodejs.org/download/).

### Run the application

Move into the application folder and issue the following command:

```bash
$ npm install && npm start
```

If everything goes well, a web application will popup (usually at `http://localhost:3000`) asking for the configuration.