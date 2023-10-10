const convertDate = (dateString) => {
  const date = new Date(dateString);

  const stringDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  return stringDate;
};

const converDateFromMMDDYYYYToDDMMYYYY = (dateString) => {
  const dateArray = dateString.split('/');

  if (dateArray[1].toString().length === 1) {
    dateArray[1] = `0${dateArray[1]}`;
  }

  if (dateArray[0].toString().length === 1) {
    dateArray[0] = `0${dateArray[0]}`;
  }

  return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
};

const API_URL = 'https://localhost:7224/';

export { convertDate, converDateFromMMDDYYYYToDDMMYYYY, API_URL };
