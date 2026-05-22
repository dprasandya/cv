
Ext.define('App.model.transactions.general_ledger.General_ledger_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'debit', type:'float'},
        {name:'credit', type:'float'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: General_ledger.selectdetail,
            create: General_ledger.adddetail,
            update: General_ledger.updatedetail,
            destroy: General_ledger.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});