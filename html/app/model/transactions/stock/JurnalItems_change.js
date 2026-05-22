
Ext.define('App.model.transactions.stock.JurnalItems_change', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty_stock', type:'float'},
        {name:'item_id_new', type:'string'},
        {name:'item_name_new', type:'string'},
        {name:'item_type_new', type:'string'},
        {name:'unit_id_new', type:'string'},
        {name:'qty_new', type:'float'},
        {name:'price_bb', type:'float'},
        {name:'price_ohp', type:'float'},
        {name:'total_price', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Items_change.select_jurnal
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});