const requestHandler = require("./requestHandler");

class ExchangeAPI {
  async getExchangeRate(location) {
    try {
      return await requestHandler.get(`&currencies=AUD,USD`);
    } catch (error) {
      console.log("error =>", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new ExchangeAPI();
