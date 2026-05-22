
Ext.define('App.model.transactions.stock.Stock_in_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'warehouse_id', type:'string'},
        {name:'warehouse_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'item_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_stock', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Stock_in.select_detail,
            update: Stock_in.update_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});