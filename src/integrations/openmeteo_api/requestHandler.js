const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const baseUrl = process.env.OPEN_METEO_API_URL;

class RequestHandler {
  constructor() {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    return await this.req(path, "GET");
  }

  async req(path, method) {
    const resp = await axios({
      url: `${this.baseUrl}${path}`,
      method: method,
    });

    return resp.data;
  }
}

module.exports = new RequestHandler();
