
Ext.define('App.model.hris.Attendance.Finger_delete', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'sn_bio_finger', type:'string'},
        {name:'ol_address', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'hapus_absensi', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Finger_delete.select,
            create: HRIS_Finger_delete.add,
            update: HRIS_Finger_delete.update,
            destroy: HRIS_Finger_delete.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});