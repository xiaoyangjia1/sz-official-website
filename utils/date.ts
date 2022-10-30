export function formatDate(dateStr: string) {
  const timeStamp = new Date(dateStr).getTime() + 60 * 60 * 8 * 1000; // 补8小时的时区差
  const date = new Date(timeStamp);
  return date.toJSON().substring(0,19).replace('T',' ')
}

