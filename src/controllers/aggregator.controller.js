const { sequelize } = require("../../models");
const cacheService = require("../integrations/redis/cache.service");
const { Location, Weather, ExchangeRate } = require("../../models");
const openCageAPI = require("../integrations/opencage_api/opencage.service");
const openMeteoAPI = require("../integrations/openmeteo_api/openmeteo.service");
const gNewsAPI = require("../integrations/gnews_api/gnews.service");
const exchangeAPI = require("../integrations/exchange_api/exchange.service");

exports.getAggregatedData = async (req, res) => {
  let location = req.query.location;
  await maybeSyncDataStore(location);

  // Retrieve location data from the database
  try {
    const aggregatedData = await Location.findOne({
      where: { name: location.toLowerCase() },
      attributes: [
        "name",
        "country_code",
        "currency_code",
        "latitude",
        "longitude",
        "timezone",
        "last_synced_at",
        "news_articles",
      ],
      include: [
        {
          model: Weather,
          as: "weather",
          attributes: ["temperature", "wind_speed", "wind_direction"],
        },
        {
          model: ExchangeRate,
          as: "exchange_rate",
          attributes: ["base_currency", "target_currency", "rate"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      data: aggregatedData,
    });
  } catch (error) {
    throw new Error("Error fetching location from db" + error.message);
  }
};

// Only pull data from public APIs when location doesn't exist at all or was synced more than 10 minutes ago
async function maybeSyncDataStore(location) {
  const cachedFee = await cacheService.get(
    `locations:${location.toLowerCase()}`
  );

  const parsedFee = JSON.parse(cachedFee);
  if (true) {
    // Fetch data from the GEOLOCATION API
    const geolocationResp = await openCageAPI.getLocationData(location);
    let locationData = geolocationResp.results[0];

    // Fetch data from the WEATHER API
    const weatherResp = await openMeteoAPI.getWeather({
      lat: locationData?.geometry?.lat,
      lng: locationData?.geometry?.lng,
    });

    // Fetch data from the NEWS API
    const newsResp = await gNewsAPI.getNews(
      locationData?.components?.country_code.toUpperCase()
    );

    // Fetch data from the EXCHANGE RATE API
    const exchangeRateResp = await exchangeAPI.getExchangeRate(
      locationData?.annotations?.currency?.iso_code
    );

    // Build Parameters before population the database for locations, weather data and exchange rates

    // Build location parameters
    const locationParams = {
      name: location.toLowerCase(),
      country_code: locationData?.components?.country_code.toUpperCase(),
      currency_code: locationData?.annotations?.currency?.iso_code,
      latitude: locationData?.geometry?.lat,
      longitude: locationData?.geometry?.lng,
      timezone: locationData?.annotations?.timezone?.name,
      news_articles: newsResp.articles.slice(2, 4), // The slice here is simply intended to reduce data here due to sheer number of news articles in the news api response.
      last_synced_at: Date.now(),
    };

    // Build weather data parameters
    const weatherParams = {
      temperature: `${weatherResp?.current_weather?.temperature.toString()} ${
        weatherResp?.current_weather_units?.temperature
      }`,
      wind_speed: `${weatherResp?.current_weather?.windspeed.toString()} ${
        weatherResp?.current_weather_units?.windspeed
      }`,
      wind_direction: `${weatherResp?.current_weather?.winddirection.toString()} ${
        weatherResp?.current_weather_units?.winddirection
      }`,
    };

    // Build exchange rate parameters
    const exchangeRateParams = {
      base_currency: locationParams.currency_code,
      target_currency: "USD",
      rate: exchangeRateResp.quotes[`USD${locationParams.currency_code}`],
    };

    // We've grouped multiple db operations into a transaction. Either location data will be synced completely or
    // it won't be synced at all. This approach ensures atomicity.
    const transaction = await sequelize.transaction();

    try {
      const location = await Location.create(locationParams, {
        transaction: transaction,
      });
      weatherParams["location_id"] = location.id;
      await Weather.create(weatherParams, {
        transaction: transaction,
      });
      exchangeRateParams["location_id"] = location.id;
      await ExchangeRate.create(exchangeRateParams, {
        transaction: transaction,
      });

      await transaction.commit();
      console.log("Transaction commited successfully!");
    } catch (error) {
      await transaction.rollback();
      console.error("Transaction Failed. Rolled Back.", error);
      throw new Error("Error while performing transaction" + error.message);
    }
  }
}
