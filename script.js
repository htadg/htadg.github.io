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

    var image = document.createElement('img');
    image.src = 'img/background1.png';
    var container = document.querySelector('.container');
    container.style.background = "url('img/background1.png') center top fixed no-repeat";
    container.style.backgroundSize = "cover";

    toggleClass(document.querySelector('.loader'), 'fadeOut');

    setTimeout(function() {
        toggleClass(document.querySelector('.loader'), 'loader');
    }, 1000);
    var me = [
        'Web Developer',
        'Pythonist',
        'Data Enthusiast',
        'JS Praiser',
        'Tech Enthusiast',
        'Hackathon Freak',
        'Very Friendly'
    ];
    setInterval(function() {
        index = Math.floor(Math.random() * me.length);
        document.querySelectorAll('.desc')[0].innerHTML = me[index];
    }, 700);
}

if (document.readyState != 'loading') {
    fn();
} else {
    document.addEventListener('DOMContentLoaded', fn());
}
