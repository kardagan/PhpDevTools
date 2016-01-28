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
            this.getRequestShow().setTitle(request.get('name'));
            grid.enable();
            store.load({
                params: {
                    request: request.get('url')
                }
            });            
        }
    },
    
    /**
     * Shows the add request dialog window
     */
    addRequest: function() {
        this.getRequestWindow().show();
    },
    
    /**
     * Removes the given request from the Requests store
     * @param {PhpDevTools.model.Request} request The request to remove
     */
    removeRequest: function() {
        this.getRequestsStore().remove(this.getRequestData().getSelectionModel().getSelection()[0]);
    },
    
    /**
     * @private
     * Creates a new request in the store based on a given url. First validates that the request is well formed
     * using PhpDevTools.lib.RequestValidator.
     * @param {String} name The name of the Request to create
     * @param {String} url The url of the Request to create
     */
    createRequest: function() {
        var win   = this.getRequestWindow(),
            form  = this.getRequestForm(),
            combo = this.getRequestCombo(),
            store = this.getRequestsStore(),
            request  = this.getRequestModel().create({
                name: combo.getDisplayValue(),
                url: combo.getValue()
            });

        form.setLoading({
            msg: 'Validating request...'
        });
        
        PhpDevTools.lib.RequestValidator.validate(request, {
            success: function() {
                store.add(request);
                form.setLoading(false);
                win.close();
            },
            failure: function() {
                form.setLoading(false);
                form.down('#request').markInvalid('The URL specified is not a valid RSS2 request.');
            }
        });
    }
});