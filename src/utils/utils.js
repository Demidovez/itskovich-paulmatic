export const getValueOfObjectByField = (obj, field) => {
  if (obj) {
    return obj[field] || null;
  } else {
    return null;
  }
};
