Ext.define('App.view.hris.popup.Job_status',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtjob_status',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'js_id', type:'string'},
                    {name:'js_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Job_status.popup
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
                valueField  : 'js_id',
                displayField: 'js_name',
                emptyText   : _('select'),
                store       : me.store,
                listeners: {
                    beforequery: function(c) {
                        c.combo.store.load();
                    }
                }
            }, null);

            me.callParent();
        }
    }
)