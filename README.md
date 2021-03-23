  
## Demo working example
 1. This had been tested. Features include normal screenshot, fullpage scroll screenshot, compare screenshot in selenium webdriver chrome cucumber js.
 2. See the link REPORTS  [https://seanlon.github.io/cucumber-js-selenium-fullpage-screenshot/reports/cucumber_report.html](https://seanlon.github.io/cucumber-js-selenium-fullpage-screenshot/reports/cucumber_report.html)
 3. Image for fullpage screenshot![alt text](https://github.com/seanlon/cucumber-js-selenium-fullpage-screenshot/blob/main/images/fullpage-screenshot.png?raw=true)
 4. Image for normal screenshot![alt text](https://github.com/seanlon/cucumber-js-selenium-fullpage-screenshot/blob/main/images/normal-screenshot.png?raw=true)
 5. Image for two images visual comparisions screenshot![alt text](https://github.com/seanlon/cucumber-js-selenium-fullpage-screenshot/blob/main/images/different-1-vs-2-screenshot.png?raw=true)
 
## Starting up
 1. To start `npm install`
 2. Follow your browser chrome version, example if 89 `npm i --save chromedriver@^89.0.0`
 3. Run `npm run cucumber ` or `npm run start`
 4. If your scenario failed, you can see the log in your console or check the `images/` folder for a screenshot of the error.
 5. Run `npm run cucumber-report` to generate a report. A browser window will automatically open after this.
 
 6. You can configure selenium chromedriver to be headless in `world.js`
## Stacks
 1. `node-resemble` for visual regression comparison
 2. `cucumber js` v7 for e2e testing
 3. `selenium chrome webdriver` and `fullpage js ` for fullpage screenshots

