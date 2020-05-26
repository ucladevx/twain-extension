const handleRequest = (req, sender, sendRes) => {
  if (req.callFunction === 'toggleSidebar') {
    toggleSidebar();
  } else if (req.callFunction === 'enableSidebar') {
    enableSidebar();
  }
};

chrome.runtime.onMessage.addListener(handleRequest);

let sidebarOpen = false;

const enableSidebar = () => {
  if (sidebarOpen) {
    return;
  } else {
    toggleSidebar();
  }
};

const toggleSidebar = () => {
  if (sidebarOpen) {
    const elem = document.getElementById('twainSidebar');
    elem.parentNode.removeChild(elem);
    sidebarOpen = false;
  } else {
    /* Grab entire calendar view element */
    const elem = document.getElementsByClassName('tEhMVd')[0];
    const sidebar = document.createElement('iframe');
    sidebar.id = 'twainSidebar';
    sidebar.style.cssText = `
      width: 300px;
      height: 100%;
      border: none;
      border-left: 1px solid #ddd;
    `;
    elem.appendChild(sidebar);
    sidebar.src = chrome.extension.getURL('index.html');
    sidebarOpen = true;
  }
};
