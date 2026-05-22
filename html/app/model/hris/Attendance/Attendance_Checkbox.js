
Ext.define('App.model.hris.Attendance.Attendance_Checkbox', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'attendance_date', type:'date'},
        {name:'day_name', type:'string'},
        {name:'late_time', type:'float'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'pos_id', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'group_id', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Attendance.select_checkbox,
            create: HRIS_Attendance.add,
            update: HRIS_Attendance.update,
            destroy: HRIS_Attendance.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});