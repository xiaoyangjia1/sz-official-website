export function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = judge(date.getMonth());
    const day = judge(date.getDay());
    const hour = judge(date.getHours());
    const minute = judge(date.getMinutes());
    const second = judge(date.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  function judge(num: number) {
    return num < 10 ? "0" + num : num;
  }
  