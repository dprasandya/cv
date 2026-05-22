
Ext.define('App.model.transactions.production.Production_row_material_fi', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'item_id', type:'string'},
        {name:'item_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_last', type:'float'},
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
            read: Production_row_material_fi.select,
            create: Production_row_material_fi.add,
            update: Production_row_material_fi.update,
            destroy: Production_row_material_fi.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});