
Ext.define('App.model.hris.Pph21.Bpjs', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'bpjs_type', type:'string'},
        {name:'bpjs_id', type:'string'},
        {name:'bpjs_name', type:'string'},
        {name:'salary', type:'float'},
        {name:'inc_salary_employee', type:'bool'},
        {name:'limit_inc_salary_employee', type:'float'},
        {name:'sc_id_company', type:'string'},
        {name:'sc_name_company', type:'string'},
        {name:'rate_company', type:'float'},
        {name:'nominal_company', type:'float'},
        {name:'sc_id_employee', type:'string'},
        {name:'sc_name_employee', type:'string'},
        {name:'rate_employee', type:'float'},
        {name:'nominal_employee', type:'float'},
        {name:'active', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Bpjs.select,
            create: HRIS_Bpjs.add,
            update: HRIS_Bpjs.update,
            destroy: HRIS_Bpjs.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});