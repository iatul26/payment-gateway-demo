const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        throw error;
    }
};

module.exports = connectDB;