const { Redis } = require("@upstash/redis");

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const testRedisConnection = async () => {
  console.log("🔥 Redis function called");

  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      throw new Error("Missing Redis ENV");
    }

    await client.set("startup-test", "working", { ex: 60 });
    const data = await client.get("startup-test");

    console.log("✅ Redis Connected:", data);
  } catch (err) {
    console.error("❌ Redis Error:", err.message);
  }
};

module.exports = { client, testRedisConnection };