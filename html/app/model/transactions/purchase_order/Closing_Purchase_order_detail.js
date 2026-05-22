
Ext.define('App.model.transactions.purchase_order.Closing_Purchase_order_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty_po', type:'float'},
        {name:'qty_grn', type:'float'},
        {name:'qty_outstanding', type:'float'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Closing_Purchase_order.selectdetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});