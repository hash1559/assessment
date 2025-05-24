const requestHandler = require("./requestHandler");

class GNewsAPI {
  async getNews(location) {
    try {
      return await requestHandler.get(`?country=${location}`);
    } catch (error) {
      console.log("error =>", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new GNewsAPI();
