
Ext.define('App.model.transactions.management_properti.Invoice_rent', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'due_date', type:'date'},
        {name:'registration_id', type:'integer'},
        {name:'registration_uni_id', type:'integer'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'building_id', type:'string'},
        {name:'building_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'floor_id', type:'string'},
        {name:'facing_id', type:'string'},
        {name:'facing_name', type:'string'},
        {name:'cluster_id', type:'string'},
        {name:'cluster_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'sales_id', type:'string'},
        {name:'sales_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'tax_date', type:'string'},
        {name:'tax_no', type:'string'},
        {name:'qty', type:'float'},
        {name:'qty_loses', type:'float'},
        {name:'qty_invoice', type:'float'},
        {name:'price', type:'float'},
        {name:'price_ppn', type:'float'},
        {name:'price_pph', type:'float'},
        {name:'total_price', type:'float'},
        {name:'area_m2', type:'float'},
        {name:'receivable', type:'float'},
        {name:'outstanding_receivable', type:'float'},
        {name:'coa_receivable', type:'string'},
        {name:'coa_add_billing', type:'string'},
        {name:'coa_add_billing_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Generate_rent.select_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});