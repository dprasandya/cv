
Ext.define('App.model.transactions.reclass.Reclass_hpp', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'warehouse_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'qty', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'period', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Reclass_hpp.select,
            create: Reclass_hpp.add,
            update: Reclass_hpp.update,
            destroy: Reclass_hpp.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});