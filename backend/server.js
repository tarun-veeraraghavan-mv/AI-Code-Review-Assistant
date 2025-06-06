const app = require("./app");
const connectDB = require("./db");

const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://tarunv1911:ea0cj8dzRV2NhFmT@cluster0.70deyvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
