self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('push', event => {
  const msg_chan = new MessageChannel();
  event.waitUntil(
    self.clients.matchAll().then(clientList => {
      if (clientList.length === 0) {
        return self.registration.showNotification(data);
      } else {
        clientList.forEach(client => {
          client.postMessage(event.data.text(), [msg_chan.port2]);
        });
      }
    })
  );
});