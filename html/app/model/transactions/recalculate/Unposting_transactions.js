
Ext.define('App.model.transactions.recalculate.Unposting_transactions', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'module', type:'string'},
        {name:'period', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'item_id', type:'string'},
        {name:'supplier_customer', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'nominal', type:'float'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Unposting_transactions.select,
            create: Unposting_transactions.add,
            update: Unposting_transactions.update,
            destroy: Unposting_transactions.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});