
Ext.define('App.model.transactions.marketing.Registration_unit_co_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'seq_id', type:'integer'},
        {name:'cust_id', type:'string'},
        {name:'full_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'qty', type:'float'},
        {name:'dpp', type:'float'},
        {name:'ppn', type:'float'},
        {name:'pph', type:'float'},
        {name:'service_charge', type:'float'},
        {name:'total', type:'float'},
        {name:'outstanding_receivable', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration_unit_co.select_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});