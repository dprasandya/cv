
Ext.define('App.model.transactions.cashbank.Budget', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_name', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'request_by', type:'string'},
        {name:'status', type:'string'},
        {name:'nominal', type:'float'},
        {name:'standard', type:'float'},
        {name:'actual', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'},
        {name:'from_period', type:'string'},
        {name:'to_period', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Budget.select,
            create: Budget.add,
            update: Budget.update,
            destroy: Budget.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});