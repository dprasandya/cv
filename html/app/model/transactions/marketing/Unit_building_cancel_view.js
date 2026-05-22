
Ext.define('App.model.transactions.marketing.Unit_building_cancel_view', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'doc_date', type:'date'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'building_id', type:'string'},
        {name:'building_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'facing_id', type:'string'},
        {name:'facing_name', type:'string'},
        {name:'cluster_id', type:'string'},
        {name:'cluster_name', type:'string'},
        {name:'floor_id', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'status', type:'bool'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Unit_building_cancel.select_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});