(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }
    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() { callback(context); }, 1);
            return;
        } else {
            readyList.push({ fn: callback, ctx: context });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);


var start = function() {
    var link = document.createElement('link');
    link.href = '/static/style.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(link);
    var oncssloaded = function(callback) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href === link.href) {
                return callback();
            }
        }
        setTimeout(function() {
            oncssloaded(callback);
        }, 50);
    };

    function callback() {
        if (link.addEventListener) {
            link.removeEventListener("load", callback);
        }
        document.querySelector('.loader').style.display = "none";
        document.querySelector('.container').style.display = "block";
    }
    if (link.addEventListener) {
        link.addEventListener("load", callback);
    }
    link.oncssloaded = oncssloaded;
    oncssloaded(callback);
}

docReady(start);