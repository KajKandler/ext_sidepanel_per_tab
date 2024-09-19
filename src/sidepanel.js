'use strict';

import './sidepanel.css';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'REFRESH_SIDEPANEL') {
    // Log message coming from the `request` parameter
    console.log("sidepanel::onMessage:request ",request);
    console.log("sidepanel::onMessage:sender: ",sender);

    $('#app').html('<div>'+ JSON.stringify(request, null, 2)+'</div>');
    $('#app').append('<div>'+ sender.id+ ' - '+ sender.url+'</div>');
    $('#app').append('<div>'+ request.now+'</div>');
    $('#app').append('<div>'+ request.data+'</div>');
  };
  return true;
});
