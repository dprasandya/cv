
Ext.define('App.model.hris.employee.Job_title', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'job_id', type:'string'},
        {name:'job_desc', type:'string'},
        {name:'remarks', type:'string'},
        {name:'inc_attendance', type:'bool'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Job_title.select,
            create: HRIS_Job_title.add,
            update: HRIS_Job_title.update,
            destroy: HRIS_Job_title.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});