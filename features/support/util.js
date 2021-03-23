const assert = require("assert").strict;
const { By, until } = require("selenium-webdriver");

module.exports = {
  resolveAfterSeconds: (millisecondsWait) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, millisecondsWait);
    });
  },
};
