
Ext.define('App.model.transactions.purchase_order.Purchase_order_in', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'remarks', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'qty_in', type:'float'},
        {name:'qty_out', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Purchase_order_in.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});