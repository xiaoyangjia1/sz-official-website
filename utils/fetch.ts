interface Params {
  [key: string]: string;
}
interface Get {
  api: string;
  params: Params;
  token: string;
}
class Fetch {
  async get({ api, params, token = "" }: Get) {
    const url = token
      ? `${process.env.baseUrl}/auth${api}`
      : `${process.env.baseUrl}${api}`;
    let options: { [key: string]: any } = {
      method: "GET",
      credentials: process.env.env === "dev" ? "include" : "same-origin",
    };
    if (token) {
      options.headers = { Authorization: `Bearer ${token}` };
    }
    const res = await fetch(url,options);
    const { error_code, data, message } = await res.json();
    return data;
  }
}
export default new Fetch();
