
Ext.define('App.model.transactions.purchase_order.Purchase_order_out_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_return', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'tax_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'transporter_id', type:'string'},
        {name:'transporter_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'status', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Purchase_order_out.selectdetail,
            create: Purchase_order_out.adddetail,
            update: Purchase_order_out.updatedetail,
            destroy: Purchase_order_out.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});