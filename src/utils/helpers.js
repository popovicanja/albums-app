const queryString = (params) => {
  let value = "";
  for (const key of Object.keys(params)) {
    if (params[key] || params[key] === 0) {
      if (Array.isArray(params[key])) {
        value += params[key].map((el) => `${key}=${el}`).join("&");
      } else {
        value += `${key}=${params[key]}&`;
      }
    }
  }
  const withoutAmpersand =
    value[value.length - 1] === "&" ? value.slice(0, value.length - 1) : value;
  return `?${withoutAmpersand}`;
};

export { queryString };
