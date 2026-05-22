
Ext.define('App.model.hris.Mutation.Mutation', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'emp_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'emp_name', type:'string'},
        {name:'old_company_id', type:'string'},
        {name:'old_dept_id', type:'string'},
        {name:'old_job_id', type:'string'},
        {name:'old_js_id', type:'string'},
        {name:'old_ol_id', type:'string'},
        {name:'old_pos_id', type:'string'},
        {name:'new_company_id', type:'string'},
        {name:'new_dept_id', type:'string'},
        {name:'new_job_id', type:'string'},
        {name:'new_js_id', type:'string'},
        {name:'new_ol_id', type:'string'},
        {name:'new_join_date', type:'date'},
        {name:'new_pos_id', type:'string'},
        {name:'mutation_type', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: HRIS_Mutation.select,
            create: HRIS_Mutation.add,
            update: HRIS_Mutation.update,
            destroy: HRIS_Mutation.delete
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});