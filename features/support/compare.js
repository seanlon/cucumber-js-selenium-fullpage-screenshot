
module.exports = {
  getImageDifferences: async (image1, image2, outputImageName, driver) => {
    const resemble = require("node-resemble-js");
    const fs = require("mz/fs");
    console.log('Begin getImageDifferences');
    return new Promise(async (resolve, reject) => {
      const worldAttachment = await driver.attach;
      resemble.outputSettings({
        errorColor: {
          red: 255,
          green: 0,
          blue: 255
        },
        transparency: 0.3
      })
      try {
        const path1 = `./images/${image1}.png`;
        const path2 = `./images/${image2}.png`;

        const path3 = `./images/${outputImageName}.png`;
        if (!fs.existsSync(path1 || !fs.existsSync(path2))) {
          return resolve(100)
        }
        const imageitem1 = await fs.readFile(path1);
        const imageitem2 = await fs.readFile(path2);

        var diff = resemble(imageitem1)
          .compareTo(imageitem2)
          .ignoreColors()
          .onComplete(async (data) => {
            /*
            {
              misMatchPercentage : 100, // %
              isSameDimensions: true, // or false
              dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
              getImageDataUrl: function(){}
            }
            */

            console.warn('onComplete getImageDifferences', data);
            const png = data.getDiffImage();
            const value = data && data.misMatchPercentage ? parseFloat(data.misMatchPercentage) : 0;

            await png.pack().pipe(fs.createWriteStream(path3))
            // const imageToBase64 = require('image-to-base64');

            await worldAttachment.attach('imageFileName=' + path3);
            await worldAttachment.attach('Mismatch difference % =' + value);
            // const decodedImage = await imageToBase64(path3);
            // // console.log('decodedImage',decodedImage)
            // // await worldAttachment.attach(decodedImage, 'image/png');
            resolve(value);
          });
      } catch (e) {
        console.log('error getDiff', e);
        if (driver && driver.quit) {
          driver.quit();
        }
        reject(false);
      }

    })





  }
}
