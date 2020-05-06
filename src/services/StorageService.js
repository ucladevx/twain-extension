/*global chrome*/

const setLoggedIn = (val, callback = () => {}) => {
  chrome.storage.local.set({ loggedIn: val }, () => {
    callback(val);
  });
};

const getLoggedIn = (callback) => {
  chrome.storage.local.get(['loggedIn'], callback);
};

export default { setLoggedIn, getLoggedIn };
