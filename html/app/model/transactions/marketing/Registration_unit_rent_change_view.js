
Ext.define('App.model.transactions.marketing.Registration_unit_rent_change_view', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'registration_unit_id', type:'integer'},
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
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'total', type:'float'},
        {name:'advance_value', type:'float'},
        {name:'installment_month', type:'float'},
        {name:'outstanding_month', type:'float'},
        {name:'full_name', type:'string'},
        {name:'identity_no', type:'string'},
        {name:'status', type:'string'},
        {name:'remarks', type:'string'},
        {name:'start_rent', type:'date'},
        {name:'end_rent', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration_unit_rent_change.select_view
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});