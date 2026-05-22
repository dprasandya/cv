
Ext.define('App.model.hris.Pph21_simulation.Pph21_simulation_unpost', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'period', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'ptkp_id', type:'string'},
        {name:'ptkp_name', type:'string'},
        {name:'company_id', type:'string'},
        {name:'company_name', type:'string'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21_simulation_unpost.select,
            create: HRIS_Pph21_simulation_unpost.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});