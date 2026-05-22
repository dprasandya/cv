
Ext.define('App.model.transactions.deliveryorder.Delivery_order', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'doc_return', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'route_id', type:'string'},
        {name:'route_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price_bb', type:'float'},
        {name:'price_ohp', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'coa_fail', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order.select,
            create: Delivery_order.add,
            update: Delivery_order.update,
            destroy: Delivery_order.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});