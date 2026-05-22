
Ext.define('App.model.hris.Attendance.Overtime_rate', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'hours_from', type:'integer'},
        {name:'hours_to', type:'integer'},
        {name:'rate_value', type:'float'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Overtime_rate.select,
            create: HRIS_Overtime_rate.add,
            update: HRIS_Overtime_rate.update,
            destroy: HRIS_Overtime_rate.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});