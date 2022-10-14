const mongoose = require("mongoose");

const conn = mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongodb connected`);
});
mongoose.connection.on('disconnected', () => {
    console.log(`\nMongodb disconnected`);

});
mongoose.connection.on('error', (err) => {
    console.log(`Mongodb error: ${JSON.stringify(err)}`);
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});
module.exports = conn;