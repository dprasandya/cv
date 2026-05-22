
Ext.define('App.model.transactions.ap_invoice.Workshop_detail_coa', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'unit_id', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Workshop_detail_coa.select,
            create: Workshop_detail_coa.add,
            update: Workshop_detail_coa.update,
            destroy: Workshop_detail_coa.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});