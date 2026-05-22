
Ext.define('App.model.transactions.salesorder.Charts_order', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'monthx', type:'string'},
        {name:'qty', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Charts_order.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});