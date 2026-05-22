
Ext.define('App.model.hris.leave.Leave_list', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'user_id', type:'integer'},
        {name:'lt_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'remarks', type:'string'},
        {name:'leave_date', type:'date'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Leave_list.select,
            create: HRIS_Leave_list.add,
            update: HRIS_Leave_list.update,
            destroy: HRIS_Leave_list.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});