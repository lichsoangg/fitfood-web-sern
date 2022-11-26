const client = require("./connect_redis");
const randomNumberVerifyEmail = (username) => {
    const randomNumber = Math.floor(Math.random() * 8999 + 1000);
    client.set(`${username.toString()}-verify-email`, randomNumber);
    client.expire(`${username.toString()}-verify-email`, 600);
    return randomNumber;
};

module.exports = randomNumberVerifyEmail;