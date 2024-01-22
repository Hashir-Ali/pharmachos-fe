export async function postFetcherWithoutToken(
  url: string,
  { arg }: { arg: Record<string, unknown> }
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
    method: "POST",
    body: JSON.stringify(arg),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}
export async function postFetcherWithToken(
  url: string,
  token: string,
  { arg }: { arg: Record<string, unknown> }
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
    method: "POST",
    body: JSON.stringify(arg),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
}
