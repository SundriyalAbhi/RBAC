const { Redis } = require("@upstash/redis");

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("❌ Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN");
}

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const testRedisConnection = async () => {
  console.log("🔥 Redis function called");
  try {
    await client.set("startup-test", "working", { ex: 60 });
    const data = await client.get("startup-test");
    console.log("✅ Redis Connected:", data);
  } catch (err) {
    console.error("❌ Redis Error:", err.message);
  }
};

module.exports = { client, testRedisConnection };
