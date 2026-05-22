
Ext.define('App.model.hris.Pph21.Salary_component', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'id_sort', type:'integer'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'rate', type:'float'},
        {name:'rate_nominal', type:'float'},
        {name:'inc_bpjs_calculation', type:'float'},
        {name:'rate_sc_id', type:'string'},
        {name:'take_home_pay', type:'bool'},
        {name:'pph21_form', type:'bool'},
        {name:'pph21_form_join_to', type:'string'},
        {name:'summary_group', type:'string'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21_Salary_component.select,
            create: HRIS_Pph21_Salary_component.add,
            update: HRIS_Pph21_Salary_component.update,
            destroy: HRIS_Pph21_Salary_component.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});