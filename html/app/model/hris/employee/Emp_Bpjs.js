
Ext.define('App.model.hris.employee.Emp_Bpjs', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'salary', type:'float'},
        {name:'rate', type:'float'},
        {name:'nominal', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Bpjs.select,
            create: HRIS_Emp_Bpjs.add,
            update: HRIS_Emp_Bpjs.update,
            destroy: HRIS_Emp_Bpjs.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});