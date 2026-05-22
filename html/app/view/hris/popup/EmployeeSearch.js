Ext.define('App.view.hris.popup.EmployeeSearch',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtemployee_search',

        trigger1Cls: Ext.baseCSSPrefix + 'form-search-trigger',

        paramName : 'query',
        hasSearch : false,

        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'co_id', type:'string'},
                    {name:'emp_id', type:'string'},
                    {name:'emp_name', type:'string'},
                    {name:'emp_company_id', type:'string'},
                    {name:'emp_job_id', type:'string'},
                    {name:'emp_job_desc', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Employee.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad : false});
            // create the Grid
            Ext.apply(this,
                {
                    store : me.store,
                    displayField : 'emp_name',
                    valueField : 'emp_id',
                    emptyText : 'search...',
                    typeAhead : false,
                    hideTrigger : true,
                    minChars : 1,
                    listConfig :
                        {
                            loadingText : 'searching...',
                            getInnerTpl : function()
                            {
                                return '<div class="search-item"><h3>{emp_name}</h3></div>';
                            }
                        },
                    pageSize : 10
                }, null);

            me.callParent();
        }

    }
)