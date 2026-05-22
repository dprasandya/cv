
Ext.define('App.model.transactions.project.Work_order', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'contract_no', type:'string'},
        {name:'contract_date', type:'string'},
        {name:'contract_value', type:'float'},
        {name:'retention_prs', type:'float'},
        {name:'retention_value', type:'float'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'unit_building_id', type:'string'},
        {name:'unit_building_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'tax_id', type:'string'},
        {name:'tax_name', type:'string'},
        {name:'tax_date', type:'date'},
        {name:'tax_no', type:'string'},
        {name:'start_date', type:'date'},
        {name:'end_date', type:'date'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'nominal', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Work_order.select,
            create: Work_order.add,
            update: Work_order.update,
            destroy: Work_order.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});