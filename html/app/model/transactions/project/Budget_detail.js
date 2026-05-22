
Ext.define('App.model.transactions.project.Budget_detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'seq_id', type:'integer'},
        {name:'costcode_id', type:'string'},
        {name:'costcode_name', type:'string'},
        {name:'costcode_parent', type:'string'},
        {name:'level', type:'integer'},
        {name:'doc_date', type:'date'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'remarks', type:'string'},
        {name:'status', type:'string'},
        {name:'nominal', type:'float'},
        {name:'userinput', type:'string'},
        {name:'useredit', type:'string'},
        {name:'timeedit', type:'date'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Budget.select_detail,
            update: Budget.update_detail,
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});