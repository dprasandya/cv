
Ext.define('App.model.hris.Attendance.Attendance_sharing_id', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_name', type:'string'},
        {name:'emp_id_01', type:'string'},
        {name:'emp_id_02', type:'string'},
        {name:'emp_id_03', type:'string'},
        {name:'emp_id_04', type:'string'},
        {name:'emp_id_05', type:'string'},
        {name:'company_id_01', type:'string'},
        {name:'company_id_02', type:'string'},
        {name:'company_id_03', type:'string'},
        {name:'company_id_04', type:'string'},
        {name:'company_id_05', type:'string'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Attendance_sharing_id.select,
            create: HRIS_Attendance_sharing_id.add,
            update: HRIS_Attendance_sharing_id.update,
            destroy: HRIS_Attendance_sharing_id.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});