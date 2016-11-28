var loadCss = function(filename) {
    var style = document.createElement('link');
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = filename;
    document.querySelector('head').appendChild(style);
};

function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }

    var classString = element.className,
        nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

function fn() {
    loadCss("./style.min.css");
    toggleClass(document.querySelector('.loader'), 'fadeOut');
    setTimeout(
        function(){
            toggleClass(document.querySelector('.loader'),'loader');
        },1000);
}

if (document.readyState != 'loading') {
    fn();
} else {
    document.addEventListener('DOMContentLoaded', fn());
}
