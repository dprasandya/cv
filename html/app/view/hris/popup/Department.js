Ext.define('App.view.hris.popup.Department',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtdepartment',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'dept_id', type:'string'},
                    {name:'dept_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Department.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    },
                    extraParams:{
                        field_name: 'status',
                        field_search: '1'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store', {
                model   : 'model',
                autoLoad: true
            });

            Ext.apply(this, {
                editable    : false,
                queryMode   : 'local',
                valueField  : 'dept_id',
                displayField: 'dept_name',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }
    }
)