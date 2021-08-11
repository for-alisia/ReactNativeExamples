export const isRequired = (val) => {
  return val.trim().length !== 0;
};

export const isEmail = (val) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val.toLowerCase());
};

export const isLarger = (num, val) => {
  return +val >= num;
};

export const isSmaller = (num, val) => {
  return +val <= num;
};

export const isLonger = (num, val) => {
  return val.trim().length >= num;
};
