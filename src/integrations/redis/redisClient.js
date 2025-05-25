const redis = require("redis");

// Create Redis client
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

// Open the Redis connection manually if it hasn't already connected
(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully.");
  } catch (err) {
    console.error("Error connecting Redis client:", err);
  }
})();

module.exports = redisClient;
