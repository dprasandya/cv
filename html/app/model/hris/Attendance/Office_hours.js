
Ext.define('App.model.hris.Attendance.Office_hours', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'oh_id', type:'string'},
        {name:'oh_name', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Office_hours.select,
            create: HRIS_Office_hours.add,
            update: HRIS_Office_hours.update,
            destroy: HRIS_Office_hours.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});