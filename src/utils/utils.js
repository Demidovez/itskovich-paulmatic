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

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const generateTimeLabel = (
  startMinutes,
  endMinutes,
  isShort = false
) => {
  let startH = Math.floor(startMinutes / 60);
  let startMin = startMinutes % 60;
  startH = startH < 10 ? "0" + startH : startH;
  startMin = startMin < 10 ? "0" + startMin : startMin;

  let endH = Math.floor(endMinutes / 60);
  let endMin = endMinutes % 60;
  endH = endH < 10 ? "0" + endH : endH;
  endMin = endMin < 10 ? "0" + endMin : endMin;

  return `${startH}:${startMin}${isShort ? "-" : " - "}${endH}:${endMin}`;
};

export const getpath = (path) => {
  const username = (JSON.parse(localStorage.getItem("Account")) || {}).username;
  const emailUser = username ? "/" + username : "";

  return emailUser + path;
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
