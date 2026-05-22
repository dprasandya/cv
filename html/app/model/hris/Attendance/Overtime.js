
Ext.define('App.model.hris.Attendance.Overtime', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'pos_id', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'group_id', type:'string'},
        {name:'overtime_date', type:'date'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'time_in_work', type:'time'},
        {name:'time_out_work', type:'time'},
        {name:'time_hours', type:'float'},
        {name:'time_minute', type:'float'},
        {name:'time_hours_adjustment', type:'float'},
        {name:'status', type:'bool'},
        {name:'remarks', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime.select,
            create: HRIS_Overtime.add,
            update: HRIS_Overtime.update,
            destroy: HRIS_Overtime.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});