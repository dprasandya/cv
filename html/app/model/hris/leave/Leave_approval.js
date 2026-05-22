
Ext.define('App.model.hris.leave.Leave_approval', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'user_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'lt_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'emp_spv_id', type:'string'},
        {name:'leave_date', type:'date'},
        {name:'status', type:'status'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Leave_approval.select,
            create: HRIS_Leave_approval.add,
            update: HRIS_Leave_approval.update,
            destroy: HRIS_Leave_approval.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});