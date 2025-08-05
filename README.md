# Zoom Keys

Create hotkeys to switch between common apps like browser or terminal, or toggling between windows of the same application.

This is for [KDE](https://kde.org/) desktop environments, with the help of KWin scripts as per the [KWin API docs](https://develop.kde.org/docs/plasma/kwin/api/).

Kindly [donate](https://kde.org/fundraisers/yearend2024/) to the [KDE](https://kde.org/) foundation. Every penny counts.

## Installing

This was made relying on `npm`, so I use `npm` and custom scripts

```bash
npm install
npm run build
npm run install
```

## Config

This is done in the **./src/keymaps.json** file like in the example shown below

```json
[
  {
    "name": "vivaldi",
    "desc": "Vivaldi browser find shortcut",
    "keymap": [
      "alt",
      "q"
    ]
  },
  {
    "name": "terminator",
    "desc": "Terminator terminal new tab shortcut",
    "keymap": [
      "alt",
      "w"
    ]
  }
]
```

## Updating keymaps

After making changes to the **./src/keymaps.json** file, update the KWin script with:

```bash
npm run update
```

which runs `kpackagetool6` command to update the script in the settings
