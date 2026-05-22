
Ext.define('App.model.transactions.ar_invoice.AR_Items_do', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Items_do.select,
            update: AR_Items_do.update,
            destroy: AR_Items_do.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});