
Ext.define('App.model.transactions.ap_invoice.AP_Deduction', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'cflow_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'reference_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AP_Deduction.select,
            create: AP_Deduction.add,
            update: AP_Deduction.update,
            destroy: AP_Deduction.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});