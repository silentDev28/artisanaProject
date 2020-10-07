export function getDate(createdOn) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = new Date(createdOn).getDay();
  let month = months[new Date(createdOn).getMonth()];
  let year = new Date(createdOn).getFullYear();
  return `${day}, ${month} ${year}`;
}
