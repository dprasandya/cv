
Ext.define('App.model.transactions.ap_invoice.Workshop_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'total', type:'float'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'formula_name', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_formula', type:'float'},
        {name:'qty_menu', type:'float'},
        {name:'qty_stock', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Workshop_detail.select,
            update: Workshop_detail.update,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});