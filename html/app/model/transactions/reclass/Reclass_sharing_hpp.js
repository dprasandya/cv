
Ext.define('App.model.transactions.reclass.Reclass_sharing_hpp', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'percentase', type:'float'},
        {name:'nominal', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Reclass_sharing_hpp.select,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});