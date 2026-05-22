
Ext.define('App.model.transactions.purchase_order.Purchase_order', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'requester', type:'string'},
        {name:'department_id', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}

    ],
    proxy:{
        type:'direct',
        api:{
            read: Purchase_order.select,
            create: Purchase_order.add,
            update: Purchase_order.update,
            destroy: Purchase_order.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});