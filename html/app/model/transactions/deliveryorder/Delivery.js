
Ext.define('App.model.transactions.deliveryorder.Delivery', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'due_date', type:'date'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'sales_id', type:'string'},
        {name:'sales_name', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_do', type:'float'},
        {name:'price_loco', type:'float'},
        {name:'price_transport', type:'float'},
        {name:'price_promotion', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order.select_delivery
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});