
Ext.define('App.model.transactions.cashbank.Cashbon_settlament', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'vend_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'cflow_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'nominal_settlament', type:'float'},
        {name:'outstanding', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Cashbon.select_settlament
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});