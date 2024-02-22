import {USER_STATUS_ACTIVE} from "@/properties/user-status";
import {CR_STATUS_DECLINED} from "@/properties/custom-request-status";

export const isSuffixCustomRequest = (path) => {
  if (path) {
    let pathContent = path.split('/');
    if (pathContent.length !== 4) {
      return false;
    }
    return pathContent[1] === 'c' && pathContent[3] === 'cr';
  }
  return false;
}

export const  isUserActive = (user) => {
   return user.status === USER_STATUS_ACTIVE;
}

export const isInstagramPath = (path) => {
  if (path) {
    let pathContent = path.split('/');
    if (pathContent.length !== 3) {
      return false;
    }
    return pathContent[1] === 'c';
  }
  return false;
}

export const isSnapchatPath = (path) => {
  if (path) {
    let pathContent = path.split('/');
    if (pathContent.length !== 3) {
      return false;
    }
    return pathContent[1] === 'snapchat';
  }
  return false;
}

export const customRequestDesc = (customRequest) => {
  let desc;
  if (customRequest.options) {
    desc =  customRequest.options.title + ' - ' + customRequest.requestDescription;
  } else {
    desc = customRequest.requestDescription;
  }
  if (customRequest.requestDeclineDescription && customRequest.status === CR_STATUS_DECLINED) {
    desc = `${desc} [${customRequest.requestDeclineDescription}]`;
  }
  return desc;
}


