// @ts-nocheck
const dateFormat = (dateString) => {
  let date = new Date(dateString);
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear();

  return `${dd}/${mm}/${yy}`;
};

export default dateFormat;
