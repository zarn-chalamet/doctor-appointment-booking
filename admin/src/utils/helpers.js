const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// change format from (11_2_2025) to 11 Feb 2025
export const changeDateFormat = (date) => {
  const dateArray = date.split("_");
  return (
    dateArray[0] + " " + months[Number(dateArray[1] - 1)] + " " + dateArray[2]
  );
};
