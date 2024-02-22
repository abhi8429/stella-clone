import axios from 'axios'
import decode from 'jwt-decode'

import {ACCESS_TOKEN, BASE_URL, REMEMBER_ME, TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '@/properties/close-friend'

//This is meant for testing (mocking)
//Mock starts here
let getStub = null;
let putStub = null;
let uploadPostStub = null;
let deleteStub = null;
let localStorageStub = null;
let jquery$Stub = null;
let XMLHttpReqStub = null;

export const setXMLHttpReqStub = (stub) => {
  XMLHttpReqStub = stub;
};
export const getXMLHttpReqStub = () => {
  return XMLHttpReqStub;
};

export const setJquery$Stub = (stub) => {
  jquery$Stub = stub;
};
export const getJquery$Stub = () => {
  return jquery$Stub;
};


export const setLocalStorageStub = (stub) => {
  localStorageStub = stub;
};
export const getLocalStorageStub = () => {
  return localStorageStub;
};

export const setDeleteStub = (stub) => {
  deleteStub = stub;
};
export const getDeleteStub = () => {
  return deleteStub;
};

export const setGetStub = (stub) => {
  getStub = stub
};
export const getGetStub = () => {
  return getStub
};

export const setPutStub = (stub) => {
  putStub = stub
};
export const getPutStub = () => {
  return putStub
};

export const setUploadPostStub = (stub) => {
  uploadPostStub = stub
};
export const getUploadPostStub = () => {
  return uploadPostStub
};
//Mock ends here

export const getLocalStorage = () => {
  //Put it under try catch, as it fails while testing
  try {
    if (getLocalStorageStub()) {
      return getLocalStorageStub();
    }
    if (localStorage) {
      return localStorage;
    }
  } catch (e) {
    return null;
  }
}

export const getToken = function (tokenType) {

  let storage = getLocalStorage();
  if (storage) {
    return storage.getItem(tokenType);
  } else {
    return ''
  }
};

export const setRememberMe = (isRememberMe) => {
  let storage = getLocalStorage();
  if (storage) {
    if (isRememberMe) {
      storage.setItem(REMEMBER_ME, 'true');
    } else {
      storage.removeItem(REMEMBER_ME);
    }
  }
}

export const isRememberMe = () => {
  let storage = getLocalStorage();
  if (storage) {
    return !!storage.getItem(REMEMBER_ME);
  }
  return false;
}
export const setToken = function (tokenType, value) {
  let storage = getLocalStorage();
  if (storage) {
    storage.setItem(tokenType, value);
  }
};

export const removeToken = function (tokenType) {
  let storage = getLocalStorage();
  if (storage) {
    storage.removeItem(tokenType);
  }
};

//This is to support testing
let expDt;
export const setTokenExp = function (expDate) {
  expDt = expDate;
}

export const isTokenExpired =  (tokenType) => {
  return !(getTokenExp(tokenType) > new Date());
}

export const getTokenExp = function (tokenType) {

  let token = getToken(tokenType);
  if (token !== null && token !== '') {

    let date = new Date(0);
    date.setUTCSeconds(decode(token).exp);
    return date

  } else if (token === '') { //This is to support testing

    //expDt is set thru setTokenExp()
    //This, if expDt is set with Date object
    if (expDt) {
      return expDt;
      //This, if expDt was never set
    } else if (expDt === undefined) {
      let date = new Date(0);
      date.setYear(2099);
      return date;
      //This, if expDt is set to null
    } else {
      return null;
    }

  } else {
    return null;
  }

};

export const geDecodedToken = function (tokenType) {

  let token = getToken(tokenType);
  if (token !== null && token !== '') {
    return decode(token);
  } else {
    return null;
  }

}


export const getJquery = () => {

  if(getJquery$Stub()) {
    return getJquery$Stub();
  } else {
    return $;
  }
}

export const isRole = function (role) {

  let decodedToken = geDecodedToken(ACCESS_TOKEN);
  if (decodedToken) {
    let authorities = decodedToken.authorities;
    return authorities.includes(role);
  } else {
    return false;
  }
}

export const getBaseURL = () => {
    return BASE_URL;
}


export const AXIOSunsecure  = () => {
  console.log('BASE_URL', BASE_URL);
  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Content-Type': 'application/json',
      'base-url': BASE_URL
    }
  });
  //This meant for testing (mocking)
  if (getGetStub()) {
    ax.get = getGetStub();
  }
  //This is meant for testing (mocking)
  if (getPutStub()) {
    ax.put = getPutStub();
  }
  //This is meant for testing (mocking)
  if (getDeleteStub()) {
    ax.delete = getDeleteStub();
  }

  return ax;
};


export const AXIOS = () => {

  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
      'base-url': BASE_URL
      //'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
    }
  });
  //This meant for testing (mocking)
  if (getGetStub()) {
    ax.get = getGetStub();
  }
  //This is meant for testing (mocking)
  if (getPutStub()) {
    ax.put = getPutStub();
  }
  //This is meant for testing (mocking)
  if (getDeleteStub()) {
    ax.delete = getDeleteStub();
  }

  return ax;
};

export const AXIOSupload = () => {

  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
      'Content-Type': 'multipart/form-data',
      'base-url': BASE_URL
    }
  });
  //This is meant for testing (mocking)
  if (getUploadPostStub()) {
    ax.post = getUploadPostStub();
  }
  return ax;
};

export const AXIOSUnsecureUpload = () => {

  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Content-Type': 'multipart/form-data',
      'base-url': BASE_URL
    }
  });
  //This is meant for testing (mocking)
  if (getUploadPostStub()) {
    ax.post = getUploadPostStub();
  }
  return ax;
};

export const XMLHttpReq = (url) => {
  //This is meant for testing (mocking)
  if (getXMLHttpReqStub()) {
    return getXMLHttpReqStub();
  }
  let req = new XMLHttpRequest();
  req.open("GET", `${getBaseURL()}/${url}`, true);
  req.responseType = "blob";
  req.setRequestHeader('Authorization', `Bearer ${getToken(ACCESS_TOKEN)}`);

  return req;
}

export const AXIOSdownLoad = () => {

  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
      'base-url': BASE_URL,
      responseType: 'blob'
    },
    transformResponse: undefined
  });
  //This meant for testing (mocking)
  if (getGetStub()) {
    ax.get = getGetStub();
  }
  return ax;
};

export const AXIOSdownLoad2 = () => {

  let ax = axios.create({
    baseURL: getBaseURL(),
    headers: {
      'Authorization': `Bearer ${getToken(ACCESS_TOKEN)}`,
      /*'Content-Type': 'application/json',*/
      'base-url': BASE_URL,
      responseType: 'arraybuffer',
      // Accept: 'application/pdf'
    }/*,
    transformResponse: undefined*/
  });
  //This meant for testing (mocking)
  if (getGetStub()) {
    ax.get = getGetStub();
  }
  return ax;
};

export const AXIOS_LOGIN = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
});


