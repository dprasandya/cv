
Ext.define('App.model.hris.Attendance.Shift_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'shift', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'seq_id_detail', type:'integer'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Shift_detail.select,
            create: HRIS_Shift_detail.add,
            update: HRIS_Shift_detail.update,
            destroy: HRIS_Shift_detail.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});