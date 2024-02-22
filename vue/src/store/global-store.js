import {clone} from "@/common/Utils";

const globalMessage = {
  "globalErrors": [],
  "message": null,
  "warning": null
}

const globalErrors = {
  "defaultMessage": null,
  "arguments": null,
  "objectName": null,
  "code": null
}

export const state = {
  globalMessage,
  user: null,
  invitee: null,
  payInfluencer: null,
  imageFile: null,
  imageWall1: null,
  imageWall2: null,
  agentName: null,
  redirectedFrom: null,
  platform: null,
  influencerPlatformId: null,
  platformId: null,
  createPlatform: null,
  customRequestInfluencer: null,
  customRequestIndex: null,
  source: null,
  cdnBaseUrl: null,
  redirectTo: null,
};

const convertMsg = (msg, args=[]) => {
  if (typeof msg !== 'object') {
    return {code: msg, arguments: args}
  } else {
    return msg;
  }
};

export const mutations = {

  clearGlobalMessages(state) {
    state.globalMessage = clone(globalMessage);
  },
  setGlobalMessages(state, globalMsg) {
    if (globalMsg != null) {
      state.globalMessage.globalErrors = globalMsg.allErrors;
      console.log('globalMsg', globalMsg);
    }
  },
  clearGlobalErrors(state) {
    state.globalMessage.globalErrors = []
    state.globalMessage.message = '';
    state.globalMessage.warning = '';
  },
  pushGlobalError(state, error) {
    let globalErr = {
      "defaultMessage": null,
      "arguments": null,
      "objectName": null,
      "code": error
    };

    // state.globalMessage.globalErrors = []
    state.globalMessage.globalErrors.push(globalErr);
  },
  setMessage(state, code = '', args=[]) {
    state.globalMessage.message = convertMsg(code, args);
  },

  setWarning(state, code = '', args=[]) {
    state.globalMessage.warning = convertMsg(code, args);
  },

  setUser(state, user) {
    state.user = user;
  },
  setInvitee(state, invitee) {
    state.invitee = invitee;
  },
  setPayInfluencer(state, invitee) {
    state.payInfluencer = invitee;
  },
  setImageFile(state, imageFile) {
    state.imageFile = imageFile;
  },
  setImageWall1(state, imageWall1) {
    state.imageWall1 = imageWall1;
  },
  setImageWall2(state, imageWall2) {
    state.imageWall2 = imageWall2;
  },
  setAgentName(state, agentName) {
    state.agentName = agentName;
  },
  setRedirectedFrom(state, redirectedFrom) {
    state.redirectedFrom = redirectedFrom;
  },
  setRedirectTo(state, redirectTo) {
    state.redirectTo = redirectTo;
  },
  setPlatform(state, influencerPlatform) {
    if (influencerPlatform) {
      state.platform = influencerPlatform.platform.name;
      state.platformId = influencerPlatform.platform.id;
      state.influencerPlatformId = influencerPlatform.id;
    } else {
      state.platform = null;
      state.influencerPlatformId = null;
      state.platformId = null;
    }
  },
  setCreatePlatform(state, createPlatform) {
    state.createPlatform = createPlatform;
  },
  setCustomRequestInfluencer(state, customRequestInfluencer) {
    state.customRequestInfluencer = customRequestInfluencer;
  },
  setCustomRequestIndex(state, customRequestIndex) {
    state.customRequestIndex = customRequestIndex;
  },
  setSource(state, source) {
    state.source = source;
  },
  setCdnBaseUrl(state, cdnBaseUrl) {
    state.cdnBaseUrl = cdnBaseUrl;
  },
};

export const actions = {
  clearGlobalMessages({commit}) {
    commit('clearGlobalMessages');
  },
  setGlobalMessages({commit}, globalMsg) {
    commit('setGlobalMessages', globalMsg)
    setTimeout(() => {
      commit('clearGlobalErrors');
    }, 5000);
  },
  pushGlobalError({commit}, error) {
    commit('pushGlobalError', error)
    setTimeout(() => {
      commit('clearGlobalErrors');
    }, 5000);
  },

  setMessage({commit}, code) {
    commit('setMessage', code);
    setTimeout(() => {
      commit('clearGlobalErrors');
    }, 5000);
  },

  setWarning({commit}, code) {
    commit('setWarning', code);
    setTimeout(() => {
      commit('clearGlobalErrors');
    }, 5000);
  },

  clearAllStore({commit, dispatch}) {
    commit('clearGlobalMessages');
    commit('setUser', null);
    commit('setInvitee', null);
    commit('setPayInfluencer', null);
    commit('setImageFile', null);
    // commit('setAgentName', null);
    commit('setCreatePlatform', null);
    // commit('setPlatform', null);
  },

  setUser({commit}, user) {
    commit('setUser', user);
  },
  setInvitee({commit}, invitee) {
    commit('setInvitee', invitee);
  },
  setPayInfluencer({commit}, invitee) {
    commit('setPayInfluencer', invitee);
  },
  setImageFile({commit}, imageFile) {
    commit('setImageFile', imageFile);
  },
  setImageWall1({commit}, imageWall1) {
    commit('setImageWall1', imageWall1);
  },
  setImageWall2({commit}, imageWall2) {
    commit('setImageWall2', imageWall2);
  },
  setAgentName({commit}, agentName) {
    commit('setAgentName', agentName);
  },
  setRedirectedFrom({commit}, redirectedFrom) {
    commit('setRedirectedFrom', redirectedFrom);
  },
  setRedirectTo({commit}, redirectTo) {
    commit('setRedirectTo', redirectTo);
  },
  setPlatform({commit}, platForm) {
    commit('setPlatform', platForm);
  },
  setCreatePlatform({commit}, createPlatform) {
    commit('setCreatePlatform', createPlatform);
  },
  setCustomRequestInfluencer({commit}, customRequestInfluencer) {
    commit('setCustomRequestInfluencer', customRequestInfluencer);
  },
  setCustomRequestIndex({commit}, customRequestIndex) {
    commit('setCustomRequestIndex', customRequestIndex);
  },
  setSource({commit}, source) {
    commit('setSource', source);
  },
  setCdnBaseUrl({commit}, cdnBaseUrl) {
    commit('setCdnBaseUrl', cdnBaseUrl);
  },
};

const getMsgCode = (message) => {
  if (message) {
    return message.code;
  } else {
    return '';
  }
}

const getMsgObj = (message) => {
  if (message) {
    return message;
  } else {
    return {code: '', arguments: []};
  }
}

export const getters = {
  globalErrors(state) {
    return state.globalMessage.globalErrors;
  },
  getMessage(state) {
    return state.globalMessage.message;
  },
  getWarning(state) {
    return state.globalMessage.warning;
  },

  getUser(state) {
    return state.user;
  },
  getInvitee(state) {
    return state.invitee;
  },
  getPayInfluencer(state) {
    return state.payInfluencer;
  },
  getImageFile(state) {
    return state.imageFile;
  },
  getImageWall1(state) {
    return state.imageWall1;
  },
  getImageWall2(state) {
    return state.imageWall2;
  },
  getAgentName(state) {
    return state.agentName;
  },
  getRedirectedFrom(state) {
    return state.redirectedFrom;
  },
  getRedirectTo(state) {
    return state.redirectTo;
  },
  getPlatform(state) {
    return state.platform;
  },
  getInfluencerPlatformId(state) {
    return state.influencerPlatformId;
  },
  getPlatformId(state) {
    return state.platformId;
  },
  getCreatePlatform(state) {
    return state.createPlatform;
  },
  getCustomRequestInfluencer(state) {
    return state.customRequestInfluencer;
  },
  getCustomRequestIndex(state) {
    return state.customRequestIndex;
  },
  getSource(state) {
    return state.source;
  },
  cdnBaseUrl(state) {
    return state.cdnBaseUrl;
  },
};

export default {
  /*namespaced: true,*/
  state,
  mutations,
  actions,
  getters
}
