
Ext.define('App.model.hris.Pph21.Pph21_unpost', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'period', type:'string'},
        {name:'sub_period', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'ptkp_id', type:'string'},
        {name:'ptkp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'dept_id', type:'string'},
        {name:'dept_name', type:'string'},
        {name:'job_id', type:'string'},
        {name:'job_name', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21_unpost.select,
            create: HRIS_Pph21_unpost.add
        }
    }
});