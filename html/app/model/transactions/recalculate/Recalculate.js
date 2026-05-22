
Ext.define('App.model.transactions.recalculate.Recalculate', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'period', type:'string'},
        {name:'remarks', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Recalculate.select,
            create: Recalculate.add,
            update: Recalculate.update,
            destroy: Recalculate.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});