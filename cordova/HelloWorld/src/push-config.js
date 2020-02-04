export let push_config = {
    url: 'http://192.168.1.187:9999',  // change this to your UPS URL
        android: { // your variant platform (android, ios or webpush)
    senderID: '881192658444',  // Your senderID as you see it in your Firebase Console
        variantID: '172bf953-f266-4e32-866b-662ff32d653c', // The id of the variant you created
        variantSecret: '7680585e-c22e-4105-b0fc-fbcb150036d4' // the secret of the variant you created
},
    ios: {
        variantID: '285b34f5-869d-449c-be3c-ecd68675c91e', // The id of the variant you created
            variantSecret: 'f15914b4-31f6-4ff3-bd39-bbf01bc4c9df' // the secret of the variant you created
    }
};