
Ext.define('App.model.transactions.deliveryorder.Delivery_order_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'city', type:'string'},
        {name:'address', type:'string'},
        {name:'contact', type:'string'},
        {name:'qty_so', type:'float'},
        {name:'qty_do', type:'float'},
        {name:'qty', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order.selectdetail,
            create: Delivery_order.adddetail,
            update: Delivery_order.updatedetail,
            destroy: Delivery_order.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});