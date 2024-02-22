import {BASE_URL} from "@/properties/close-friend";

export const getBaseURL = () => {
  if(process.env.NODE_ENV === 'development') {
    return 'http://localhost:8082';
  } else {
    return BASE_URL
  }
};

export const constructCustomerURL = (urlSuffix) => {
  return `${getBaseURL()}/${urlSuffix}`;
};

export const constructCustomerBaseURL = () => {
  return `${getBaseURL()}`;
};
