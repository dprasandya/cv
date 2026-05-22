
Ext.define('App.model.hris.leave.Type', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'lt_id', type:'string'},
        {name:'lt_name', type:'string'},
        {name:'lt_situational', type:'string'},
        {name:'remarks', type:'string'},
        {name:'active', type:'bool'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Lv_Type.select,
            create: HRIS_Lv_Type.add,
            update: HRIS_Lv_Type.update,
            destroy: HRIS_Lv_Type.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});