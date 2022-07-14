import moment from "moment";

function ConvertDate(d: string) {
  const date = new Date(d);
  const convert = moment(date).add(7, "hour");
  return convert.date();
}

export { ConvertDate };
