
Ext.define('App.model.hris.Attendance.Overtime_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'overtime_date', type:'date'},
        {name:'time_hours', type:'integer'},
        {name:'rate_hours', type:'integer'},
        {name:'rate_value', type:'float'},
        {name:'rate_total', type:'float'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime_detail.select
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});