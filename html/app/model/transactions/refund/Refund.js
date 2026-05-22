
Ext.define('App.model.transactions.refund.Refund', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'cflow_id', type:'string'},
        {name:'cflow_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'outstanding_advance', type:'float'},
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
            read: Refund.select,
            create: Refund.add,
            update: Refund.update,
            destroy: Refund.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});