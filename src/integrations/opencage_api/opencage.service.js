const requestHandler = require("./requestHandler");

class OpenCageAPI {
  async getLocationData(location) {
    try {
      return await requestHandler.get(`?q=${location}`);
    } catch (error) {
      console.log("error =>", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new OpenCageAPI();
