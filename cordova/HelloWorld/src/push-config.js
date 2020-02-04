export let push_config = {
    url: 'http://YOUR.UPS.URL:PORT',  // change this to your UPS URL
    android: { // your variant platform (android, ios or webpush)
        senderID: 'YOUR-SENDER_ID',  // Your senderID as you see it in your Firebase Console
        variantID: 'YOUR-VARIANT-ID', // The id of the variant you created
        variantSecret: 'YOUR-VARIANT-SECRET' // the secret of the variant you created
    },
    ios: {
        variantID: 'YOUR-VARIANT-ID', // The id of the variant you created
        variantSecret: 'YOUR-VARIANT-SECRET' // the secret of the variant you created
    }
};