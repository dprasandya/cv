
Ext.define('App.model.transactions.ar_invoice.AR_Payment_direct', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'tax_no', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'receivable', type:'float'},
        {name:'outstanding_receivable', type:'float'},
        {name:'payment_value', type:'float'},
        {name:'for_doc_id', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Payment_direct.select,
            create: AR_Payment_direct.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});