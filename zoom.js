
function getHost() {
    return document.location.hostname.replace(/\./g, '_');
}

function joom(data) {
    if (data.host && data.host != getHost())
        return;
    if (data.zval) {
        document.body.style.zoom = data.zval;
    }
}

chrome.runtime.sendMessage({
    host: getHost()
}, function (data) {
    joom(data); 
});

chrome.runtime.onMessage.addListener(
    function(data) {
        joom(data);
    }      
);

