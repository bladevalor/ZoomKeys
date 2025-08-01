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
  if (application_windows.length < 1) {
    print("launching intended");
  }

  let active = workspace.activeClient;
  if (active && application_windows.some(app => app.resourceName === active.resourceClass)) {
    let idx = application_windows.indexOf(active);
    let nextWin = application_windows[(idx + 1) % application_windows.length];
    workspace.activeClient = nextWin;
    workspace.raiseWindow(nextWin);
  } else {
    workspace.activeClient = application_windows[0];
    workspace.raiseWindow(application_windows[0]);
  }
}


application_configs.forEach(app => {
  registerShortcut(app.name, app.desc, parse_keymaps(app.keymap), () => {
    gigaSwitcher(app.name)
  })
});
