
Ext.define('App.model.transactions.stock.Warehouse_rx', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'from_warehouse_id', type:'string'},
        {name:'to_warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Warehouse_rx.select,
            create: Warehouse_rx.add,
            update: Warehouse_rx.update,
            destroy: Warehouse_rx.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});