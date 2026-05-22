
Ext.define('App.model.transactions.purchase_order.Borrow_items', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'due_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'vend_cust_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price_bb', type:'float'},
        {name:'price_ohp', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'qty_return', type:'float'},
        {name:'qty_outstanding', type:'float'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Borrow_items.select,
            create: Borrow_items.add,
            update: Borrow_items.update,
            destroy: Borrow_items.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});