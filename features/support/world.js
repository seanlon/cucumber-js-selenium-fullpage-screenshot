const {
  setWorldConstructor,
  setDefaultTimeout,
} = require("@cucumber/cucumber");

const seleniumWebdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

// settimeout
const DEFAULT_TIMEOUT = 20000;
setDefaultTimeout(DEFAULT_TIMEOUT);
class CustomWorld {
  constructor(attach, parameters) {
    this.variable = 0;
    this.attach = attach;
    this.parameters = parameters;

    var options = new chrome.Options();
    options.addArguments([
      "--start-maximized",
      "--enable-automation",
      "--headless",
      "--no-sandbox",
      "--disable-infobars",
      "--disable-infobars",
      "--disable-dev-shm-usage",
      "--disable-browser-side-navigation",
      "--ignore-certificate-errors",
      "--allow-running-insecure-content",
      "--allow-insecure-localhost",
      "--disable-gpu",
      "--verbose",
      "--disable-web-security",
    ]);
    options.windowSize({ width: 1280, height: 720 });

    this.driver = new seleniumWebdriver.Builder()
      .forBrowser("chrome")
      // you can enable the options above if you want
      // .setChromeOptions(options )
      // or easier  if you just need headless
      // .setChromeOptions(options.headless() )
      .build();
  }

  setTo(number) {
    this.variable = number;
  }

  incrementBy(number) {
    this.variable += number;
  }
}

setWorldConstructor(CustomWorld);
