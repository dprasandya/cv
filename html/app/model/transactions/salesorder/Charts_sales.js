
Ext.define('App.model.transactions.salesorder.Charts_sales', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'monthx', type:'string'},
        {name:'qty', type:'float'},
        {name:'sales_id', type:'string'},
        {name:'sales_name', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Charts_sales.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});