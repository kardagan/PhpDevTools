Ext.define('PhpDevTools.view.profiler.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',
    
    requires: ['PhpDevTools.view.profiler.Show'],
    
    activeItem: 0,
    margin: '5 5 5 0',
    
    cls: 'preview',
    
    initComponent: function() {
        this.items = [];
        this.callParent(arguments);
    }
});