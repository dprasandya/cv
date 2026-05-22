
Ext.define('App.model.transactions.general_ledger.Audit_adjustment', {
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
            read: Audit_adjustment.select,
            create: Audit_adjustment.add,
            update: Audit_adjustment.update,
            destroy: Audit_adjustment.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});