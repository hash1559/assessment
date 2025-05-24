const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const baseUrl = process.env.GNEWS_API_URL;
const apiKey = process.env.GNEWS_API_KEY;

class RequestHandler {
  constructor() {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async get(path) {
    return await this.req(path, "GET");
  }

  async req(path, method) {
    const resp = await axios({
      url: `${this.baseUrl}${path}&lang=en&token=${this.apiKey}`,
      method: method,
    });

    return resp.data;
  }
}

module.exports = new RequestHandler();
