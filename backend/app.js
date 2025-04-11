const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

db.sequelize.sync().then(() => {
  console.log("✅ Database synced.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CareNest backend!" });
});

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
