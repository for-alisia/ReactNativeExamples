export const helpers = {
  getMapStaticUrl: (lat, long, apiKey) =>
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${long}&key=${apiKey}`,
};
