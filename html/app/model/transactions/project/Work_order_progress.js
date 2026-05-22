
Ext.define('App.model.transactions.project.Work_order_progress', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'for_doc_id', type:'string'},
        {name:'for_doc_date', type:'date'},
        {name:'contract_no', type:'string'},
        {name:'contract_value', type:'float'},
        {name:'progress_prs', type:'float'},
        {name:'progress_value', type:'float'},
        {name:'retention_value', type:'float'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'project_type', type:'string'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'vend_id', type:'string'},
        {name:'vend_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Work_order_progress.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});