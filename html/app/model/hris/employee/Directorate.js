
Ext.define('App.model.hris.employee.Directorate', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'directorate_id', type:'string'},
        {name:'directorate_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Directorate.select,
            create: HRIS_Directorate.add,
            update: HRIS_Directorate.update,
            destroy: HRIS_Directorate.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});