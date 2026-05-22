
Ext.define('App.model.hris.Attendance.Overtime_request', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'overtime_date', type:'date'},
        {name:'remarks', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime_request.select,
            create: HRIS_Overtime_request.add,
            update: HRIS_Overtime_request.update,
            destroy: HRIS_Overtime_request.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});