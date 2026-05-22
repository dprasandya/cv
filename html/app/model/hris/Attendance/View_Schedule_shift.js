
Ext.define('App.model.hris.Attendance.View_Schedule_shift', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'company_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'pos_id', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'group_id', type:'string'},
        {name:'schedule_date', type:'date'},
        {name:'day_type', type:'string'},
        {name:'day_name', type:'string'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Schedule_shift.select_schedule,
            update: HRIS_Schedule_shift.update_schedule
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});