Ext.define('PhpDevTools.controller.Profilers', {
    extend: 'Ext.app.Controller',

    stores: ['Profilers'],

    models: ['Profiler'],

    views: ['profiler.Grid', 'profiler.Preview'],

    refs: [{
        ref: 'requestShow',
        selector: 'requestshow'
    }, {
    	ref: 'viewer',
    	selector: 'viewer'
    }, {
    	ref: 'profilerPreview',
    	selector: 'profilerpreview'
    }, {
        ref: 'profilerTab',
        xtype: 'profilerpreview',
        closable: true,
        forceCreate: true,
        selector: 'profilerpreview'
    }],

    init: function() {
        this.control({
            'profilergrid': {
                selectionchange: this.previewProfiler
            },
            'profilergrid > tableview': {
                itemdblclick: this.loadProfiler,
                refresh: this.selectProfiler
            },
            'profilergrid button[action=openall]': {
                click: this.openAllProfilers
            },
            'profilerpreview button[action=viewintab]': {
                click: this.viewProfiler
            },
            'profilerpreview button[action=gotopost]': {
                click: this.openProfiler
            }
        });
    },

    selectProfiler: function(view) {
        var first = this.getProfilersStore().getAt(0);
        if (first) {
            view.getSelectionModel().select(first);
        }
    },

    /**
     * Loads the given profiler into the preview panel
     * @param {PhpDevTools.model.Profiler} profiler The profiler to load
     */
    previewProfiler: function(grid, profilers) {
        var profiler = profilers[0],
            profilerPreview = this.getProfilerPreview();

        if (profiler) {
            profilerPreview.profiler = profiler;
    		profilerPreview.update(profiler.data);
        }
    },

    /**
     * Hack to avoid pop-up blocking by smartphones browser.
     */
    openLinkMobile: function(url){
        var link = Ext.getDom('hidden_link'),
            clickEvent = document.createEvent('Event');

        link.href = url;
        clickEvent.initEvent('click', true, false);
        link.dispatchEvent(clickEvent);
    },

    openProfiler: function(btn) {
        var open,
            url = btn.up('profilerpreview').profiler.get('link'),
            deviceType = Ext.os.deviceType;

        if(Ext.os.name !== 'iOS' && deviceType !== 'Desktop'){
            this.openLinkMobile(url);
        }else{
            open = window.open(url); // Workaround for iOS! Assigning result to variable brings up prompt on iOS. On desktop it should return Window object
            if(!open){
                //If null or undefined, then we inform user that popup blocker should be disabled
                Ext.Msg.alert('Popups disabled!', 'To view selected profiler in the new window disable Pop-up blocker or choose Allow, when promted by your device.<br><br>');
            }
        }
    },
    
    openAllProfilers: function() {
        this.loadProfilers(this.getProfilersStore().getRange());
    },

    viewProfiler: function(btn) {
        this.loadProfiler(null, btn.up('profilerpreview').profiler);
    },
    
    loadProfilers: function(profilers){
        var viewer = this.getViewer(),
            toAdd = [],
            tab,
            id;
            
        Ext.Array.forEach(profilers, function(profiler){
            id = profiler.id;
            if (!viewer.down('[profilerId=' + id + ']')) {
                tab = this.getProfilerTab();
                tab.down('button[action=viewintab]').destroy();
                tab.setTitle(profiler.get('title'));
                tab.profiler = profiler;
                tab.profilerId = id;
                tab.update(profiler.data);
                toAdd.push(tab);
            }
        }, this);
        viewer.add(toAdd);
    },

    /**
     * Loads the given profiler into a new tab
     * @param {PhpDevTools.model.Profiler} profiler The profiler to load into a new tab
     */
    loadProfiler: function(view, profiler) {
        var viewer = this.getViewer(),
            title = profiler.get('title'),
            profilerId = profiler.id;
            
        tab = viewer.down('[profilerId=' + profilerId + ']');
        if (!tab) {
            tab = this.getProfilerTab();
            tab.down('button[action=viewintab]').destroy();
        }

        tab.setTitle(title);
        tab.profiler = profiler;
        tab.profilerId = profilerId;
        tab.update(profiler.data);

        viewer.add(tab);
        viewer.setActiveTab(tab);            
        
        return tab;
    }
});
