export const isAdminAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  }
  return false;
};

export const setAdminAuthenticated = (): void => {
  localStorage.setItem("isAdminLoggedIn", "true");
};

export const clearAdminAuthentication = (): void => {
  localStorage.removeItem("isAdminLoggedIn");
};
