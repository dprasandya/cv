
Ext.define('App.model.transactions.cashbank.Cashbon', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'cflow_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Cashbon.select,
            create: Cashbon.add,
            update: Cashbon.update,
            destroy: Cashbon.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});