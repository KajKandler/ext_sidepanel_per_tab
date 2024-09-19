'use strict';

// With background scripts you can communicate with sidepanel
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'FRESH_DATA') {
    // Log message coming from the `request` parameter
    console.log("background::onMessage:reuest: ", request);
    console.log("background::onMessage:sender: ", sender);
    // Send a message to the sidepanel
    await chrome.runtime.sendMessage({
      action: 'REFRESH_SIDEPANEL',
      activeTabId: activeTabId,
      now: '' + new Date(),
      data: request.data
    });
  }
});

// 
let activeTabs = {};
let activeTabId = 0;

async function inject_user_script(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['fetch_data.js']
    });
  } catch (error) {
    if (error.message.startsWith('No tab with id: 0')) {
      // console.log('ignoring: ', error);
    } else {
      console.error(error);
    }
  }

}
chrome.tabs.onActivated.addListener(async function (activeInfo) {
  console.log("tab activated: ", activeInfo);
  activeTabId = activeInfo.tabId;
  let tab = activeTabs[activeInfo.tabId];
  if (tab) {
    if (tab.extension_active) {
      inject_user_script(activeTabId)
    } else {
      // ignore the request
    }
  } else {
    // init the tab
    tab = {
      extension_active: false
    }
    activeTabs[activeInfo.tabId] = tab;
  }
});

chrome.action.onClicked.addListener(async function () {
  // Send a message to the active tab
  console.log("extension button clicked");
  chrome.sidePanel.getOptions({ tabId: activeTabId }, async function (options) {
    console.log("current options: ", options, options.tabId);
    console.log("open sidepanel");
    chrome.sidePanel.setOptions({
      tabId: activeTabId,
      path: 'sidepanel.html',
      enabled: true
    });
    chrome.sidePanel.getOptions({ tabId: activeTabId }, function (newOptions) {
      console.log("new options: ", newOptions, newOptions.tabId);
    });
    // this needs to happen quickly and not awaits are allowed before
    // otherwise it fails with sidepanel.open is only allowed in a user action
    chrome.sidePanel.open({
      tabId: activeTabId
    });
    activeTabs[activeTabId].extension_active = true;

    // need to wait a little or the sidepanel has not opend a receiver for the message
    await new Promise(r => setTimeout(r, 100));
    await inject_user_script(activeTabId);
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, tabInfo) => {
  console.log("inject user script: status = ", tabInfo.status);
  if (tabInfo.status === 'complete' && activeTabs[tabId] && activeTabs[tabId].extension_active) {
    inject_user_script(tabId)
  }
});