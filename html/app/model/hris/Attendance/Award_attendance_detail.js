
Ext.define('App.model.hris.Attendance.Award_attendance_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'from_rate', type:'float'},
        {name:'to_rate', type:'float'},
        {name:'amount', type:'float'},
        {name:'remarks', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Award_attendance.select_detail,
            create: HRIS_Award_attendance.add_detail,
            update: HRIS_Award_attendance.update_detail,
            destroy: HRIS_Award_attendance.delete_detail
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});