
Ext.define('App.model.transactions.stock.Warehouse_tx_rx_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'item_type', type:'string'},
        {name:'qty_last', type:'float'},
        {name:'qty', type:'float'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Warehouse_tx_rx_detail.select,
            create: Warehouse_tx_rx_detail.add,
            update: Warehouse_tx_rx_detail.update,
            destroy: Warehouse_tx_rx_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});