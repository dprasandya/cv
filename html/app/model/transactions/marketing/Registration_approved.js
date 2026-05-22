
Ext.define('App.model.transactions.marketing.Registration_approved', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'seq_id', type:'integer'},
        {name:'registration_type', type:'string'},
        {name:'full_name', type:'string'},
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
        {name:'payment_id', type:'string'},
        {name:'payment_name', type:'string'},
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
        {name:'installment_advance', type:'float'},
        {name:'remarks', type:'string'},
        {name:'start_billing', type:'date'},
        {name:'status', type:'bool'},
        {name:'approved_date', type:'date'},
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration_approved.select,
            update: Registration_approved.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});