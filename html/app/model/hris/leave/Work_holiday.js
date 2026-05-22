
Ext.define('App.model.hris.leave.Work_holiday', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'holiday_date', type:'date'},
        {name:'holiday_name', type:'string'},
        {name:'day_time', type:'string'},
        {name:'repeats_annually', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Work_holiday.select,
            create: HRIS_Work_holiday.add,
            update: HRIS_Work_holiday.update,
            destroy: HRIS_Work_holiday.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});