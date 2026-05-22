
Ext.define('App.model.transactions.marketing.Room_status', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'full_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'cluster_id', type:'string'},
        {name:'cluster_name', type:'string'},
        {name:'floor_id', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'rs_id', type:'string'},
        {name:'price_brutto', type:'float'},
        {name:'voucher_value', type:'float'},
        {name:'price', type:'float'},
        {name:'price_sc', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'rs_name', type:'string'},
        {name:'start_rent', type:'date'},
        {name:'end_rent', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Room_status.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});