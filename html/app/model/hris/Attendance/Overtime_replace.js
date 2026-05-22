
Ext.define('App.model.hris.Attendance.Overtime_replace', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'time_hours', type:'float'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeinput', type:'date'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime_replace.select,
            create: HRIS_Overtime_replace.add,
            update: HRIS_Overtime_replace.update,
            destroy: HRIS_Overtime_replace.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});