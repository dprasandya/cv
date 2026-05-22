
Ext.define('App.model.transactions.ar_invoice.AR_Invoice', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'seq_id', type:'integer'},
        {name:'start_billing', type:'date'},
        {name:'billing_month', type:'float'},
        {name:'outstanding_month', type:'float'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'payment_id', type:'string'},
        {name:'payment_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'full_name', type:'string'},
        {name:'cluster_id', type:'string'},
        {name:'cluster_name', type:'string'},
        {name:'floor_id', type:'string'},
        {name:'facing_id', type:'string'},
        {name:'facing_name', type:'string'},
        {name:'building_id', type:'string'},
        {name:'building_name', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Invoice.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});