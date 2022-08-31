const path = require("path");
module.exports = {
  entry: "./index.html",
  output: {
    filename: "timeZone.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
