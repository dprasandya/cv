
Ext.define('App.model.transactions.reclass.JurnalReclass_TBM', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'period', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: JurnalReclass_TBM.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});