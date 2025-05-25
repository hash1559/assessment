const requestHandler = require("./requestHandler");

class ExchangeAPI {
  async getExchangeRate(baseCurrency) {
    try {
      return await requestHandler.get(`&currencies=${baseCurrency},USD`);
    } catch (error) {
      console.log("error =>", error);
      throw new Error(error.message);
    }
  }
}

module.exports = new ExchangeAPI();
