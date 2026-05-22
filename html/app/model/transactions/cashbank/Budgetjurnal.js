
Ext.define('App.model.transactions.cashbank.Budgetjurnal', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_header', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
       
    ],
    proxy:{
        type:'direct',
        api:{
            read: Budgetjurnal.select
           
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});