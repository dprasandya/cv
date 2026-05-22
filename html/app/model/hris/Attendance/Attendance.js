
Ext.define('App.model.hris.Attendance.Attendance', {
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
        {name:'duration', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Attendance.select,
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