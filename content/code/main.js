'use strict';

var kwin_compliant_keys = {
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
		name: "firefox",
		desc: "Firefox browser shortcut",
		keymap: [
			"alt",
			"f"
		]
	},
	{
		name: "vivaldi",
		desc: "Vivaldi browser find shortcut",
		keymap: [
			"ctrl",
			"f"
		]
	},
	{
		name: "dolphin",
		desc: "Dolphin file manager open shortcut",
		keymap: [
			"meta",
			"e"
		]
	},
	{
		name: "terminator",
		desc: "Terminator terminal new tab shortcut",
		keymap: [
			"ctrl",
			"shift",
			"t"
		]
	},
	{
		name: "vlc",
		desc: "VLC player preferences shortcut",
		keymap: [
			"ctrl",
			"p"
		]
	}
];

function parse_keymaps(config_keymap) {
    var kwin_keymap = [];
    config_keymap.forEach(function (config_keycode) {
        var clean_config_keycode = config_keycode.trim().toLowerCase();
        var kwin_compliant_keycode = kwin_compliant_keys[clean_config_keycode];
        kwin_keymap.push(kwin_compliant_keycode);
    });
    return kwin_keymap.join("+");
}
var windows = workspace.windowList();
windows.forEach(function (window) {
    print(window.resourceClass, "***", window.resourceName);
});
application_configs.forEach(function (app) {
    print(app.name, " => ", parse_keymaps(app.keymap));
});
