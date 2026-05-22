Ext.define('App.view.hris.popup.Asset_type',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtasset_type',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'asset_type', type:'string'},
                    {name:'remarks', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Asset_type.popup
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
                valueField  : 'asset_type',
                displayField: 'remarks',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }
    }
)