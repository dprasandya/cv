
Ext.define('App.model.transactions.marketing.Registration_change_view', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
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
        {name:'first_name_old', type:'string'},
        {name:'last_name_old', type:'string'},
        {name:'full_name_old', type:'string'},
        {name:'identity_type_old', type:'string'},
        {name:'identity_no_old', type:'string'},
        {name:'religion_old', type:'string'},
        {name:'merriage_status_old', type:'string'},
        {name:'blood_type_old', type:'string'},
        {name:'address_old', type:'string'},
        {name:'city_old', type:'string'},
        {name:'nationality_old', type:'string'},
        {name:'gender_old', type:'string'},
        {name:'home_phone_old', type:'string'},
        {name:'mobile_phone_old', type:'string'},
        {name:'cust_id_old', type:'string'},
        {name:'cust_name_old', type:'string'},
        {name:'cust_contact_old', type:'string'},
        {name:'cust_npwp_old', type:'string'},
        {name:'sales_id', type:'string'},
        {name:'status', type:'string'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration_change.select_view
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});