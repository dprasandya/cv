
Ext.define('App.model.transactions.asset.Joining_Asset_Detail', {
	extend: 'Ext.data.Model',
    fields :[
        {name:'co_id', type:'string'},
        {name:'doc_id', type:'string'},
        {name:'doc_date', type:'date'},
        {name:'for_doc_id', type:'string'},
        {name:'coa_id', type:'string'},
        {name:'coa_name', type:'string'},
        {name:'project_id', type:'string'},
        {name:'project_name', type:'string'},
        {name:'nominal', type:'float'},
        {name:'remarks', type:'string'},
        {name:'status', type:'bool'}
    ],
    proxy:{
        type:'direct',
        api:{
            read: Joining_Asset_Detail.select,
            update: Joining_Asset_Detail.update
        },
        reader :{
            root: 'rows',
            totalProperty: 'totals'
        }
    }
});