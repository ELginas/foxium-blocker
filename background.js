function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    filter.ondata = (event) => {
        let str = decoder.decode(event.data, { stream: true });
        const prefix = '<!doctype html>'

        str =
            "<!doctype html>" +
            "<style>#xe7COe{display: none !important;}body{overflow: visible !important;}</style>" +
            "<script nonce=\"FhZ-vO7FbyxG9sWPTIcHiQ\">window.addEventListener('load',()=>document.querySelector('.QS5gu.sy4vM')?.click())</script>" +
            str.slice(prefix.length)

        filter.write(encoder.encode(str));
        filter.disconnect();
    }

    return {};
}

function changeHeaders(e) {
    const csp = e.responseHeaders.filter(header => header.name == 'content-security-policy')[0]
    csp.value = csp.value.replace('script-src', "script-src 'nonce-FhZ-vO7FbyxG9sWPTIcHiQ'")
    return { responseHeaders: e.responseHeaders }
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    { urls: ["https://*.google.com/*"], types: ["main_frame"] },
    ["blocking"]
);
browser.webRequest.onHeadersReceived.addListener(
    changeHeaders,
    { urls: ["https://*.google.com/*"], types: ["main_frame"] },
    ["blocking", "responseHeaders"]
)
