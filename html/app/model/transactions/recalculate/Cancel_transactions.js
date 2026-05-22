
Ext.define('App.model.transactions.recalculate.Cancel_transactions', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'module', type:'string'},
        {name:'period', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'item_id', type:'string'},
        {name:'supplier_customer', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'nominal', type:'float'},
        {name:'remarks', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Cancel_transactions.select,
            create: Cancel_transactions.add,
            update: Cancel_transactions.update,
            destroy: Cancel_transactions.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});