const express = require("express");
const bodyParser = require("body-parser");
const recommendationsService = require("./src/recommendationsService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/api/recommendations", async (req, res) => {
  try {
    const { userLocation, preferences } = req.body;


    // Generate recommendations based on the provided criteria
    const recommendations = recommendationsService.generateRecommendations(
      userLocation,
      preferences
    );

    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
