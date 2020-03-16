const wd = require('wd');
const assert = require('assert');
const { Before, Given, When, Then, After, And } = require('cucumber');

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

Before({ timeout: 50000 }, async () => {
  await driver.init(config);
  await driver.sleep(6000); // wait for app to load
});

After(async () => {
  await driver.quit();
});

Given('I am in page Form & Input', { timeout: 30000 }, async () => {
  await driver.hasElementByXPath("//*[@text='App to showcase']");
  let loginButton = await driver.elementByAccessibilityId("button-home");
  loginButton.click();
  await driver.setImplicitWaitTimeout(5000);
  driver.execute('mobile: scroll', {direction: 'down'})
  let formInputTab = await driver.hasElementByXPath("//*[@text='Form & Inputs']");
  assert.equal(formInputTab, true);
  formInputTab.click();
});

When('I click in Floating Label', async () => {
  let floatingLabel = await driver.hasElementByXPath("//*[@text='Floating Label']");
  assert.equal(floatingLabel, true);
  floatingLabel.click();
  let inputUsername = await driver.hasElementByXPath("//*[@text='Username']");
  await inputUsername.type("Teste automatic")
  let inputPassword = await driver.hasElementByXPath("//*[@text='Password']");
  await inputPassword.type("1234")
});

Then('I click in Sign In', { timeout: 5000 }, async () => {
  let buttonSignIn = await driver.elementByAccessibilityId("button-save");
  assert.equal(buttonSignIn, true);
  buttonSignIn.click();
});