self.addEventListener('push', event => {
    const data = event.data.text();
    const msg_chan = new MessageChannel();
    clients.matchAll().then(clients => {
        console.log('clients', clients);
        clients.forEach(client => {
            console.log('posting');
            client.postMessage(data, [msg_chan.port2]);
        })
        if (clients.length === 0) {
                self.registration.showNotification(data)
        }
    });
});

self.addEventListener('install', function (event) {
    self.skipWaiting();
});