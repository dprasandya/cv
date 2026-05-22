
Ext.define('App.model.transactions.stock.Stock_opname', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'warehouse_type', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'unit_id_conversion', type:'string'},
        {name:'qty_ending', type:'float'},
        {name:'qty_ending_conversion', type:'float'},
        {name:'price_ending', type:'float'},
        {name:'price_ending_conversion', type:'float'},
        {name:'total_ending', type:'float'},
        {name:'qty_opname_conversion', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'station_id', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Stock_opname.select,
            create: Stock_opname.add,
            update: Stock_opname.update,
            destroy: Stock_opname.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});