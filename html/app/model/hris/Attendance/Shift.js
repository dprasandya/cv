
Ext.define('App.model.hris.Attendance.Shift', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'shift', type:'string'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Shift.select,
            create: HRIS_Shift.add,
            update: HRIS_Shift.update,
            destroy: HRIS_Shift.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});