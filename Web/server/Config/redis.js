const { Redis } = require("@upstash/redis");

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

exports.client = client;

// exports.connectRedis = async () => {
//   try {
//     await client.connect();
//     console.log("✅ Redis connected");
//   } catch (error) {
//     console.error("❌ Redis connection error:", error);
//   }
// };