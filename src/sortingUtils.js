function addScore(userLocation, preferences, place) {
  const score = calculateScore(place, userLocation, preferences);
  return { ...place, score };
}

function filterByType(selectedPreference, place) {
  return place.type.toLowerCase() === selectedPreference.toLowerCase();
}

function sortByScore(a, b) {
  return b.score - a.score;
}

function formatRecommendation(place) {
  return {
    name: place.name,
    type: place.type,
    location: place.location,
    ratings: place.ratings,
    score: place.score,
  };
}

function calculateScore(place, userLocation, preferences) {
  let score = 0;

  const distance = calculateDistance(userLocation, place.location);
  score += 100 - distance;

  if (place.type === preferences.typePreference) {
    score += 50;
  }

  score += place.ratings * 10;

  return score;
}

module.exports = {
  addScore,
  filterByType,
  sortByScore,
  formatRecommendation,
};
