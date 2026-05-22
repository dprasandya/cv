
Ext.define('App.model.transactions.production.Production_row_material_coa', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Production_row_material_coa.select,
            create: Production_row_material_coa.add,
            update: Production_row_material_coa.update,
            destroy: Production_row_material_coa.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});