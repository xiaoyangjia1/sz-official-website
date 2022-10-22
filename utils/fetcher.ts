export const fetcher = async (api: string) => {
  const res = await fetch(api);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
