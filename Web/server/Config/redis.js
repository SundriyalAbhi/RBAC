const { Redis } = require("@upstash/redis");

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

exports.client = client;

const testRedisConnection = async () => {
  try {
    await client.set("startup-test", "working", { ex: 60 });
    const data = await client.get("startup-test");

    console.log("✅ Redis Test Success:", data);
  } catch (err) {
    console.error("❌ Redis Test Failed:", err);
  }
};

module.exports = { testRedisConnection };

// exports.connectRedis = async () => {
//   try {
//     await client.connect();
//     console.log("✅ Redis connected");
//   } catch (error) {
//     console.error("❌ Redis connection error:", error);
//   }
// };