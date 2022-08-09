import moment from "moment";

function ConvertDate(d: string) {
  const date = new Date(d);
  const convert = moment(date).add(7, "hour");
  return convert.date();
}

export { ConvertDate };


export function getDateCurrent() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
