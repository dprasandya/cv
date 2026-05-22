
Ext.define('App.model.hris.leave.Leave_list_approval', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'user_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'emp_spv_id', type:'string'},
        {name:'emp_spv_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'approval_date', type:'date'},
        {name:'approval_status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Leave_list_approval.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});