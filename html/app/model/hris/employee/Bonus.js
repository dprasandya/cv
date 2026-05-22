
Ext.define('App.model.hris.employee.Bonus', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'emp_job_id', type:'string'},
        {name:'emp_job_desc', type:'string'},
        {name:'bt_type', type:'string'},
        {name:'period', type:'string'},
        {name:'sc_id_01', type:'string'},
        {name:'sc_name_01', type:'string'},
        {name:'nominal_01', type:'float'},
        {name:'sc_id_02', type:'string'},
        {name:'nominal_02', type:'float'},
        {name:'total', type:'float'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Bonus.select,
            update: HRIS_Bonus.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});