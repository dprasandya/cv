
Ext.define('App.model.hris.Attendance.Schedule_non_shift', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'company_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'pos_id', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'group_id', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Schedule_non_shift.select,
            create: HRIS_Schedule_shift.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});