
Ext.define('App.model.transactions.tax.JurnalTax_payment', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'vend_cust_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'nominal', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: JurnalTax_payment.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});