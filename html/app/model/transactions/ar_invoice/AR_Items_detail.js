
Ext.define('App.model.transactions.ar_invoice.AR_Items_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'item_type', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'qty_stock', type:'float'},
        {name:'qty', type:'float'},
        {name:'price_sale', type:'float'},
        {name:'total', type:'float'},
        {name:'price_bb', type:'float'},
        {name:'price_ohp', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Items.selectdetail,
            create: AR_Items.adddetail,
            update: AR_Items.updatedetail,
            destroy: AR_Items.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});