const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const places = [
  {
    name: "Cozy Cafe",
    type: "restaurant",
    location: { latitude: 40.7128, longitude: -74.006 },
    ratings: 4.5,
  },
  {
    name: "Rooftop Lounge",
    type: "bar",
    location: { latitude: 40.7282, longitude: -74.0776 },
    ratings: 4.0,
  },
  {
    name: "Yoga Studio Bliss",
    type: "experiences",
    location: { latitude: 40.7401, longitude: -73.9903 },
    ratings: 4.7,
  },
  {
    name: "Wine and Paint Studio",
    type: "experiences",
    location: { latitude: 40.7512, longitude: -73.9827 },
    ratings: 4.2,
  },
  {
    name: "Sushi Haven",
    type: "restaurant",
    location: { latitude: 40.7421, longitude: -73.9822 },
    ratings: 4.8,
  },
  {
    name: "Craft Beer Pub",
    type: "bar",
    location: { latitude: 40.7447, longitude: -74.0062 },
    ratings: 4.5,
  },
  {
    name: "Zen Garden Yoga",
    type: "experiences",
    location: { latitude: 40.7352, longitude: -73.9983 },
    ratings: 4.9,
  },
  {
    name: "Artistic Escape Studio",
    type: "experiences",
    location: { latitude: 40.7389, longitude: -73.9874 },
    ratings: 4.1,
  },
  {
    name: "Italian Trattoria",
    type: "restaurant",
    location: { latitude: 40.7295, longitude: -74.0014 },
    ratings: 4.6,
  },
  {
    name: "Skyline View Bar",
    type: "bar",
    location: { latitude: 40.7452, longitude: -74.0105 },
    ratings: 4.3,
  },
  {
    name: "Meditation Oasis",
    type: "experiences",
    location: { latitude: 40.7336, longitude: -73.9787 },
    ratings: 4.7,
  },
  {
    name: "Virtual Reality Experience",
    type: "experiences",
    location: { latitude: 40.7518, longitude: -73.9765 },
    ratings: 4.0,
  },
  {
    name: "Mexican Cantina",
    type: "restaurant",
    location: { latitude: 40.7211, longitude: -73.9884 },
    ratings: 4.4,
  },
  {
    name: "Jazz Lounge",
    type: "bar",
    location: { latitude: 40.7397, longitude: -74.0011 },
    ratings: 4.6,
  },
  {
    name: "Healthy Living Yoga",
    type: "experiences",
    location: { latitude: 40.7465, longitude: -73.9909 },
    ratings: 4.8,
  },
];

app.post("/api/recommendations", async (req, res) => {
  try {
    const { userLocation, preferences } = req.body;

    // Generate recommendations based on the provided criteria
    const recommendations = generateRecommendations(userLocation, preferences);

    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateRecommendations(userLocation, preferences) {
  const { selectedPreference } = preferences;

  // Map places and calculate scores
  const topRecommendations = places
    .map((place) => {
      const score = calculateScore(place, userLocation, preferences);
      return { ...place, score };
    })
    .filter(
      (place) => place.type.toLowerCase() === selectedPreference.toLowerCase()
    ) // Filter by type preference
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Take the top 3 recommendations
    .map((place) => ({
      name: place.name,
      type: place.type,
      location: place.location,
      ratings: place.ratings,
      score: place.score,
    }));
  return topRecommendations;
}

function calculateScore(place, userLocation, preferences) {
  let score = 0;

  // Distance score (closer is better)
  const distance = calculateDistance(userLocation, place.location);
  score += 100 - distance;

  // Preference score (adjust based on user preferences)
  if (place.type === preferences.typePreference) {
    score += 50;
  }

  // Ratings score (higher ratings are better)
  score += place.ratings * 10; // Assuming ratings are on a scale of 0 to 5

  return score;
}

function calculateDistance(location1, location2) {
  // Simplified distance calculation (use some API like Google places to calculate distance in production)
  const latDiff = Math.abs(location1.latitude - location2.latitude);
  const lonDiff = Math.abs(location1.longitude - location2.longitude);
  return latDiff + lonDiff;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
