
Ext.define('App.model.transactions.reclass.JurnalReclass_plasma', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'},
        {name:'period', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: JurnalReclass_plasma.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});