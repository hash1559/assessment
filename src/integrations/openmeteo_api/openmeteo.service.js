const requestHandler = require("./requestHandler");

class OpenMeteoAPI {
  async getWeather({ lat, lng }) {
    try {
      return await requestHandler.get(
        `?latitude=${lat}&longitude=${lng}&current_weather=true`
      );
    } catch (error) {
      console.log("error =>", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new OpenMeteoAPI();
