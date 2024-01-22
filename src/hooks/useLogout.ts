import { redirect } from "next/navigation";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

export default function useLogout() {
  const [_, setAccessTokenLS] = useLocalStorage("accessToken", "");
  const [__, setAccessTokenSS] = useSessionStorage("accessToken", "");
  const logout = () => {
    setAccessTokenLS("");
    setAccessTokenSS("");
    redirect("/login");
  };
  return logout;
}
