const redis = require("redis");

const client = redis.createClient({
    port: process.env.PORT_REDIS,
    host: process.env.HOST_REDIS,
});

(async () => {
    await client.connect();
})();


client.on("error", (err) => {
    console.log("Redis error: " + err);
});
client.on("connect", () => {
    console.log("Redis connected");
});
client.on("ready", () => {
    console.log("Redis ready");
});

module.exports = client;