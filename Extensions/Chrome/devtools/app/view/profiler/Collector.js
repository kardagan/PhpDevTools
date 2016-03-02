Ext.define('PhpDevTools.view.profiler.Collector', {
    extend:'Ext.panel.Panel',
    flex:1,
    closable: false,
    display : function ( profiler ) {
        this.add({
            html : profiler.get('data')
        })
    }
});