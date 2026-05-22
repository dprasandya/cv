
Ext.define('App.model.hris.Attendance.Office_hours_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'oh_id', type:'string'},
        {name:'day_id', type:'string'},
        {name:'day_name', type:'string'},
        {name:'day_type', type:'string'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Office_hours_detail.select,
            create: HRIS_Office_hours_detail.add,
            update: HRIS_Office_hours_detail.update,
            destroy: HRIS_Office_hours_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});