Ext.define('App.view.hris.popup.Job_title',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtjob_title',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'job_id', type:'string'},
                    {name:'job_desc', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Job_title.popup
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
                valueField  : 'job_id',
                displayField: 'job_desc',
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