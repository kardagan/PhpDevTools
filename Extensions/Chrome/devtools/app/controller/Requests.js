Ext.define('PhpDevTools.controller.Requests', {
    extend: 'Ext.app.Controller',

    stores: ['Requests','Configs'],
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
        var me = this;

        this.control({
            'requestlist dataview': {
                selectionchange: this.selectRequest
            },
            'requestlist tool[type=gear]' : {
                click : function () {
                    me.application.getConfigController().openConfig();
                }
            }
        });
    },
    
    onLaunch: function() {
        var dataview = this.getRequestData(),
            store = this.getRequestsStore();
            
        dataview.bindStore(store);
    },

    selectRequest: function(selModel, selected) {
        var request = selected[0];
        if (request) {
            this.application.getProfilersController().displayProfiler(request);
        }
    },
    
    addRequest: function(request) {
        var me = this;
        var store = this.getRequestsStore();
        var configs = this.getConfigsStore();

        if (request==null) {
            return false;
        }


        if ( request.pageref != this.currentPage ) {
            this.currentPage = request.pageref;
            store.removeAll();
            this.application.getProfilersController().removeAllProfilers();
        }

        var domain = request.request.url.split('/')[2];

        configs.each ( function (config ) {

            if ( me.fnmatch( domain , config.get('domain') ) ) {

                Ext.Array.each( request.response.headers , function(header) {

                    var url = config.get('profilerurl').replace(/#id#/,header.value);
                    var domaine = config.get('profilerurl').match(/^(https?:\/\/[^/]*)/gi);

                    if ( domaine == null ) {
                        domaine = request.request.url.match(/^(https?:\/\/[^/]*)/gi);
                        url = domaine + url;
                    }

                    if ( header.name == config.get('varname') ) {
                        store.add({
                            type : request.response.content.mimeType.replace('text/','').replace('application/',''),
                            name : me.getNameFromUrl(request.request.url),
                            id : header.value,
                            profilerurl : url
                        });
                    }
                });

            }
        })

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
    },

    fnmatch : function ( s , p ) {
        p = p.replace( /\./gi , "." );
        p = p.replace( /\*/gi , "(.*)" );
        return s.match( p );
    }

});