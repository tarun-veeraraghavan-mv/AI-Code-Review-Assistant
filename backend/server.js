const app = require("./app");
const connectDB = require("./utils/db");

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://tarunv1911:ea0cj8dzRV2NhFmT@cluster0.70deyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("KEY", process.env.OPENROUTER_API_KEY);

connectDB(MONGO_URI).then(() => {
  app.get("/health", (req, res) => res.status(200).send("OK"));

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
