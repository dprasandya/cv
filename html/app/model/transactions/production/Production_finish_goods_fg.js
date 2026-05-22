
Ext.define('App.model.transactions.production.Production_finish_goods_fg', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'shift', type:'string'},
        {name:'remarks', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Production_finish_goods_fg.select,
            create: Production_finish_goods_fg.add,
            update: Production_finish_goods_fg.update,
            destroy: Production_finish_goods_fg.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});