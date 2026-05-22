
Ext.define('App.model.hris.Attendance.Outstation_alocation', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'seq_id_detail', type:'integer'},
        {name:'alocation_name', type:'string'},
        {name:'amount', type:'float'},
        {name:'attachment', type:'string'},
        {name:'status', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Outstation_alocation.select,
            create: HRIS_Outstation_alocation.add,
            update: HRIS_Outstation_alocation.update,
            destroy: HRIS_Outstation_alocation.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});