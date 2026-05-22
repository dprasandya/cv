
Ext.define('App.model.hris.employee.Job_status', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'inc_premi', type:'bool'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Job_status.select,
            create: HRIS_Job_status.add,
            update: HRIS_Job_status.update,
            destroy: HRIS_Job_status.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});