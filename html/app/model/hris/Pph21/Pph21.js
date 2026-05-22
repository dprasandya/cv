
Ext.define('App.model.hris.Pph21.Pph21', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'period', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'emp_name', type:'string'},
        {name:'ptkp_id', type:'string'},
        {name:'wp_personal', type:'float'},
        {name:'wp_additional', type:'float'},
        {name:'wp_total', type:'float'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'sc_type', type:'string'},
        {name:'pay_frequency', type:'string'},
        {name:'day_index', type:'float'},
        {name:'amount', type:'float'},
        {name:'total_amount', type:'float'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Pph21.select,
            create: HRIS_Pph21.add
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});