
Ext.define('App.model.transactions.ap_invoice.AP_Invoice_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'unit_id', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AP_Invoice.selectdetail,
            create: AP_Invoice.adddetail,
            update: AP_Invoice.updatedetail,
            destroy: AP_Invoice.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});