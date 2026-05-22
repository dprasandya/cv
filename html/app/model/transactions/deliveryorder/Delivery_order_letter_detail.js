
Ext.define('App.model.transactions.deliveryorder.Delivery_order_letter_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'int'},
        {name:'for_doc_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'item_type', type:'string'},
        {name:'qty', type:'float'},
        {name:'status', type:'string'},
        {name:'aktif', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order_letter.selectdetail,
            update: Delivery_order_letter.updatedetail,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});