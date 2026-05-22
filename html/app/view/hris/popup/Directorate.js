Ext.define('App.view.hris.popup.Directorate',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtdirectorate',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'directorate_id', type:'string'},
                    {name:'directorate_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Directorate.popup
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
                valueField  : 'directorate_id',
                displayField: 'directorate_name',
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