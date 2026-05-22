
Ext.define('App.model.hris.Attendance.Overtime_request_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'seq_id_detail', type:'integer'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'job_desc', type:'string'},
        {name:'output_desc', type:'string'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime_request_detail.select,
            create: HRIS_Overtime_request_detail.add,
            update: HRIS_Overtime_request_detail.update,
            destroy: HRIS_Overtime_request_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});