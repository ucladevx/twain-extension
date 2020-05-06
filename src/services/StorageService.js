/*global chrome*/

const logDefault = (val) => console.log('set loggedIn to', val);

const setLoggedIn = (val, callback = logDefault) => {
  chrome.storage.local.set({ loggedIn: val }, () => {
    callback(val);
  });
};

const getLoggedIn = (callback) => {
  chrome.storage.local.get(['loggedIn'], callback);
};

export default { setLoggedIn, getLoggedIn };
