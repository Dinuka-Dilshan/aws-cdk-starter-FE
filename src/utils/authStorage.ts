const AUTH_DETAILS_LOCALSTORAGE_KEY = "user";
const AUTH_TEMPORARY_CREDENTIALS_KEY = "temporary_credentials";

export const getAuthDetails = () => {
  const localStorageData = localStorage.getItem(AUTH_DETAILS_LOCALSTORAGE_KEY);

  if (localStorageData) {
    return JSON.parse(localStorageData) as User;
  }
  return null;
};

export const saveAuthDetails = (user: User) =>
  localStorage.setItem(AUTH_DETAILS_LOCALSTORAGE_KEY, JSON.stringify(user));

export const removeAuthDetails = () =>
  localStorage.removeItem(AUTH_DETAILS_LOCALSTORAGE_KEY);

export const getTemporaryCredentialsFromLocal = () => {
  const localStorageData = localStorage.getItem(AUTH_TEMPORARY_CREDENTIALS_KEY);

  if (localStorageData) {
    return JSON.parse(localStorageData) as TemporaryCredentials;
  }
  return null;
};

export const saveTemporaryCredentialsToLocal = (
  credentials: TemporaryCredentials
) =>
  localStorage.setItem(
    AUTH_TEMPORARY_CREDENTIALS_KEY,
    JSON.stringify(credentials)
  );

export const removeTemporaryCredentialsFromLocal = () =>
  localStorage.removeItem(AUTH_TEMPORARY_CREDENTIALS_KEY);
