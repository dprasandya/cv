
Ext.define('App.model.transactions.reclass.Reclass', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'name_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'doc_id_rm', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'qty_tbs', type:'string'},
        {name:'period', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Reclass.select,
            create: Reclass.add,
            update: Reclass.update,
            destroy: Reclass.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});