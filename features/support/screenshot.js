module.exports = {
  doPrintScreenAsync: async (
    currentDriver,
    imageFileName,
    hasTimestampAdded,
    world
  ) => {
    const fs = require("fs");
    const { resolveAfterSeconds } = require("./util.js");
    const getDateString = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");

      const time =
        date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
      return `${year}${month}${day}_${time}`;
    };
    try {
      const worldAttachment = await world.attach;
      const result = await resolveAfterSeconds(2 * 1000); // short wait
      const data = await currentDriver.takeScreenshot();
      const currentTimestamp = getDateString();
      const FOLDER_NAME = "./images/";
      const FILE_FORMAT = ".png";
      imageFileName = hasTimestampAdded
        ? `${currentTimestamp}-${imageFileName}`
        : `${imageFileName}`;
      const filename = FOLDER_NAME + imageFileName + FILE_FORMAT;

      if (data) {
        const decodedImage = Buffer.from(
          data.replace(/^data:image\/(png|gif|jpeg);base64,/, ""),
          "base64"
        ); // New
        await worldAttachment.attach(decodedImage, "image/png");
        fs.writeFile(
          filename,
          data.replace(/^data:image\/png;base64,/, ""),
          "base64",
          function (err) {
            if (err) {
              console.log("doPrintScreen: >err writing file:", err);
              currentDriver.quit();
            }
          }
        );
      }
    } catch (e) {
      console.warn("doPrintScreenAsync: ended failure", e);
      currentDriver.quit();
    }
  },
};
