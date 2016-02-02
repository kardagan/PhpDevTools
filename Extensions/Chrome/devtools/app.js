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

    launch : function ( ) {
        chrome.devtools.network.getHAR( function ( requests ) {
            Ext.Array.each(requests.entries,function(request){
                PhpDevTools.app.getRequestsController().addRequest( request );
            })
        });
        chrome.devtools.network.onRequestFinished.addListener( function(request) {
            PhpDevTools.app.getRequestsController().addRequest( request );
        });
    }
});

/*

*/