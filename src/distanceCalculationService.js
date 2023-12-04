function calculateDistance(location1, location2) {
  const latDiff = Math.abs(location1.latitude - location2.latitude);
  const lonDiff = Math.abs(location1.longitude - location2.longitude);
  return latDiff + lonDiff;
}

module.exports = {
  calculateDistance,
};
