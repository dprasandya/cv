
Ext.define('App.model.transactions.reclass.Reclass_afdeling_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'status', type:'bool'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Reclass_afdeling.select_detail,
            create: Reclass_afdeling.add_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});