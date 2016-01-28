Ext.define('PhpDevTools.lib.RequestValidator', {
    singleton: true,
    
    /**
     * @cfg {String} url The url to validate requests on
     */
    url: 'request-proxy.php',
    
    /**
     * Validates a given request's formating by fetching it and ensuring it is well formed
     * @param {PhpDevTools.model.Request} request The request to validate
     */
    validate: function(request, options) {
        options = options || {};
        
        Ext.applyIf(options, {
            scope: this,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });
        
        Ext.Ajax.request({
            url: this.url,
            params: {
                request: request.get('url')
            },
            scope: this,
            success: function(response) {
                var title = this.checkResponse(response, request);
                if (title) {
                    request.set('name', title);
                    options.success.call(options.scope, request);
                }
                else {
                    options.failure.call(options.scope);
                }
            },
            failure: function() {
                options.failure.call(options.scope);
            }
        });
    },
    
    /**
     * @private
     * Validates that a response contains a well-formed request
     * @param {Object} response The response object
     */
    checkResponse: function(response, request) {
        var dq  = Ext.DomQuery,
            url = request.get('url'),
            xml, channel, title;

        try {
            xml = response.responseXML;
            channel = xml.getElementsByTagName('channel')[0];
            
            if (channel) {
                title = dq.selectValue('title', channel, url);
                return title;
            }
        } catch(e) {
        }
        return false;
    }
});