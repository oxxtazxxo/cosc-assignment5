import dns from "node:dns/promises";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectDB() {
    await client.connect();

    console.log("✅ Connected to MongoDB Atlas!");

    return client.db("assignment6db");
}