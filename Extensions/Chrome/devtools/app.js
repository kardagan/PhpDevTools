Ext.application({
    name: 'PhpDevTools',

    // All the paths for custom classes
    paths: {
        'Ext.ux': '/Lib/Extjs/ux/'
    },

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Profilers',
        'Requests'
    ],

    autoCreateViewport: true,

    addRequest : function ( request ) {

    }
});

/*
chrome.devtools.network.getHAR( function ( p ) { console.log( "aaa" , p) } );
chrome.devtools.network.onRequestFinished.addListener( function(request) {
        console.log( "bbb" , request );
});
*/