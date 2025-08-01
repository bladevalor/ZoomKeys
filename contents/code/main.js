'use strict';

const kwin_compliant_keys = {
    // Modifier keys - canonical form with all common aliases/variants normalized
    "shift": "Shift",
    "shft": "Shift",
    "ctrl": "Control",
    "control": "Control",
    "ctl": "Control",
    "alt": "Alt",
    "meta": "Meta",
    "cmd": "Meta",
    "Cmd": "Meta",
    "command": "Meta",
    "Command": "Meta",
    // Alphabet letters - map both lowercase and uppercase to uppercase
    "a": "A",
    "A": "A",
    "b": "B",
    "B": "B",
    "c": "C",
    "C": "C",
    "d": "D",
    "D": "D",
    "e": "E",
    "E": "E",
    "f": "F",
    "F": "F",
    "g": "G",
    "G": "G",
    "h": "H",
    "H": "H",
    "i": "I",
    "I": "I",
    "j": "J",
    "J": "J",
    "k": "K",
    "K": "K",
    "l": "L",
    "L": "L",
    "m": "M",
    "M": "M",
    "n": "N",
    "N": "N",
    "o": "O",
    "O": "O",
    "p": "P",
    "P": "P",
    "q": "Q",
    "Q": "Q",
    "r": "R",
    "R": "R",
    "s": "S",
    "S": "S",
    "t": "T",
    "T": "T",
    "u": "U",
    "U": "U",
    "v": "V",
    "V": "V",
    "w": "W",
    "W": "W",
    "x": "X",
    "X": "X",
    "y": "Y",
    "Y": "Y",
    "z": "Z",
    "Z": "Z",
};

var application_configs = [
	{
		name: "vivaldi",
		desc: "Vivaldi browser find shortcut",
		keymap: [
			"alt",
			"q"
		]
	},
	{
		name: "terminator",
		desc: "Terminator terminal new tab shortcut",
		keymap: [
			"alt",
			"w"
		]
	}
];

function parse_keymaps(config_keymap) {
    let kwin_keymap = [];
    config_keymap.forEach(config_keycode => {
        const clean_config_keycode = config_keycode.trim().toLowerCase();
        const kwin_compliant_keycode = kwin_compliant_keys[clean_config_keycode];
        kwin_keymap.push(kwin_compliant_keycode);
    });
    return kwin_keymap.join("+");
}
function gigaSwitcher(application) {
    let application_windows = workspace.windowList().filter((matched_application) => {
        return matched_application.resourceClass.toLowerCase().includes(application.toLowerCase());
    });
    if (application_windows.length < 1) {
        print("launching intended");
    }
    let active = workspace.activeClient;
    if (active && application_windows.some(app => app.resourceName === active.resourceClass)) {
        let idx = application_windows.indexOf(active);
        let nextWin = application_windows[(idx + 1) % application_windows.length];
        workspace.activeClient = nextWin;
        workspace.raiseWindow(nextWin);
    }
    else {
        workspace.activeClient = application_windows[0];
        workspace.raiseWindow(application_windows[0]);
    }
}
application_configs.forEach(app => {
    registerShortcut(app.name, app.desc, parse_keymaps(app.keymap), () => {
        gigaSwitcher(app.name);
    });
});
