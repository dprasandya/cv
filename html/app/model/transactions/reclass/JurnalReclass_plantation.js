
Ext.define('App.model.transactions.reclass.JurnalReclass_plantation', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
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
            read: JurnalReclass_plantation.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});