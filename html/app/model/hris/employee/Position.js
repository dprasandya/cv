
Ext.define('App.model.hris.employee.Position', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'pos_id', type:'string'},
        {name:'pos_name', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Position.select,
            create: HRIS_Position.add,
            update: HRIS_Position.update,
            destroy: HRIS_Position.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});