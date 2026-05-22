Ext.define('App.view.hris.popup.Office_hours',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtoffice_hours',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'oh_id', type:'string'},
                    {name:'oh_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Office_hours.popup
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
                //editable    : false,
                queryMode   : 'local',
                valueField  : 'oh_id',
                displayField: 'oh_name',
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