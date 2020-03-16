const wd = require('wd');
const assert = require('assert');
const { Before, Given, When, Then, After } = require('cucumber');

const PORT = 4723;

const config = {
  platformName: 'Android',
  deviceName: 'pixel_2',
  app: './android/app/build/outputs/apk/debug/app-debug.apk', // relative to root of project
  appPackage: 'com.nativebasekitchensink',
  appActivity: '.MainActivity',
  automationName: 'uiautomator2' 
};
const driver = wd.promiseChainRemote('localhost', PORT);

Before({timeout: 50000}, async () => {
  await driver.init(config);
  await driver.sleep(6000); // wait for app to load
});

Given ('I am in app home page', {timeout: 30000}, async () => {
  let isWelcomeMessage = await driver.hasElementByXPath("//*[@text='App to showcase']");
  assert.equal(isWelcomeMessage, true);
});

When ('I click on "Lets Go!" button', async () => {
  let loginButton = await driver.elementByAccessibilityId("button-home");
  loginButton.click();
});

Then ('I see the home page', {timeout: 5000}, async () => {
  await driver.setImplicitWaitTimeout(5000);
  let isAlert = await driver.hasElementByXPath("//*[@text='Header']");
  assert.equal(isAlert, true);
});