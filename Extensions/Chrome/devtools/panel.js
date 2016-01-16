'use strict';

var AI = {
    isReady     : false,
    contextMenu : null
};

chrome.devtools.panels.create(
    'PhpDevTools',
    '',
    'devtools/index.html',
    function () {}
);
