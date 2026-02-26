import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export function setToken(token: string, rememberMe: boolean = false) {
  if (typeof window === "undefined") return;
  if (rememberMe) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUser(): DecodedToken | null {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (e) {
    return null;
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
  }
}
