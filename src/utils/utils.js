export const getValueOfObjectByField = (obj, field) => {
  if (obj) {
    return obj[field] || null;
  } else {
    return null;
  }
};

export const isIndexShowed = (page, index, length, min, max) =>
  (page - min < index && index < page + min) ||
  (page < min && index < max - page) ||
  (index < max && page - index < min) ||
  (index > length - (max + 1) && length - page < min);
