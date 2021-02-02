import api from "./api";

const USER_KEY = "@user";

export const signIn = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  //   setando o tokencomo padrão em todas as requisições
  api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
};

export const signOut = () => {
  localStorage.removeItem(USER_KEY);

  api.defaults.headers.common["Authorization"] = undefined;
};

export const getUser = () => {
  const { student } = JSON.parse(localStorage.getItem(USER_KEY));
};

export const isSignedIn = () => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user && user.token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    return true;
  } else {
    return false;
  }
};
