Ext.define('App.view.popup.AP_Invoice',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtap_invoice',

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
                    {name:'doc_id', type:'string'},
                    {name:'doc_type', type:'string'},
                    {name:'station_name', type:'string'},
                    {name:'doc_date', type:'date'},
                    {name:'vend_id', type:'string'},
                    {name:'vend_name', type:'string'},
                    {name:'po_id', type:'string'},
                    {name:'tax_id', type:'string'},
                    {name:'outstanding_liability', type:'float'},
                    {name:'remarks', type:'string'},
                    {name:'coa_id_detail', type:'string'},
                    {name:'coa_name_detail', type:'string'},
                    {name:'status', type:'bool'},
                    {name:'useredit', type:'string'},
                    {name:'timeedit', type:'date'}
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read: AP_Invoice.popup
                    },
                    reader :{
                        root: 'rows',
                        totalProperty: 'totals'
                    }
                }
            });
            me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, pageSize : 10, autoLoad: false});
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                height: 200,
                width: 610,
                title: _('ap'),
                listeners: {
                    scope: me,
                    select: me.gridclick,
                    itemdblclick: me.doucbleclick
                },
                columns: [
                    {text: _('document'),width: 130,sortable: true,dataIndex: 'doc_id'},
                    {text: _('docdate'),width: 80,sortable: true,dataIndex: 'doc_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: _('supplier'),width: 150,sortable: true,dataIndex: 'vend_name'},
                    {text: _('tax'),width: 60,sortable: true,dataIndex: 'tax_id'},
                    {text: _('station'),width: 100,sortable: true,dataIndex: 'station_name'},
                    {text: _('liability'),width: 100,sortable: true,dataIndex: 'outstanding_liability', align:'right', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: _('remarks'),flex: 1,sortable: true,dataIndex: 'remarks'}
                ],
                tbar: [
                    {
                        xtype:'combo',
                        editable: false,
                        width:100,
                        mode:'local',
                        store: [['doc_id',_('document')],['vend_id',_('id')],['vend_name',_('supplier')],['tax_id',_('tax')],['outstanding_liability',_('liability')],['station_name',_('station')],['remarks',_('remarks')]],
                        listeners:{change:function(){me.field_name=this.getValue();}}
                    },
                    {
                        xtype:'textfield',
                        emptyText: 'enter search key',
                        width:150,
                        listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){
                            me.store.proxy.extraParams = {outstanding_liability:me.extraParams, field_name:me.field_name, field_search:field.value};
                            me.store.loadPage(1);}}
                        }
                    },
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: me.store,
                        displayMsg: 'Diplay {0} - {1} Of {2}',
                        emptyMsg: 'No Record Found',
                        displayInfo: true
                    }
                ]
            });

            me.searchwin = Ext.create('App.ux.window.Window', {
                layout: 'fit',//border : false,
                items: [ me.grid ],
                buttons: [
                    {
                        text: 'Pilih',
                        cls: 'winSave',
                        handler : function(btn){
                            btn.up('window').close();
                        }
                    },
                    '-',
                    {
                        text: i18n('cancel'),
                        scope: me,
                        handler: me.btnCancelPressed
                    }
                ]
            });

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger1Click();
                }
            }, me);
        },
        onTrigger1Click : function(){
            var me = this;
            me.searchwin.show();
            //me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            me.store.proxy.extraParams={outstanding_liability:me.extraParams};
            me.store.load();
            me.doComponentLayout();
        },
        gridclick: function(grid, selected){

            var me = this, form = this.up('container'), container = form.up('panel'),  plugin = container.ownerCt.editingPlugin;

            if(plugin){
                var vend_id = plugin.editor.form.findField('vend_id'), vend_name = plugin.editor.form.findField('vend_name'),
                    outstanding_liability = plugin.editor.form.findField('outstanding_liability'),
                    for_doc_type = plugin.editor.form.findField('for_doc_type'),
                    coa_id = plugin.editor.form.findField('coa_id'),
                    coa_name = plugin.editor.form.findField('coa_name');
            }
            if(outstanding_liability){outstanding_liability.setValue(selected.data.outstanding_liability);}
            if(vend_id){vend_id.setValue(selected.data.vend_id);}
            if(vend_name){vend_name.setValue(selected.data.vend_name);}
            if(for_doc_type){for_doc_type.setValue(selected.data.doc_type);}
            if(coa_id){coa_id.setValue(selected.data.coa_id_detail);}
            if(coa_name){coa_name.setValue(selected.data.coa_name_detail);}
            this.setValue(selected.data.doc_id);
        },
        doucbleclick: function(grid, selected){
            var me = this;
            me.gridclick(grid, selected);
            me.searchwin.close();
        },

        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)