import {removeToken, setRememberMe, setToken} from "@/common/http-common";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/properties/close-friend";

export const getLoginBody = (username, password) => {
  return  `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
}

export const storeToken = (response) => {
  setToken(ACCESS_TOKEN, response.data[ACCESS_TOKEN]);
  setToken(REFRESH_TOKEN, response.data[REFRESH_TOKEN]);
}

export const unStoreToken = () => {
  removeToken(ACCESS_TOKEN);
  removeToken(REFRESH_TOKEN);
}

export const cleanUpAfterLogout = () => {
  unStoreToken();
  setRememberMe(false);
}
