
Ext.define('App.model.hris.Pph21.BpjsRate', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'bpjs_id', type:'string'},
        {name:'sc_id', type:'string'},
        {name:'sc_name', type:'string'},
        {name:'amount', type:'float'},
        {name:'nominal', type:'float'},
        {name:'active', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Bpjs.select_rate,
            create: HRIS_Bpjs.add_rate,
            update: HRIS_Bpjs.update_rate,
            destroy: HRIS_Bpjs.delete_rate
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});