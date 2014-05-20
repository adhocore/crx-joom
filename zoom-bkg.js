var host;

function getHost() {
    return host;
}

function joom(data){
    if (data.zval) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                "zval": data.zval, 
                "host": data.host || getHost() || ""
            });
        });
    }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    zval = localStorage['all'] || 115;
    if (_host = request.host) {
        host = _host;
        zval = localStorage[_host] || zval; 
    }
    sendResponse({
        "zval": zval / 100, 
        "host": getHost() || ""
    });        
});

