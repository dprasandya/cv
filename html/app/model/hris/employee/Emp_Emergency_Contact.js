
Ext.define('App.model.hris.employee.Emp_Emergency_Contact', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_id', type:'string'},
        {name:'contact_name', type:'string'},
        {name:'contact_status', type:'string'},
        {name:'contact_home_tlp', type:'string'},
        {name:'contact_work_tlp', type:'string'},
        {name:'contact_mobile_tlp', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Emp_Emergency_Contact.select,
            create: HRIS_Emp_Emergency_Contact.add,
            update: HRIS_Emp_Emergency_Contact.update,
            destroy: HRIS_Emp_Emergency_Contact.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});