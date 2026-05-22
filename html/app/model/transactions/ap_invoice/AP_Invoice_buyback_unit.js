
Ext.define('App.model.transactions.ap_invoice.AP_Invoice_buyback_unit', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'due_date', type:'date'},
        {name:'tax_date', type:'date'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'registration_id', type:'integer'},
        {name:'registration_name', type:'string'},
        {name:'tax_no', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'liability', type:'float'},
        {name:'outstanding_liability', type:'float'},
        {name:'warehouse_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AP_Invoice_buyback_unit.select,
            create: AP_Invoice_buyback_unit.add,
            update: AP_Invoice_buyback_unit.update,
            destroy: AP_Invoice_buyback_unit.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});