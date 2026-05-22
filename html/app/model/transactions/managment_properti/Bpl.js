
Ext.define('App.model.transactions.management_properti.bpl', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'qty_begin', type:'float'},
        {name:'qty_ending', type:'float'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Bpl.select,
            create: Bpl.add,
            update: Bpl.update,
            destroy: Bpl.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});