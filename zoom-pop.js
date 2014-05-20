
function $(i) {
    return document.getElementById(i);
}

function store(key, val) {
    if (val !== undefined) 
        return localStorage.setItem(key, val);
    return localStorage.getItem(key);
}

function getHost() {
    return $('joom-host').hostname.replace(/\./g, '_');
}

window.onload = function(){
    chrome.tabs.getSelected(null, function(tab) {
        $('joom-host').href = tab.url;
        $('joom-it').value = store(getHost()) || 115;
        $('joom-it-stat').innerHTML = $('joom-it').value + '%';
    });    
    $('joom-all').value = store('all') || 115;
    $('joom-all-stat').innerHTML = $('joom-all').value + '%';

    $('joom-it').addEventListener('change', function(e){
        $('joom-it-stat').innerHTML = e.target.value + '%';
        chrome.extension.getBackgroundPage().joom({
            zval: e.target.value / 100,
            host: getHost()
        });
    });

    $('joom-all').addEventListener('change', function(e){
        $('joom-all-stat').innerHTML = e.target.value + '%';
    });

    $('joom-save').addEventListener('click', function(e){
        store(getHost(), $('joom-it').value);
        store('all', $('joom-all').value);
    });
}
