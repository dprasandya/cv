
Ext.define('App.model.transactions.deliveryorder.Delivery_bap', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'seq_id', type:'int'},
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'city', type:'string'},
        {name:'address', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty_do', type:'float'},
        {name:'qty_received', type:'float'},
        {name:'arrived_date', type:'date'},
        {name:'bap_date', type:'date'},
        {name:'bap_status', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'trucking_no', type:'string'},
        {name:'container_no', type:'string'},
        {name:'vessel_voyage', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order.select_delivery_bap,
            update: Delivery_order.update_delivery_bap,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});