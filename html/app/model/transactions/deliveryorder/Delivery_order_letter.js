
Ext.define('App.model.transactions.deliveryorder.Delivery_order_letter', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'job_desc', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'aktif', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Delivery_order_letter.select,
            create: Delivery_order_letter.add,
            update: Delivery_order_letter.update,
            destroy: Delivery_order_letter.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});