Ext.define('PhpDevTools.controller.Requests', {
    extend: 'Ext.app.Controller',

    stores: ['Requests', 'Profilers'],
    models: ['Request'],

    refs: [
        {ref: 'requestList', selector: 'requestlist'},
        {ref: 'requestData', selector: 'requestlist dataview'}
    ],
    
    requires: [
        'PhpDevTools.store.Profilers',
        'PhpDevTools.store.Requests'
    ],

    currentPage : "",

    init: function() {
        this.control({
            'requestlist dataview': {
                selectionchange: this.selectRequest
            }
        });
    },
    
    onLaunch: function() {
        var dataview = this.getRequestData(),
            store = this.getRequestsStore();
            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
    },

    selectRequest: function(selModel, selected) {
        var request = selected[0];
        if (request) {
            this.application.fireEvent('DisplayProfiler',this,request.id);
        }
    },
    
    addRequest: function(request) {
        var me = this;
        var store = this.getRequestsStore();

        if ( request.pageref != this.currentPage ) {
            this.currentPage = request.pageref;
            // store.removeAll();
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