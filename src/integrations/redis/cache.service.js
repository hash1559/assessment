const redisClient = require("./redisClient");

class CacheService {
  async get(key) {
    try {
      const data = await redisClient.get(key);
      return JSON.parse(data);
    } catch (error) {
      console.error("Error getting data from cache:", error);
      return null;
    }
  }

  async set(key, value, expiry = 3600) {
    try {
      await redisClient.set(key, JSON.stringify(value), {
        EX: expiry, // Expiry in seconds
      });
    } catch (error) {
      console.error("Error setting data in cache:", error);
    }
  }

  async del(key) {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error("Error deleting cache:", error);
    }
  }
}

module.exports = new CacheService();
