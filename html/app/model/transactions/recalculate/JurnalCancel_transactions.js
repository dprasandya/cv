
Ext.define('App.model.transactions.recalculate.JurnalCancel_transactions', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'vend_cust_id', type:'string'},
        {name:'vend_cust_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: JurnalCancel_transactions.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});