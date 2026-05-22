
Ext.define('App.model.transactions.purchase_order.Purchase_order_in_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'price', type:'float'},
        {name:'item_id_new', type:'string'},
        {name:'item_name_new', type:'string'},
        {name:'unit_id_new', type:'string'},
        {name:'qty_new', type:'float'},
        {name:'price_new', type:'float'},
        {name:'total_new', type:'float'},
        {name:'status', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Purchase_order_in.selectdetail,
            create: Purchase_order_in.adddetail,
            update: Purchase_order_in.updatedetail,
            destroy: Purchase_order_in.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});