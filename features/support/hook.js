const { Before, AfterAll, After } = require("@cucumber/cucumber");
const { doPrintScreenAsync } = require("./screenshot.js");

After(async function (scenario) {
  const world = this;
  const SUCCESS_STATUS = 1;
  // automatic attach to cucumber report after taking a screenshot on step failure
  if (scenario.result.status != SUCCESS_STATUS) {
    console.log("handle failure");
   return await doPrintScreenAsync(this.driver, "failure", true, world);
  }
  return true;
});

Before(function () {});

AfterAll(function () {
  return this.driver && this.driver.quit();
});
