# <img src="public/icons/icon_48.png" width="45" align="left"> Ext_sidepanel_per_tab

A Chrome extensions that opens a side panel per tab and not globally. Just like the dev tools are only open in specific tabs.

## Features

- Enable the action button only for http:// or https:// tabs
- Open the sidepanel when the action button is clicked
- When activating another tab, there is no sidepanel
- Returning to the tab the sidepanel is still there
- Closing the sidepanle keeps it closed upon re-activation of this tab

### Additional features
- Injects some user script only when the side panel is active
- Sample user script sends back a message through the backend to the sidepanel

Requires minimum Chrome Version 129.x.x.x

## Install

[**Chrome** extension]() <!-- TODO: Add chrome extension link inside parenthesis -->

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

