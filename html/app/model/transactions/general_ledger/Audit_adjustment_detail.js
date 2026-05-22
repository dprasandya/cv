
Ext.define('App.model.transactions.general_ledger.Audit_adjustment_detail', {
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
            read: Audit_adjustment.selectdetail,
            create: Audit_adjustment.adddetail,
            update: Audit_adjustment.updatedetail,
            destroy: Audit_adjustment.deletedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});