
Ext.define('App.model.hris.Attendance.Attendance_BioFinger', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'sn_bio_finger', type:'string'},
        {name:'attendance_date', type:'date'},
        {name:'attendance_time', type:'time'},
        {name:'sensor_name', type:'string'},
        {name:'day_name', type:'string'},
        {name:'attendance_type', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'timeinput', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Attendance_BioFinger.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});