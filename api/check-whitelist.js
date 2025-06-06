import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "ZerionCluster";

export default async function handler(req, res) {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection("whitelisted_users").findOne({ roblox_username: username });

    if (!user) {
      return res.status(200).json({ whitelisted: false });
    }

    return res.status(200).json({
      whitelisted: true,
      plan: user.plan || "Unknown",
      discord_name: user.discord_name || "Unknown"
    });

  } catch (err) {
    console.error("Error checking whitelist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
