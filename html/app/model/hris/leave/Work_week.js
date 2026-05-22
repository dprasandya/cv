
Ext.define('App.model.hris.leave.Work_week', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'day_id', type:'string'},
        {name:'day_name', type:'string'},
        {name:'day_time', type:'string'},
        {name:'time_in', type:'time'},
        {name:'time_out', type:'time'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Work_week.select,
            create: HRIS_Work_week.add,
            update: HRIS_Work_week.update,
            destroy: HRIS_Work_week.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});