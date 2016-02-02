Ext.define('PhpDevTools.controller.Requests', {
    extend: 'Ext.app.Controller',

    stores: ['Requests', 'Profilers'],
    models: ['Request'],
    views: ['request.Add'],
    
    refs: [
        {ref: 'requestList', selector: 'requestlist'},
        {ref: 'requestData', selector: 'requestlist dataview'},
        {ref: 'requestShow', selector: 'requestshow'},
        {ref: 'requestForm', selector: 'requestwindow form'},
        {ref: 'requestCombo', selector: 'requestwindow combobox'},
        {ref: 'profilerGrid', selector: 'profilergrid'},
        {
            ref: 'requestWindow',
            selector: 'requestwindow',
            autoCreate: true,
            xtype: 'requestwindow'
        }
    ],
    
    requires: [
        'PhpDevTools.lib.RequestValidator',
        'PhpDevTools.store.Profilers',
        'PhpDevTools.store.Requests'
    ],

    currentPage : "",

    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        this.control({
            'requestlist dataview': {
                selectionchange: this.loadRequest
            }
        });
    },
    
    onLaunch: function() {
        var dataview = this.getRequestData(),
            store = this.getRequestsStore();
            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
    },
    
    loadRequest: function(selModel, selected) {
        var grid = this.getProfilerGrid(),
            store = this.getProfilersStore(),
            request = selected[0];

        if (request) {
            // console.log( request );
        }
    },
    
    /**
     * Shows the add request dialog window
     */
    addRequest: function(request) {
        console.log( request );
        var me = this;
        var store = this.getRequestsStore();

        if ( request.pageref != this.currentPage ) {
            this.currentPage = request.pageref;
            store.removeAll();
        }

        Ext.Array.each( request.response.headers , function(header) {
            if ( header.name == "phpdevtools" ) {
                store.add({
                    type : request.response.content.mimeType.replace('text/','').replace('application/',''),
                    name : me.getNameFromUrl(request.request.url),
                    id : header.value
                });
            }
        });


    },

    getNameFromUrl : function ( url ) {
        var path = url.split("?");
        var urlsp = path[0].split("/");
        var name = "";

        if ( urlsp[urlsp.length-1] === "" ) {
            name = urlsp[urlsp.length-2] + "/";
        } else {
            name = urlsp[urlsp.length-1];
        }

        if ( typeof path[1] !== "undefined" ) {
            name += "?" + path[1];
        }

        return name;
    }

});