export default async function (url: string, method: string, body?: any) {
  let options = {
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useCookie("token").value}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(options.url, options);
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  const data = await response.json();
  return data;
}