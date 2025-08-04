import { kwin_compliant_keys } from "./keycode";
import application_configs from "./keymaps.json"

function parse_keymaps(config_keymap: string[]) {
  let kwin_keymap: string[] = []
  config_keymap.forEach(config_keycode => {
    const clean_config_keycode: string = config_keycode.trim().toLowerCase();
    const kwin_compliant_keycode: string = kwin_compliant_keys[clean_config_keycode];
    kwin_keymap.push(kwin_compliant_keycode)
  });
  return kwin_keymap.join("+")
}

function gigaSwitcher(application: string) {
  let application_windows = workspace.windowList().filter((matched_application) => {
    return matched_application.resourceClass.toLowerCase().includes(application.toLowerCase());
  })
  let application_ids = application_windows.map(app => app.internalId);

  let active_window = workspace.activeWindow;
  if (application_windows.some(app => app.resourceClass == active_window.resourceClass)) {
    // windows of same application
    let pos = application_ids.indexOf(active_window.internalId);
    let nextWin_idx = (pos + 1) % application_windows.length
    let nextWin = application_windows[nextWin_idx];
    workspace.raiseWindow(nextWin);
    workspace.activeWindow = nextWin;
  } else {
    workspace.raiseWindow(application_windows[0]);
    workspace.activeWindow = application_windows[0];
  }
}

application_configs.forEach(app => {
  registerShortcut(app.name, app.desc, parse_keymaps(app.keymap), () => {
    gigaSwitcher(app.name)
  })
});

