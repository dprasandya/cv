Ext.define('App.view.hris.popup.SalaryComponentCombo',
    {
        extend       : 'Ext.form.ComboBox',
        alias        : 'widget.xtsalarycomponentcombo',
        initComponent : function()
        {
            var me = this;

            me.model =Ext.define('model',{
                extend : 'Ext.data.Model',
                fields :[
                    {name:'sc_id', type:'string'},
                    {name:'sc_name', type:'string'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: HRIS_Pph21_Salary_component.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store', {
                model   : 'model',
                autoLoad: false
            });

            Ext.apply(this, {
                editable    : false,
                queryMode   : 'local',
                valueField  : 'sc_id',
                displayField: 'sc_name',
                emptyText   : _('select'),
                store       : me.store
            }, null);

            me.callParent();
        }
    }
)