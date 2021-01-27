const agSender = require('unifiedpush-node-sender');

const sender = async (pushConfig, text, alias) => {
  const message = {
    alert: text,
  };

  if (alias === undefined) {
    console.log('alias is undefined');
  }

  const options = {
    config: {
      ttl: 3600,
    },
    criteria: {
      alias: alias === undefined ? undefined : [alias],
    },
  };

  agSender(pushConfig).then((client) => {
    client.sender
      .send(message, options)
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  });
};

module.exports = {
  sender,
};
