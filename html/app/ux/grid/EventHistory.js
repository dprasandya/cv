
Ext.define('App.ux.grid.EventHistory',{
    extend: 'Ext.grid.Panel',
    alias : 'widget.mitos.eventhistorygrid',
    initComponent:function(){
        Ext.apply(this,{
            columns: [
                { header: _('date'),  dataIndex: 'date', width: 140, renderer: Ext.util.Format.dateRenderer('Y-m-d g:i:s a') },
                { header: _('user'),  dataIndex: 'user', width: 150 },
                { header: _('event'), dataIndex: 'event', flex: 1 }
            ]
        },null);

        this.callParent(arguments);
    }
});