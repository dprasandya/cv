
Ext.define('App.model.hris.Attendance.Award_attendance', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'unit_name', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'price', type:'float'},
        {name:'remarks', type:'string'},
        {name:'inc_attendance', type:'bool'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Award_attendance.select,
            create: HRIS_Award_attendance.add,
            update: HRIS_Award_attendance.update,
            destroy: HRIS_Award_attendance.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});