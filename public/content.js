const handleRequest = (req, sender, sendRes) => {
  if (req.callFunction === 'toggleSidebar') {
    toggleSidebar();
  }
};

chrome.runtime.onMessage.addListener(handleRequest);

let sidebarOpen = false;

const toggleSidebar = () => {
  if (sidebarOpen) {
    const elem = document.getElementById('mySidebar');
    elem.parentNode.removeChild(elem);
    sidebarOpen = false;
  } else {
    /* Grab entire calendar view element */
    const elem = document.getElementsByClassName('tEhMVd')[0];
    const sidebar = document.createElement('iframe');
    sidebar.id = 'mySidebar';
    sidebar.style.cssText = `
      width: 500px;
      height: 100%;
      border: none;
      border-left: 1px solid #ddd;
    `;
    elem.appendChild(sidebar);
    sidebar.src = chrome.extension.getURL('index.html');
    sidebarOpen = true;
  }
};
