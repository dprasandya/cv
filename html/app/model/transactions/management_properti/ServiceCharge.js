
Ext.define('App.model.transactions.management_properti.ServiceCharge', {
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
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
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
            read: ServiceCharge.select,
            create: ServiceCharge.add,
            update: ServiceCharge.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});