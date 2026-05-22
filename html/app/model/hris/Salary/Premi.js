
Ext.define('App.model.hris.Salary.Premi', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'doc_type', type:'string'},
        {name:'ol_id', type:'string'},
        {name:'ol_name', type:'string'},
        {name:'js_id', type:'string'},
        {name:'js_name', type:'string'},
        {name:'mandor_id', type:'string'},
        {name:'afdeling_id', type:'string'},
        {name:'afdeling_name', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'qty', type:'float'},
        {name:'price', type:'float'},
        {name:'total', type:'float'},
        {name:'insentif', type:'float'},
        {name:'inc_attendance', type:'string'},
        {name:'pks_type', type:'string'},
        {name:'unit_id', type:'string'},
        {name:'hk', type:'float'},
        {name:'mandor_id', type:'string'},
        {name:'kendaraan_id', type:'string'},
        {name:'attendance_status', type:'string'},
        {name:'afdeling_group', type:'string'},
        {name:'pks_afdeling', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeinput', type:'date'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Premi.select,
            update: HRIS_Premi.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});