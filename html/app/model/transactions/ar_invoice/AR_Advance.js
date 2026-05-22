
Ext.define('App.model.transactions.ar_invoice.AR_Advance', {
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
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
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
            read: AR_Advance.select,
            create: AR_Advance.add,
            update: AR_Advance.update,
            destroy: AR_Advance.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});