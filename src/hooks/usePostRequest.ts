import { useEffect, useReducer, useRef } from "react";

import useLogout from "./useLogout";
import useIsAuthenticated from "./useIsAuthenticated";

interface State<T> {
  data?: T;
  error?: Error;
  loading?: boolean;
  fetched?: boolean;
  fetchData?: any;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function usePostRequest<T = unknown>(
  url?: string,
  options?: RequestInit,
): State<T> {
  // const cache = useRef<Cache<T>>({});
  const logout = useLogout();
  const { accessToken } = useIsAuthenticated();
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false,
    fetched: false,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: true, fetched: false };
      case "fetched":
        return {
          ...initialState,
          data: action.payload,
          loading: false,
          fetched: true,
        };
      case "error":
        return {
          ...initialState,
          error: action.payload,
          loading: false,
          fetched: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async (
    request?: Record<string, unknown>,
    method?: string
  ) => {
    if (!url) return;
    dispatch({ type: "loading" });
    // If a cache exists for this url, return it
    // if (cache.current[url] || !noCache) {
    //   dispatch({ type: "fetched", payload: cache.current[url] });
    //   return;
    // }

    try {
      const response = await fetch(BASE_URL + url, {
        ...options,
        body: JSON.stringify(request),
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          logout();
        }
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      // cache.current[url] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: "error", payload: error as Error });
    }
  };

  useEffect(() => {
    cancelRequest.current = false;
    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return { ...state, fetchData };
}
