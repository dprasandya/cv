
Ext.define('App.model.transactions.stock.JurnalStock_opname', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'warehouse_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty_opname', type:'float'},
        {name:'qty_last', type:'float'},
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
            read: JurnalStock_opname.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});