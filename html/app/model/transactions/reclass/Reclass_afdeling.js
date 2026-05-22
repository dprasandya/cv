
Ext.define('App.model.transactions.reclass.Reclass_afdeling', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'total', type:'float'},
        {name:'qty_seedling', type:'float'},
        {name:'area', type:'float'},
        {name:'status', type:'string'},
        {name:'remarks', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Reclass_afdeling.select,
            create: Reclass_afdeling.add,
            update: Reclass_afdeling.update,
            destroy: Reclass_afdeling.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});