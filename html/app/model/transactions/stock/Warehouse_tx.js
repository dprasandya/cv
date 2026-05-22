
Ext.define('App.model.transactions.stock.Warehouse_tx', {
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
            read: Warehouse_tx.select,
            create: Warehouse_tx.add,
            update: Warehouse_tx.update,
            destroy: Warehouse_tx.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});