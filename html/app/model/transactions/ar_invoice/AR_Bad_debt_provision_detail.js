
Ext.define('App.model.transactions.ar_invoice.AR_Bad_debt_provision_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'outstanding_receivable', type:'float'},
        {name:'for_doc_av', type:'string'},
        {name:'outstanding_advance', type:'float'},
        {name:'unit_building_av', type:'string'},
        {name:'reference_id', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'payment_id', type:'string'},
        {name:'payment_name', type:'string'},
        {name:'percent', type:'float'},
        {name:'nominal', type:'float'},
        {name:'active', type:'bool'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: AR_Bad_debt_provision.selectdetail,
            update: AR_Bad_debt_provision.updatedetail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        },
        autoLoad: true
    }
});