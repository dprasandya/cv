
Ext.define('App.model.transactions.project.Work_order_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'payment_date', type:'date'},
        {name:'progress_prs', type:'float'},
        {name:'claim_date', type:'date'},
        {name:'claim_value', type:'float'},
        {name:'claim_total', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Work_order_detail.select,
            create: Work_order_detail.add,
            update: Work_order_detail.update,
            destroy: Work_order_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});