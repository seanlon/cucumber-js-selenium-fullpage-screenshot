const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const {
  By,
  until,
  ExpectedConditions,
  Actions,
} = require("selenium-webdriver");
const {
  doPrintScreen,
  doPrintScreenAsync,
} = require("../support/screenshot.js");
const { getImageDifferences } = require("../support/compare.js");
const { tryClick } = require("../support/util.js");
const webdriver = require("selenium-webdriver");

/**
 * Open a webpge
 */
Given("visit to sitepath {string}", async function (sitePathUrl) {
  console.log("VISIT: sitePathUrl", sitePathUrl);
  const milliseconds = 3 * 1000;
  await this.driver.get(sitePathUrl);
  // GIVE 3 SEC PAGE LOAD
  await this.driver.sleep(milliseconds);
});

/**
 * Do normal take screenshot of current page
 */
Then("I screenshot with name {string}", async function (screenshotname) {
  await doPrintScreenAsync(this.driver, screenshotname, false, this);
});

/**
 * Do full screen , full page screenshot in selenium cucumber js
 */
Then("I fullpage screenshot with name {string}", async function (
  imageFileName
) {
  const fs = require("fs");
  // INJECT fullpage js
  const injectLib = `
    (function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function(){
            // remote script has loaded
        };
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js';
        d.getElementsByTagName('head')[0].appendChild(script);
    }(document));
    `;
  await this.driver.sleep(2000);
  const worldAttachment = await this.attach;

  // screenshot full page, fullscreen whole page as one 1 file
  // we trigger html2canvas in selenium cucumber js and we se the canvas to image result png
  // Then we grb the image base 64 and write it as a file
  let scriptExecutionResult = await this.driver.executeScript(injectLib);
  await this.driver.sleep(2000);
  const genImage = `  
        html2canvas(document.body, {
            onrendered: function (canvas) {
                // canvas is the final rendered <canvas> element
                var myImage = canvas.toDataURL("image/png");
                // document.body.appendChild(canvas);
                if(document.getElementById("generatedImage") ){
                    document.getElementById("generatedImage").remove();          
                }

               function convertCanvasToImage() {
                    let image = new Image();
                    image.id ='generatedImage'
                    image.src = canvas.toDataURL();
                    return image;
                  }
                  
                  let pnGImage = convertCanvasToImage(); 
                  document.body.appendChild(pnGImage);


                return (myImage);
            }
        });
        `;

  scriptExecutionResult = await this.driver.executeScript(genImage);
  // save image in local folder
  const FOLDER_NAME = "./images/";
  const FILE_FORMAT = ".png";
  const filename = FOLDER_NAME + imageFileName + FILE_FORMAT;
  await this.driver.sleep(3000);
  const element = await this.driver.findElement(By.css("#generatedImage"));
  const imageData = await element.getAttribute("src");
  // console.log('imageData ', imageData);

  if (imageData) {
    console.log("writing filename...  ", filename);
    // attach report
    const decodedImage = Buffer.from(
      imageData.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
      "base64"
    );
    await worldAttachment.attach(decodedImage, "image/png");
    // write file
    fs.writeFile(
      filename,
      imageData.replace(/^data:image\/png;base64,/, ""),
      "base64",
      function (err) {
        if (err) {
          console.log("screenshot fullpage: >err writing file:", err);
          currentDriver.quit();
        }
      }
    );

    await this.driver.sleep(3000);
  }
});

/**
 * Compare between two images, results and differences as visual regression
 */
Then(
  "I compare a screenshot with name {string} vs {string} = {string}",
  async function (filename1, filename2, filename3) {
    const result = await getImageDifferences(
      filename1,
      filename2,
      filename3,
      this
    );

    return assert.equal(result < 1, true, "SCREEN cannot > 1% difference");
  }
);
Then("I close driver", async function () {
  // if (this.driver) {
  //     await this.driver.close();
  // }
});
