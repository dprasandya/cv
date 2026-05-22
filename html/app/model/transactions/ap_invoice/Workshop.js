
Ext.define('App.model.transactions.ap_invoice.Workshop', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'due_date', type:'date'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'liability', type:'float'},
        {name:'outstanding_liability', type:'float'},
        {name:'afdeling_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Workshop.select,
            create: Workshop.add,
            update: Workshop.update,
            destroy: Workshop.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});