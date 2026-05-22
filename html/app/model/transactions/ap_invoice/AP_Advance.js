
Ext.define('App.model.transactions.ap_invoice.AP_Advance', {
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
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'tax_date', type:'date'},
        {name:'tax_no', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'coa_advance', type:'string'},
        {name:'outstanding_advance', type:'float'},
        {name:'nominal', type:'float'},
        {name:'total_ppn', type:'float'},
        {name:'total_pph', type:'float'},
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
            read: AP_Advance.select,
            create: AP_Advance.add,
            update: AP_Advance.update,
            destroy: AP_Advance.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});