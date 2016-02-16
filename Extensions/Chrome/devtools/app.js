Ext.setGlyphFontFamily('FontAwesome');
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

        var loading = document.getElementById("loading");
        loading.parentNode.removeChild(loading);

        document.body.className = document.body.className.replace("loading","");

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
