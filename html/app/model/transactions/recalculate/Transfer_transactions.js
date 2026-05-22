
Ext.define('App.model.transactions.recalculate.Transfer_transactions', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'module', type:'string'},
        {name:'period', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'vend_cust_id', type:'string'},
        {name:'vend_cust_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'nominal', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Transfer_transactions.select,
            create: Transfer_transactions.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});