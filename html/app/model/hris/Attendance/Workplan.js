
Ext.define('App.model.hris.Attendance.Workplan', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_type', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'active', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Workplan.select,
            create: HRIS_Workplan.add,
            update: HRIS_Workplan.update,
            destroy: HRIS_Workplan.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});