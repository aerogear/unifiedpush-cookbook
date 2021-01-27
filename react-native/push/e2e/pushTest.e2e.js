import axios from 'axios';
const {device, expect, element, by, waitFor} = require('detox');
const {sender} = require('./sender.js');

import {promisify} from 'util';
import {exec as execAsync} from 'child_process';
const exec = promisify(execAsync);

describe(':android: push e2e test', () => {
  let upsNamespace;
  let upsUrl;
  let pushApplicationID;
  let masterSecret;

  it('Get ups details', async () => {
    if (process.env.DOCKER_COMPOSE !== 'true') {
      const output = await exec(
        "oc get projects | grep -m1 redhat-rhmi-ups | awk '{print $1}'",
      );

      upsNamespace = output.stdout.trim();
      const routeOutput = await exec(
        `oc get routes -n ${upsNamespace} | grep unifiedpush | awk '{print $2}'`,
      );
      upsUrl = `http://${routeOutput.stdout.trim()}`;
    } else {
      upsUrl = process.env.UPS_URL;
    }

    const applications = await axios({
      method: 'GET',
      url: `${upsUrl}/rest/applications`,
    });

    let application = applications.data.find((app) => app.name === 'test');
    pushApplicationID = application.pushApplicationID;
    masterSecret = application.masterSecret;
  });

  it('should have welcome screen', async () => {
    await device.launchApp({
      launchArgs: {
        detoxDebugVisibility: 'YES',
      },
    });
    await expect(element(by.id('HelloWorld'))).toBeVisible();
  });

  it('should register and show no notifications', async () => {
    await waitFor(element(by.id('registering'))).toBeVisible();

    await waitFor(element(by.id('nothing')))
      .toBeVisible()
      .withTimeout(30000);
    await expect(element(by.id('nothing'))).toHaveText('Nothing here yet!');
    await waitFor(element(by.id('list')))
      .toNotExist()
      .withTimeout(30000);
  });

  it('should receive Alias notification', async () => {
    // send test notification
    await sender(
      {
        url: upsUrl,
        applicationId: pushApplicationID,
        masterSecret,
      },
      'Notification with alias!',
      'summersgetserious',
    );

    await waitFor(element(by.id('list')))
      .toExist()
      .withTimeout(30000);
    await waitFor(element(by.text('Notification with alias!')))
      .toExist()
      .withTimeout(30000);
  });

  it('Take screenshot', async () => {
    await device.takeScreenshot('test done');
  });
});
