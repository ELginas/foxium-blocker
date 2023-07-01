function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();
  
    filter.ondata = (event) => {
      let str = decoder.decode(event.data, {stream: true});
      str = "<style>#xe7COe{display: none !important;}body{overflow: visible !important;}</style>" + str
      filter.write(encoder.encode(str));
      filter.disconnect();
    }
  
    return {};
  }
  
  browser.webRequest.onBeforeRequest.addListener(
    listener,
    {urls: ["https://*.google.com/*"], types: ["main_frame"]},
    ["blocking"]
  );
  