
Ext.define('App.model.hris.employee.LoanOffice', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'description', type:'string'},
        {name:'live_year', type:'float'},
        {name:'live_month', type:'float'},
        {name:'live_month', type:'float'},
        {name:'total', type:'float'},
        {name:'nominal_month', type:'float'},
        {name:'outstanding_month', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_LoanOffice.select,
            create: HRIS_LoanOffice.add,
            update: HRIS_LoanOffice.update,
            destroy: HRIS_LoanOffice.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});