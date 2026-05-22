
Ext.define('App.model.hris.Attendance.Outstation', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'fromdate', type:'date'},
        {name:'todate', type:'date'},
        {name:'status', type:'bool'},
        {name:'remarks', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Outstation.select,
            create: HRIS_Outstation.add,
            update: HRIS_Outstation.update,
            destroy: HRIS_Outstation.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});