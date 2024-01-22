import { useLocalStorage, useSessionStorage } from "usehooks-ts";
export default function useIsAuthenticated() {
  const [accessTokenLS] = useLocalStorage("accessToken", "");
  const [accessTokenSS] = useSessionStorage("accessToken", "");

  return {
    isAuthenticated: (accessTokenLS || accessTokenSS)?.length > 0,
    accessToken: accessTokenLS || accessTokenSS,
  };
}
