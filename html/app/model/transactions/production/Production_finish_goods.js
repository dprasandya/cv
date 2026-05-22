
Ext.define('App.model.transactions.production.Production_finish_goods', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'wip_type', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'shift', type:'string'},
        {name:'shift_user', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Production_finish_goods.select,
            create: Production_finish_goods.add,
            update: Production_finish_goods.update,
            destroy: Production_finish_goods.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});