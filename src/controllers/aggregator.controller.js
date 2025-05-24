const openCageAPI = require('../integrations/opencage_api/opencage.service')
const openMeteoAPI = require('../integrations/openmeteo_api/openmeteo.service')
const gNewsAPI = require('../integrations/gnews_api/gnews.service')
const exchangeAPI = require('../integrations/exchange_api/exchange.service')

exports.getAggregatedData = async (req, res) => {
  let location = req.query.location

  // Geolocation API
  const response = await openCageAPI.getCoordinates(location)
  console.log('Geolocation api response =>', response)

  // Weather API
  let lat = 37.7749
  let long = -122.4194
  const weatherResp = await openMeteoAPI.getWeather({ lat, long })
  console.log('weather response =>', weatherResp)

  // News API
  const newsResp = await gNewsAPI.getNews(location)
  console.log('news response =>', newsResp)

  // Exchange Rate API
  const exchangeRateResp = await exchangeAPI.getExchangeRate('Canada')
  console.log('exchange rate =>', exchangeRateResp)

  res.send("Return all users");
};
