
Ext.define('App.model.transactions.purchase_order.Closing_Purchase_order', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_grn', type:'float'},
        {name:'qty_outstanding', type:'float'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Closing_Purchase_order.select,
            update: Closing_Purchase_order.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});