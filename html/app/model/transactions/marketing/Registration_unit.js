
Ext.define('App.model.transactions.marketing.Registration_unit', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'seq_id', type:'integer'},
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
        {name:'outstanding_value', type:'float'},
        {name:'status', type:'string'},
        {name:'remarks', type:'string'},
        {name:'cash_id', type:'string'},
        {name:'cash_name', type:'string'},
        {name:'start_billing', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Registration_unit.select,
            create: Registration_unit.add,
            update: Registration_unit.update,
            destroy: Registration_unit.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});