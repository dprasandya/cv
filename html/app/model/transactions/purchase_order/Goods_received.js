
Ext.define('App.model.transactions.purchase_order.Goods_received', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'requester', type:'string'},
        {name:'department', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'qty', type:'float'},
        {name:'qty_grn', type:'float'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Goods_received.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});