
Ext.define('App.model.transactions.ap_invoice.AP_Payment_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_type', type:'string'},
        {name:'outstanding_liability', type:'float'},
        {name:'for_doc_av', type:'string'},
        {name:'outstanding_advance', type:'float'},
        {name:'reference_id', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'payment_id', type:'string'},
        {name:'payment_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'status', type:'string'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AP_Payment.selectdetail,
            create: AP_Payment.adddetail,
            update: AP_Payment.updatedetail,
            destroy: AP_Payment.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});