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

let windows = workspace.windowList();
windows.forEach(window => {
  print(window.resourceClass, "***", window.resourceName);
});

application_configs.forEach(app => {
  print(app.name, " => ", parse_keymaps(app.keymap));
});
