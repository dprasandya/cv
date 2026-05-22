
Ext.define('App.model.transactions.ar_invoice.AR_Invoice_address_send', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'address', type:'string'},
        {name:'city', type:'string'},
        {name:'contact', type:'string'},
        {name:'remarks', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_loses', type:'float'},
        {name:'price_exc', type:'float'},
        {name:'total_exc', type:'float'},
        {name:'qty_so', type:'float'},
        {name:'qty_sale', type:'float'},
        {name:'qty_do', type:'float'},
        {name:'qty_do', type:'float'},
        {name:'seq_id', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Invoice.select_address_send,
            update: AR_Invoice.update_address_send,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});