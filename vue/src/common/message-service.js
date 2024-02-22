import {commMsg} from '@/properties/common-messages'
import {messages} from '@/properties/messages'

export const getMessage = (code) => {
  let msg;
  msg = commMsg[code];
  //Look first in common messages
  if (msg) return msg;

  //Get business specific message
  msg = messages[code];
  if (msg) {
    return msg;
  } else {
    return code;
  }
}

export const getMsg = (messageObj) => {
  let msg = getMessage(messageObj.code);
  if (messageObj.arguments && messageObj.arguments.length !== 0) {
    msg = replaceMsgWithArgs(msg, messageObj.arguments);
  }
  return msg;
}

export const replaceMsgWithArgs = (msg = '', args = []) => {
  if (args == null) {
    return msg;
  }
  for (let i = 0; i < args.length; i++) {
    msg = msg.replace(`{${i}}`, args[i]);
  }
  return msg;
}
