
Ext.define('App.model.transactions.management_properti.ServiceCharge_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'area_m2', type:'float'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'cust_id', type:'string'},
        {name:'cust_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'unit_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'coa_receivable', type:'string'},
        {name:'receivable', type:'float'},
        {name:'tax_id', type:'string'},
        {name:'tax_no', type:'string'},
        {name:'tax_date', type:'date'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: ServiceCharge.select_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});