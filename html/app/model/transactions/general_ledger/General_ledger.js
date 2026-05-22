
Ext.define('App.model.transactions.general_ledger.General_ledger', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'nominal', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: General_ledger.select,
            create: General_ledger.add,
            update: General_ledger.update,
            destroy: General_ledger.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});