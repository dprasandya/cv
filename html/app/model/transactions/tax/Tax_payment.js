
Ext.define('App.model.transactions.tax.Tax_payment', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'vend_cust_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'tax_no', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'nominal', type:'float'},
        {name:'outstanding_ppn', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Tax_payment.select,
            create: Tax_payment.add,
            update: Tax_payment.update,
            destroy: Tax_payment.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});