const getCurrentDate = () => {
  const currDate = new Date();
  const dateStr = `${currDate.getFullYear()}-${
    currDate.getMonth() + 1
  }-${currDate.getDate()}`;
  return dateStr;
};

module.exports = { getCurrentDate };
