// Import KWin API stub for autocompletion and documentation
const { workspace } = require('./kwin_stub.js');

// Your KWin scripting code here

// map keybindings to app info
const apps = {
  "Alt+F": { className: "firefox", exec: "firefox" },
  "Alt+M": { className: "org.kde.dolphin", exec: "dolphin" },
  // add more apps and key combos as needed
};

function toggleAppWindows(app) {
  let windows = workspace.windowList().filter(w => w.resourceClass.toLowerCase() === app.className.toLowerCase());
  if (windows.length === 0) {
    launch(app.exec);
    return;
  }
  let active = workspace.activeClient;
  if (active && windows.includes(active)) {
    let idx = windows.indexOf(active);
    let nextWin = windows[(idx + 1) % windows.length];
    workspace.activeClient = nextWin;
    workspace.raiseWindow(nextWin);
  } else {
    workspace.activeClient = windows[0];
    workspace.raiseWindow(windows[0]);
  }
}

// Example binding (pseudocode, you need to map keys properly)
registerShortcut("Alt+F", "Toggle Firefox", () => {
  toggleAppWindows(apps["Alt+F"]);
});
