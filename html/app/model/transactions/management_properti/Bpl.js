
Ext.define('App.model.transactions.management_properti.Bpl', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'registration_id', type:'integer'},
        {name:'registration_unit_id', type:'integer'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'cluster_id', type:'string'},
        {name:'cluster_name', type:'string'},
        {name:'building_id', type:'string'},
        {name:'building_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'bpl_id', type:'string'},
        {name:'bpl_name', type:'string'},
        {name:'qty_begin', type:'float'},
        {name:'qty_ending', type:'float'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'tax_id', type:'string'},
        {name:'tax_no', type:'string'},
        {name:'tax_date', type:'date'},
        {name:'unit_id', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Bpl.select,
            create: Bpl.add,
            update: Bpl.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});