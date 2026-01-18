export const DUMMY_USER = {
  email: "doctor@eldersmiles.com",
  password: "password123",
};

export function login(email: string, password: string) {
  if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("auth") === "true";
}

export function logout() {
  localStorage.removeItem("auth");
}
