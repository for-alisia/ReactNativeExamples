export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random;
};
