
Ext.define('Modules.reportcenter.view.ReportCenter', {
	extend: 'App.ux.RenderPanel',
	id: 'panelReportCenter',
	pageTitle: _('report_center'),

	initComponent: function(){
		var me = this; me.perm_key = [];

		me.reports = Ext.create('Ext.panel.Panel', {
			layout: 'auto'
		});
		me.pageBody = [ me.reports ];

		/**
		 * Patient Reports List
		 * TODO: Pass the report indicator telling what report should be rendering
		 * this indicator will also be the logic for field rendering.
		 */
        me.master_report = me.addCategory(_('master_report'), 260);
		me.marketing_report = me.addCategory(_('marketing_report'), 260);
        me.budget_report = me.addCategory(_('budget_report'), 260);
        //me.charts_report = me.addCategory(_('charts_report'), 260);
        me.logistics_report = me.addCategory(_('logistics_report'), 260);
        me.production_report = me.addCategory(_('production_report'), 260);
        me.voucher_report = me.addCategory(_('voucher_report'), 260);
        me.stock_report = me.addCategory(_('stock_report'), 260);
        me.cashbank_report = me.addCategory(_('cashbank_report'), 260);
        me.tax_report = me.addCategory(_('tax_report'), 260);
        me.finance_report = me.addCategory(_('finance_report'), 260);
        me.pks_report = me.addCategory(_('pks_report'), 260);
        me.kebun_report = me.addCategory(_('kebun_report'), 260);
        me.hris_report = me.addCategory(_('hris'), 260);

        // Master //
        Roles.getPerm_Key('xxxx', function(provider, response){
            me.perm_key = response.result;
            // Master Report //
            if(me.perm_key.includes('account_master_report')){me.account_master_report = me.addReportByCategory(me.master_report, 'account_master_report', _('account'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    fn:master_report.account_master_report
                });
            });}
            if(me.perm_key.includes('costcode_master_report')){me.costcode_master_report = me.addReportByCategory(me.master_report, 'costcode_master_report', _('costcode'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    fn:master_report.costcode_master_report
                });
            });}
            if(me.perm_key.includes('building_unit_master_report')){me.building_unit_master_report = me.addReportByCategory(me.master_report, 'building_unit_master_report', _('unit_building'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200, fieldLabel: _('project'), xtype: 'projectcombo',name: 'report_project_id', editable: false,emptyText: i18n('project')},
                                        {width: 200, fieldLabel: _('cluster'), hidden:true, xtype: 'xtcluster',name: 'report_cluster_id', editable: false,emptyText: i18n('cluster')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    hidden:true,
                                    flex:1,
                                    items: [
                                        {width: 200, fieldLabel: _('building_type'), xtype: 'xtbuildingtype',name: 'report_building_id', editable: false,emptyText: i18n('building_type')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:master_report.building_unit_master_report
                });
            });}
            if(me.perm_key.includes('cashbank_master_report')){ me.cashbank_master_report = me.addReportByCategory(me.master_report, 'cashbank_master_report', _('cashbank'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'combo',fieldLabel: _('type'),hideLabel: false, editable:false,  mode:'local', store: [['C',_('cash')],['B','Bank']], name : 'report_cash_type',width: 200}
                    ],
                    fn:master_report.cashbank_master_report
                });
            });}
            if(me.perm_key.includes('cashflow_master_report')){me.cashflow_master_report = me.addReportByCategory(me.master_report, 'cashflow_master_report', _('cashflow'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'combo',fieldLabel: _('type'),hideLabel: false, editable:false,  mode:'local', store: [['I',_('in')],['O',_('out')]], name : 'report_cflow_type',width: 200}
                    ],
                    fn:master_report.cashflow_master_report
                });});}
            if(me.perm_key.includes('tax_master_report')){me.tax_master_report = me.addReportByCategory(me.master_report, 'tax_master_report', _('tax'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'combo',fieldLabel: _('type'),hideLabel: false, editable:false,  mode:'local', store: [['I',_('in')],['O',_('out')]], name : 'report_tax_type',width: 200}
                    ],
                    fn:master_report.tax_master_report
                });
            });}
            if(me.perm_key.includes('customer_master_report')){ me.customer_master_report = me.addReportByCategory(me.master_report, 'customer_master_report', _('customer'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'combo',fieldLabel: _('type'),hideLabel: false, editable:false,  mode:'local', store: [['C',_('company')],['P',_('personal')]], name : 'report_cust_type',width: 200}
                    ],
                    fn:master_report.customer_master_report
                });
            });}
            if(me.perm_key.includes('supplier_master_report')){me.supplier_master_report = me.addReportByCategory(me.master_report, 'supplier_master_report', _('supplier'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'combo',fieldLabel: _('type'),hideLabel: false, editable:false,  mode:'local', store: [['S',_('supplier')],['T',_('trucking')],['C','Cashbon']], name : 'report_vend_type',width: 200}
                    ],
                    fn:master_report.supplier_master_report
                });
            });}
            if(me.perm_key.includes('salesman_master_report')){me.salesman_master_report = me.addReportByCategory(me.master_report, 'salesman_master_report', _('salesman'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    fn:master_report.salesman_master_report
                });
            });}
            if(me.perm_key.includes('items_master_report')){me.items_master_report = me.addReportByCategory(me.master_report, 'items_master_report', _('items'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, value:'RA', editable: false}
                    ],
                    fn:master_report.items_master_report
                });
            });}

            // Charts Report //
            if(me.perm_key.includes('charts_order_report')){me.charts_order_report = me.addReportByCategory(me.charts_report, 'charts_order_report', _('orders'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'numberfield',fieldLabel: _('year'),hideLabel: false, maxLength:4, name : 'report_year',width: 200}
                    ],
                    fn:charts_report.charts_order_report
                });
            });}
            if(me.perm_key.includes('charts_sales_report')){me.charts_sales_report = me.addReportByCategory(me.charts_report, 'charts_sales_report', _('salesman'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'numberfield',fieldLabel: _('year'),hideLabel: false, maxLength:4, name : 'report_year',width: 200}
                    ],
                    fn:charts_report.charts_sales_report
                });
            });}


            // Marketing Report //

            if(me.perm_key.includes('unit_building_monitoring_report')){me.unit_building_monitoring_report = me.addReportByCategory(me.marketing_report, 'unit_building_monitoring_report', _('unit_building_sale')+' '+_('monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')},
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, extraParams:'P', name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_building_monitoring_report
                });
            }); }
            if(me.perm_key.includes('unit_payment_schedule_report')){me.unit_payment_schedule_report = me.addReportByCategory(me.marketing_report, 'unit_payment_schedule_report', _('payment_schedule')+' '+_('unit_building_sale'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD','UNSOLD','BOOKED']},
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, extraParams:'P', name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_payment_schedule_report
                });
            }); }
            if(me.perm_key.includes('unit_payment_schedule_change_report')){me.unit_payment_schedule_change_report = me.addReportByCategory(me.marketing_report, 'unit_payment_schedule_change_report', _('change_payment_schedule')+' '+_('unit_building_sale'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD','UNSOLD','BOOKED']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_payment_schedule_change_report
                });
            }); }
            if(me.perm_key.includes('unit_change_report')){me.unit_change_report = me.addReportByCategory(me.marketing_report, 'unit_change_report', _('unit_change'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_change_report
                });
            }); }
            if(me.perm_key.includes('unit_building_cancel_report')){me.unit_building_cancel_report = me.addReportByCategory(me.marketing_report, 'unit_building_cancel_report', _('unit_building_cancel'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD','UNSOLD','BOOKED']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_building_cancel_report
                });
            }); }
            if(me.perm_key.includes('buyback_unit_building_report')){me.buyback_unit_building_report = me.addReportByCategory(me.marketing_report, 'buyback_unit_building_report', _('buyback_unit_building'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD','UNSOLD']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier', extraParams:['S'],fieldLabel: _('supplier'),hideLabel: false, editable:false, name : 'report_vend_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.buyback_unit_building_report
                });
            }); }
            if(me.perm_key.includes('unit_building_summary_report')){me.unit_building_summary_report = me.addReportByCategory(me.marketing_report, 'unit_building_summary_report', _('unit_building_summary'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.unit_building_summary_report
                });
            }); }
            if(me.perm_key.includes('legal_unit_building_report')){me.legal_unit_building_report = me.addReportByCategory(me.marketing_report, 'legal_unit_building_report', _('legal')+' '+_('unit_building'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), editable:false, name : 'report_project_id',emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuilding',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD','UNSOLD']}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:marketing_report.legal_unit_building_report
                });
            }); }
            if(me.perm_key.includes('room_ocupancy_report')){me.room_ocupancy_report = me.addReportByCategory(me.marketing_report, 'room_ocupancy_report',_('room_ocupancy'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:marketing_report.room_ocupancy_report
                });
            });}

            if(me.perm_key.includes('order_letter_report')){me.order_letter_report = me.addReportByCategory(me.marketing_report, 'order_letter_report', _('order_letter_report'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 280}
                    ],
                    fn:marketing_report.order_letter_report
                });
            }); }
            if(me.perm_key.includes('detail_sales_order_report')){me.detail_sales_order_report = me.addReportByCategory(me.marketing_report, 'detail_sales_order_report', _('detail')+' of '+_('salesorder') , function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('date'),
                            items: [
                                {width: 100,xtype: 'datefield',name: 'report_date_from', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                {width: 100,xtype: 'datefield',name: 'report_date_to', editable: false,emptyText: i18n('date_to'), value : new Date()}
                            ]
                        }
                    ],
                    fn:marketing_report.detail_sales_order_report
                });
            }); }
            if(me.perm_key.includes('recapitulation_sales_order_report')){me.recapitulation_sales_order_report = me.addReportByCategory(me.marketing_report, 'recapitulation_sales_order_report', _('recapitulation')+' of '+_('salesorder') , function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsalesman',fieldLabel: _('salesman'),hideLabel: false, editable:false, name : 'report_sales_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:marketing_report.recapitulation_sales_order_report
                });
            }); }
            if(me.perm_key.includes('order_monitoring_report')){me.order_monitoring_report = me.addReportByCategory(me.marketing_report, 'order_monitoring_report', _('order#')+' '+_('monitoring')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 280}
                    ],
                    fn:marketing_report.order_monitoring_report
                });
            });}
            if(me.perm_key.includes('order_monitoring_recapitulation_report')){me.order_monitoring_recapitulation_report = me.addReportByCategory(me.marketing_report, 'order_monitoring_recapitulation_report', _('order#')+' '+_('monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:marketing_report.order_monitoring_recapitulation_report
                });
            });}


            // Budget Report //
            if(me.perm_key.includes('budget_detail_report')){me.budget_detail_report = me.addReportByCategory(me.budget_report, 'budget_report', _('budget'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Budget',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'textfield', fieldLabel: _('from'), name: 'report_from_period',emptyText: i18n('from')},
                                        {width: 200,xtype: 'textfield', fieldLabel: _('to'), name: 'report_to_period', emptyText: i18n('to')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtafdeling', fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:budget_report.budget_detail_report
                });
            }); }
            if(me.perm_key.includes('budget_af_report')){me.budget_af_report = me.addReportByCategory(me.budget_report, 'budget_af_report', _('budget')+' '+_('afdeling'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Budget',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'textfield', fieldLabel: _('from'), name: 'report_from_period',emptyText: i18n('from')},
                                        {width: 200,xtype: 'textfield', fieldLabel: _('to'), name: 'report_to_period', emptyText: i18n('to')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtafdeling', fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:budget_report.budget_af_report
                });
            }); }
            if(me.perm_key.includes('payment_schedule_unit_building_rent_report')){me.payment_schedule_unit_building_rent_report = me.addReportByCategory(me.rent_report, 'payment_schedule_unit_building_rent_report', _('payment_schedule')+' '+_('unit_building_rent'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuildingrent', extraParams:['RENT','BOOKED'], fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building')},
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:rent_report.payment_schedule_unit_building_rent_report
                });
            }); }
            if(me.perm_key.includes('unit_building_service_charge_report')){me.unit_building_service_charge_report = me.addReportByCategory(me.rent_report, 'unit_building_service_charge_report', _('service_charge'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')},
                                        {width: 200, xtype : 'xtunitbuildingrent', extraParams:['RENT','BOOKED'], fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'sc_mcombo', fieldLabel: _('service_charge'),hideLabel: false, editable:false, name : 'report_sc_id',width: 200},
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:rent_report.unit_building_service_charge_report
                });
            }); }

            // Logistics Report //
            if(me.perm_key.includes('po_monitoring_report')){me.po_monitoring_report = me.addReportByCategory(me.logistics_report, 'po_monitoring_report', _('purchaseorder')+' '+_('monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtpurchase_order',fieldLabel: _('document'), extraParams:[1], hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier',fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {xtype : 'xtitems',fieldLabel: _('item'),hideLabel: false, editable:false, extraParams:['RM','RA'], name : 'report_item_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type')},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', hidden:true, editable:false, emptyText: i18n('project')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:logistics_report.po_monitoring_report
                });
            }); }
            if(me.perm_key.includes('grn_monitoring_report')){me.grn_monitoring_report = me.addReportByCategory(me.logistics_report, 'grn_monitoring_report', _('goodsreceived')+' '+_('monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false, emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtpurchase_order',fieldLabel: _('document'), extraParams:[1],hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier',fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {xtype : 'xtitems',fieldLabel: _('item'),hideLabel: false, editable:false, extraParams:['RM','RA'], name : 'report_item_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    hidden:true,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type')},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'combo',fieldLabel: _('outstanding'),hideLabel: false, editable:false, store: [['0','LUNAS'],['1','OUTSTANDING'],['-1','ALL']], name : 'report_qty_outstanding',width: 200, value:'-1'}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:logistics_report.grn_monitoring_report
                });
            });}
            if(me.perm_key.includes('grn_recapitulation_report')){me.grn_recapitulation_report = me.addReportByCategory(me.logistics_report, 'grn_recapitulation_report', _('recapitulation')+' of '+_('goodsreceived'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'xtsupplier',fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {width: 200,xtype: 'xtitems', fieldLabel: _('item'), extraParams:['RM','RA'], name: 'report_item_id', editable: false,emptyText: i18n('item')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtpurchase_order',fieldLabel: _('purchaseorder'), extraParams:[1], hideLabel: false, editable:false, name : 'report_for_doc_id',width: 250},
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:logistics_report.grn_recapitulation_report
                });
            });}
            if(me.perm_key.includes('grn_detail_report')){me.grn_detail_report = me.addReportByCategory(me.logistics_report, 'grn_detail_report', _('detail')+' of '+_('goodsreceived'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier',fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {width: 200,xtype: 'xtitems', fieldLabel: _('item'), extraParams:['RM','RA'], name: 'report_item_id', editable: false,emptyText: i18n('item')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtpurchase_order',fieldLabel: _('purchaseorder'), extraParams:[1], hideLabel: false, editable:false, name : 'report_for_doc_id',width: 250},
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    hidden:true,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type')},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:logistics_report.grn_detail_report
                });
            });}
            if(me.perm_key.includes('catatan_traksi_krani_report')){me.catatan_traksi_krani_report = me.addReportByCategory(me.logistics_report, 'catatan_traksi_krani_report', _('catatan_krani'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'xtkendaraan', fieldLabel: _('policy_number'), name: 'report_no_polisi', emptyText: i18n('policy_number')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'xtpekerjaan', fieldLabel: _('jenis_pekerjaan'), name: 'report_pekerjaan_id', emptyText: i18n('jenis_pekerjaan')}
                                    ]
                                }


                            ]
                        }
                    ],
                    fn:logistics_report.catatan_traksi_krani_report
                });
            });}
            if(me.perm_key.includes('catatan_traksi_workshop_report')){me.catatan_traksi_workshop_report = me.addReportByCategory(me.logistics_report, 'catatan_traksi_workshop_report', _('catatan_workshop'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'xtkendaraan', fieldLabel: _('policy_number'), name: 'report_no_polisi', emptyText: i18n('policy_number')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:logistics_report.catatan_traksi_workshop_report
                });
            });}

            // Productions //
            if(me.perm_key.includes('work_order_letter_report')){me.work_order_letter_report = me.addReportByCategory(me.production_report, 'work_order_letter_report', _('work_order_letter'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout:'anchor',
                                            flex:1,
                                            items: [
                                                {xtype : 'xtwork_order_letter', editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:production_report.work_order_letter_report
                });
            });}
            if(me.perm_key.includes('production_by_day_report')){me.production_by_day_report = me.addReportByCategory(me.production_report, 'production_by_day_report', _('production')+' of '+_('day'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {width: 250,xtype: 'combo', fieldLabel: _('type'), name: 'report_doc_type', editable: false,emptyText: i18n('type'),  mode:'local',store: [['RM','Row Material'],['FG','Finish Goods']]}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:production_report.production_by_day_report
                });
            });}
            if(me.perm_key.includes('detail_production_day_report')){me.detail_production_day_report = me.addReportByCategory(me.production_report, 'detail_production_day_report', _('detail')+' of '+_('production'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['FG','RM','RA'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:production_report.detail_production_day_report
                });
            });}
            if(me.perm_key.includes('deliveryorder_report')){me.deliveryorder_report = me.addReportByCategory(me.production_report, 'deliveryorder_report', _('deliveryorder'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_for_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['FG','RM','RA'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:production_report.deliveryorder_report
                });
            });}
            if(me.perm_key.includes('do_monitoring_report')){me.do_monitoring_report = me.addReportByCategory(me.production_report, 'do_monitoring_report', _('deliveryorder')+' '+_('monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'combo',fieldLabel: _('outstanding'),hideLabel: false, editable:false, store: [['0','LUNAS'],['1','OUTSTANDING'],['-1','ALL']], name : 'report_qty_outstanding',width: 200, value:'-1'}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:production_report.do_monitoring_report
                });
            });}
            if(me.perm_key.includes('deliveryorder_bap_report')){me.deliveryorder_bap_report = me.addReportByCategory(me.production_report, 'deliveryorder_bap_report', _('deliveryorder')+' BAP', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield', fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'],fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'xtsales_order',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_for_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtitems',fieldLabel: _('item'),hideLabel: false, extraParams:['FG','RM','RA'], editable:false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:production_report.deliveryorder_bap_report
                });
            });}

            // Voucher //
            if(me.perm_key.includes('work_order_form_report')){me.work_order_form_report = me.addReportByCategory(me.voucher_report, 'work_order_form_report', _('work_order'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtwork_order', editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.work_order_form_report
                });
            });}
            if(me.perm_key.includes('registration_form_report')){me.registration_form_report = me.addReportByCategory(me.voucher_report, 'registration_form_report', _('registration'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SALES']}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.registration_form_report
                });
            });}

            if(me.perm_key.includes('po_form_report')){me.po_form_report = me.addReportByCategory(me.voucher_report, 'po_form_report', _('purchaseorder'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtpurchase_order', extraParams:[0,1], editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.po_form_report
                });
            });}
            if(me.perm_key.includes('production_form_report')){me.production_form_report = me.addReportByCategory(me.voucher_report, 'production_form_report', _('work_order_letter'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtwork_order_letter', editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.production_form_report
                });
            });}
            if(me.perm_key.includes('do_letter_form_report')){me.do_letter_form_report = me.addReportByCategory(me.voucher_report, 'do_letter_form_report', _('delivery_order_letter'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtdelivery_order_letter', editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.do_letter_form_report
                });
            });}
            if(me.perm_key.includes('do_form_report')){me.do_form_report = me.addReportByCategory(me.voucher_report, 'do_form_report', _('deliveryorder'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtdelivery_order',  extraParams : me, editable:false, fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.do_form_report
                });
            });}
            if(me.perm_key.includes('ap_form_report')){me.ap_form_report = me.addReportByCategory(me.voucher_report, 'ap_form_report', _('ap'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtap_invoice',fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250, extraParams:-1, editable:false}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.ap_form_report
                });
            });}
            if(me.perm_key.includes('ar_form_report')){me.ar_form_report = me.addReportByCategory(me.voucher_report, 'ar_form_report',_('ar'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtar_invoice',fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id', extraParams:-1, editable:false, width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.ar_form_report
                });
            });}
            if(me.perm_key.includes('cash_form_report')){me.cash_form_report = me.addReportByCategory(me.voucher_report, 'cash_form_report', _('cash'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcashbook',fieldLabel: _('id'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.cash_form_report
                });
            });}
            if(me.perm_key.includes('bank_form_report')){me.bank_form_report = me.addReportByCategory(me.voucher_report, 'bank_form_report', 'Bank', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtbankbook',fieldLabel: _('id'),hideLabel: false, editable:false, extraParams:['I','O'], name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.bank_form_report
                });
            });}
            if(me.perm_key.includes('rlm_bank_form_report')){me.rlm_bank_form_report = me.addReportByCategory(me.voucher_report, 'rlm_bank_form_report', _('rlm')+' Bank', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtbankbook',fieldLabel: _('id'),hideLabel: false, editable:false, extraParams:['O-RLM'], name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.rlm_bank_form_report
                });
            });}
            if(me.perm_key.includes('gl_form_report')){me.gl_form_report = me.addReportByCategory(me.voucher_report, 'gl_form_report',_('gl'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.gl_form_report
                });
            });}
            if(me.perm_key.includes('ci_form_report')){me.ci_form_report = me.addReportByCategory(me.voucher_report, 'ci_form_report',_('registration_hotel'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtunitbuildingcustomer',fieldLabel: _('id'),hideLabel: false, extraParams:['CHECK IN'], name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.ci_form_report
                });
            });}
            if(me.perm_key.includes('coffe_shop_form_report')){me.coffe_shop_form_report = me.addReportByCategory(me.voucher_report, 'coffe_shop_form_report',_('ar_sale_items'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtar_invoice',fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:voucher_report.coffe_shop_form_report
                });
            });}

            // Stock Inventory //
            if(me.perm_key.includes('items_report')){me.items_report = me.addReportByCategory(me.stock_report, 'items_report', _('item'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'textfield',fieldLabel: _('period'), name: 'report_period', editable: false,emptyText: i18n('period')},
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, value:'RA', editable: false,
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', form)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        },
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['RA'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'combo',fieldLabel: _('conversion'), editable:false,  mode:'local', value:'Y', store: [['Y',_('yes')],['N',_('no')]], name : 'report_conversion',width: 200}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:stock_report.items_report
                });
            });}
            if(me.perm_key.includes('items_detail_report')){me.items_detail_report = me.addReportByCategory(me.stock_report, 'items_detail_report', _('item')+' '+ _('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()},
                                        {xtype : 'combo',fieldLabel: _('conversion'), editable:false,  mode:'local', value:'Y', store: [['Y',_('yes')],['N',_('no')]], name : 'report_conversion',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'combo',layout: {type: 'hbox'}, store: ['GOOD-RECEIVED','PRODUCTION','DELIVERY-ORDER','STOCK-OPNAME','WAREHOUSE_TX_RX','CANCEL-TRANSACTIONS','RECLASS', 'AP-INVOICE', 'RECLASS-HPP', 'STOCK-OUT'], fieldLabel: _('module'),hideLabel: false, name : 'report_module',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'typescombo',layout: {type: 'hbox'}, fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250,  value:'RA',
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', form)[0];
                                                    item_id.extraParams =[field.value];
                                                }
                                            }
                                        },
                                        {xtype : 'xtitems',layout: {type: 'hbox'},  extraParams:['RA'], fieldLabel: _('item'),hideLabel: false,editable: false, name : 'report_item_id',width: 200}]
                                }

                            ]
                        }
                    ],
                    fn:stock_report.items_detail_report
                });
            });}
            if(me.perm_key.includes('former_items_report')){me.former_items_report = me.addReportByCategory(me.stock_report, 'former_items_report', _('former_items'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, value:'FI', extraParams:['FI'],
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'), container = form.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', container)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, extraParams:['FI'], fieldLabel: _('item'),hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:stock_report.former_items_report
                });
            });}
            if(me.perm_key.includes('former_items_detail_report')){me.former_items_detail_report = me.addReportByCategory(me.stock_report, 'former_items_detail_report', _('former_items')+' '+ _('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'typescombo',layout: {type: 'hbox'}, fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250,  value:'FI', extraParams:['FI'],
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'), container = form.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', container)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        },
                                        {xtype : 'combo',layout: {type: 'hbox'}, store: ['FORMER-ITEMS','PRODUCTION','CANCEL-TRANSACTIONS'], fieldLabel: _('module'),hideLabel: false, name : 'report_module',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'},  extraParams:['FI'], fieldLabel: _('item'),hideLabel: false,editable: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:stock_report.former_items_detail_report
                });
            });}
            if(me.perm_key.includes('po_in_out_items_report')){me.po_in_out_items_report = me.addReportByCategory(me.stock_report, 'po_in_out_items_report', 'PO In Out '+_('item'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, value:'RM', editable: false,
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'), container = form.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', container)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['RM'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:stock_report.po_in_out_items_report
                });
            });}
            if(me.perm_key.includes('borrow_items_report')){me.borrow_items_report = me.addReportByCategory(me.stock_report, 'borrow_items_report', _('borrow_items'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, value:'RM', editable: false,
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'), container = form.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', container)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['RM'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:stock_report.borrow_items_report
                });
            });}
            if(me.perm_key.includes('warehouse_tx_rx_report')){me.warehouse_tx_rx_report = me.addReportByCategory(me.stock_report, 'warehouse_tx_rx_report', _('warehouse_tx_rx'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'typescombo',fieldLabel: _('type'),hideLabel: false, name : 'report_item_type',width: 250, editable: false,
                                            listeners:{
                                                change:function(field){
                                                    var form = field.up('container'), container = form.up('container'),
                                                        item_id =  Ext.ComponentQuery.query('[name=report_item_id]', container)[0];
                                                    item_id.extraParams =[field.value];

                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'warehousecombo',layout: {type: 'hbox'}, fieldLabel: _('warehouse'),hideLabel: false, name : 'report_from_warehouse_id',width: 250},
                                        {xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['RM'], hideLabel: false, name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:stock_report.warehouse_tx_rx_report
                });
            });}

            // Cash Bank //
            if(me.perm_key.includes('cashbank_day_report')){me.cashbank_day_report = me.addReportByCategory(me.cashbank_report, 'cashbank_day_report', _('cashbank'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcashbank',fieldLabel: _('cashbank'), extraParams:['C','B'], hideLabel: false, editable:false, name : 'report_cash_id',width: 200},
                                        {xtype : 'xtgiro_check', fieldLabel: _('giro_check'), xtraParams : -1, hideLabel: false, name : 'report_reference_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    hidden:true,
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type')},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                }

                            ]
                        }


                    ],
                    fn:cashbank_report.cashbank_day_report
                });
            });}
            if(me.perm_key.includes('cashflow_day_report')){me.cashflow_day_report = me.addReportByCategory(me.cashbank_report,'cashflow_day_report', _('cashflow'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtcashflow',fieldLabel: _('cashflow'), extraParams:['I','O'], name: 'report_cflow_id', editable: false, emptyText: i18n('cashflow')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    hidden:true,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type')},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                }


                            ]
                        }
                    ],
                    fn:cashbank_report.cashflow_day_report
                });
            });}
            if(me.perm_key.includes('cashbon_report')){me.cashbon_report = me.addReportByCategory(me.cashbank_report, 'cashbon_report', _('cashbon'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtcashbook',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier',fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'C', name : 'report_vend_id',width: 200},
                                        {xtype : 'combo',fieldLabel: _('outstanding'),hideLabel: false, editable:false, store: [['0','LUNAS'],['1','OUTSTANDING'],['-1','ALL']], name : 'report_outstanding',width: 200, value:'1'}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:cashbank_report.cashbon_report
                });
            });}

            // Tax //
            if(me.perm_key.includes('tax_in_report')){me.tax_in_report = me.addReportByCategory(me.tax_report, 'tax_in_report', _('tax')+' '+_('in'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xttax',fieldLabel: _('tax'),extraParams:'I', hideLabel: false, editable:false, name : 'report_tax_id',width: 200}
                                    ]
                                }

                            ]
                        }


                    ],
                    fn:tax_report.tax_in_report
                });
            });}
            if(me.perm_key.includes('tax_out_report')){me.tax_out_report = me.addReportByCategory(me.tax_report, 'tax_out_report', _('tax')+' '+_('out'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xttax',fieldLabel: _('tax'),extraParams:'O', hideLabel: false, editable:false, name : 'report_tax_id',width: 200}
                                    ]
                                }

                            ]
                        }


                    ],
                    fn:tax_report.tax_out_report
                });
            });}

            //Finance //
            if(me.perm_key.includes('costcode_report')){me.costcode_report = me.addReportByCategory(me.finance_report, 'costcode_report', _('costcode'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'projecttypecombo',fieldLabel: _('type'), name: 'report_project_type', editable: false, emptyText: i18n('type'), hidden: true},
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.costcode_report
                });
            });}
            if(me.perm_key.includes('costcode_detail_report')){me.costcode_detail_report = me.addReportByCategory(me.finance_report, 'costcode_detail_report', _('costcode')+' of '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'combo',fieldLabel: _('type'), name: 'report_costcode_type', mode:'local', store: [['B','Budget'],['P','Progress'],['A','Actual']], editable: false, emptyText: i18n('type')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtcostcode',fieldLabel: _('costcode'), name: 'report_costcode_id', editable: false, extraParams:{doc_type:'', project_id:''}, emptyText: i18n('costcode')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.costcode_detail_report
                });
            });}
            if(me.perm_key.includes('work_order_report')){me.work_order_report = me.addReportByCategory(me.finance_report, 'work_order_report', _('work_order'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to'), name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtcostcode',fieldLabel: _('costcode'), name: 'report_costcode_id', editable: false, extraParams:{doc_type:'', project_id:''}, emptyText: i18n('costcode')},
                                        {xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtworkordercontact',fieldLabel: _('contract_no'), name: 'report_contract_no', emptyText: i18n('contract_no')},
                                        {width: 250, xtype: 'xtwork_order',fieldLabel: _('document'), name: 'report_doc_id', mode:'local', editable: false, emptyText: i18n('document')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}

                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.work_order_report
                });
            });}
            if(me.perm_key.includes('work_order_detail_report')){me.work_order_detail_report = me.addReportByCategory(me.finance_report, 'work_order_detail_report', _('work_order')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtcostcode',fieldLabel: _('costcode'), name: 'report_costcode_id', editable: false, extraParams:{doc_type:'', project_id:''}, emptyText: i18n('costcode')},
                                        {xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtworkordercontact',fieldLabel: _('contract_no'), name: 'report_contract_no', emptyText: i18n('contract_no')},
                                        {width: 250, xtype: 'xtwork_order',fieldLabel: _('document'), name: 'report_doc_id', mode:'local', editable: false, emptyText: i18n('document')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}

                                    ]
                                }


                            ]
                        }
                    ],
                    fn:finance_report.work_order_detail_report
                });
            });}
            if(me.perm_key.includes('work_order_progress_detail_report')){me.work_order_progress_detail_report = me.addReportByCategory(me.finance_report, 'work_order_progress_detail_report', _('work_order_progress')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')},
                                        {xtype:'combo', fieldLabel: _('outstanding'), name : 'report_outstanding_type',  editable: false,width:200,mode:'local', value:'B', store: [['B','OUTSTANDING'],['L','LUNAS'],['S','ALL']]}
                                    ]
                                }


                            ]
                        }
                    ],
                    fn:finance_report.work_order_progress_detail_report
                });
            });}
            if(me.perm_key.includes('project_monitoring_report')){me.project_monitoring_report = me.addReportByCategory(me.finance_report, 'project_monitoring_report', _('project_monitoring'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')},
                                        {xtype : 'combo',fieldLabel: _('level'),hideLabel: false, name : 'report_level',width: 200, editable:false, mode:'local', value:'2',  store: ['2','7']}
                                    ]
                                }


                            ]
                        }
                    ],
                    fn:finance_report.project_monitoring_report
                });
            });}

            if(me.perm_key.includes('sales_recognition_report')){me.sales_recognition_report = me.addReportByCategory(me.finance_report, 'sales_recognition_report', _('sales_recognition'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtunitbuilding',fieldLabel: _('unit_building'), name: 'report_unit_building_id', extraParams:['SOLD'], editable: false, emptyText: i18n('unit_building')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.sales_recognition_report
                });
            });}
            if(me.perm_key.includes('sales_recognition_detail_report')){me.sales_recognition_detail_report = me.addReportByCategory(me.finance_report, 'sales_recognition_detail_report', _('sales_recognition')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtunitbuilding',fieldLabel: _('unit_building'), name: 'report_unit_building_id', extraParams:['SOLD'], editable: false, emptyText: i18n('unit_building')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.sales_recognition_detail_report
                });
            });}
            if(me.perm_key.includes('sales_recognition_unadmit_report')){me.sales_recognition_unadmit_report = me.addReportByCategory(me.finance_report, 'sales_recognition_unadmit_report',_('sales_recognition_unadmit'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                                        {width: 200, fieldLabel: _('project'), xtype: 'projectcombo',name: 'report_project_id', editable: false,emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SALES']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype:'combo', fieldLabel: _('outstanding'), name : 'report_outstanding_type',  editable: false,width:200,mode:'local', value:'S', store: [['B','OUTSTANDING'],['L','LUNAS'],['S','ALL']]}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.sales_recognition_unadmit_report
                });
            });}
            if(me.perm_key.includes('unit_building_late_payment_report')){me.unit_building_late_payment_report = me.addReportByCategory(me.finance_report, 'unit_building_late_payment_report',_('unit_building_late_payment'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {width: 200, fieldLabel: _('project'), xtype: 'projectcombo',name: 'report_project_id', editable: false,emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SALES']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype:'numberfield', hideTrigger: true, fieldLabel: _('rate'), name : 'report_rate',  width:200, emptyText: i18n('rate')},
                                        {xtype:'numberfield', hideTrigger: true, fieldLabel: _('compensation'), align:'right', name : 'report_compensation',  width:200, emptyText: i18n('compensation')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.unit_building_late_payment_report
                });
            });}
            if(me.perm_key.includes('unit_biaya_ditangguhkan_report')){me.unit_biaya_ditangguhkan_report = me.addReportByCategory(me.finance_report, 'unit_biaya_ditangguhkan_report', _('unit_biaya_ditangguhkan'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtunitbuilding',fieldLabel: _('unit_building'), name: 'report_unit_building_id', extraParams:['SOLD'], editable: false, emptyText: i18n('unit_building')}

                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer', layout: 'hbox',
                                            items: [{xtype: 'combo',fieldLabel: _('outstanding'),name: 'report_outstanding_type',editable: false,width: 200,mode: 'local',value: 'S',store: [['B', 'OUTSTANDING'], ['L', 'LUNAS'], ['S', 'ALL']]}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.unit_biaya_ditangguhkan_report
                });
            });}

            if(me.perm_key.includes('asset_recognition_report')){me.asset_recognition_report = me.addReportByCategory(me.finance_report, 'asset_recognition_report', _('asset_recognition'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype : 'projectcombo',fieldLabel: _('project'), name : 'report_project_id', editable:false, emptyText: i18n('project')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {width: 200, xtype: 'xtunitbuilding',fieldLabel: _('unit_building'), name: 'report_unit_building_id', extraParams:['SOLD'], editable: false, emptyText: i18n('unit_building')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.asset_recognition_report
                });
            });}
            if(me.perm_key.includes('recapitulasi_biaya_kebun_report')){me.asset_report = me.addReportByCategory(me.kebun_report, 'recapitulasi_biaya_kebun_report', _('recapitulation')+' Biaya Kebun', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                                        {xtype : 'textfield',fieldLabel: _('group'),hideLabel: false, name : 'report_afdeling_group',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtafdeling',fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 250}
                                    ]
                                }

                            ]
                        }
                        
                    ],
                    fn:finance_report.recapitulasi_biaya_kebun_report
                });
            }); }
            if(me.perm_key.includes('rincian_biaya_kebun_report')){me.asset_report = me.addReportByCategory(me.kebun_report, 'rincian_biaya_kebun_report', _('detail')+' Biaya Kebun', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                                        
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtreclass_afdeling',fieldLabel: _('document'),hideLabel: false, name : 'report_doc_id',width: 250},
                                        {xtype : 'textfield',fieldLabel: _('group'),hideLabel: false, name : 'report_afdeling_group',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtafdeling',fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 250}
                                
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.rincian_biaya_kebun_report
                });
            }); }
            if(me.perm_key.includes('tbs_recapitulation_report')){me.asset_report = me.addReportByCategory(me.kebun_report, 'tbs_recapitulation_report', 'Ringkasan Biaya TBS Inti/Dalam', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                }

                            ]
                        }
                        
                    ],
                    fn:finance_report.tbs_recapitulation_report
                });
            }); }
            if(me.perm_key.includes('tbs_detail_report')){me.asset_report = me.addReportByCategory(me.kebun_report, 'tbs_detail_report', 'Rincian Biaya TBS Inti/Dalam', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                                        {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('document'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                        
                    ],
                    fn:finance_report.tbs_detail_report
                });
            }); }
            if(me.perm_key.includes('traksi_report')){me.traksi_report = me.addReportByCategory(me.kebun_report, 'traksi_report', 'Traksi Report', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtkendaraan', fieldLabel: _('kendaraan'),hideLabel: false, editable:false, name : 'report_kendaraan_id',width: 200}
                                        
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.traksi_report
                });
            });}
            if(me.perm_key.includes('asset_report')){me.asset_report = me.addReportByCategory(me.finance_report, 'asset_report', 'Asset', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                        {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}
                    ],
                    fn:finance_report.asset_report
                });
            }); }
            if(me.perm_key.includes('production_report')){me.asset_report = me.addReportByCategory(me.pks_report, 'production_report', _('production')+' ' +_('recapitulation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                    ],
                    fn:finance_report.production_report
                });
            }); }
            if(me.perm_key.includes('production_detail_report')){me.asset_report = me.addReportByCategory(me.pks_report, 'production_detail_report', _('production')+' ' +_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtproduction',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250},
                        {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200},
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'left'
                            },
                            fieldLabel: _('type'),
                            items: [
                                {
                                    width: 100,
                                    xtype: 'combo',
                                    editable: false,
                                    name: 'report_group',
                                    emptyText: i18n('group'),
                                    mode: 'local',store: ['BIAYA TIDAK LANGSUNG','BAHANBAKU PEMBANTU','PEMAKAIAN TBS','BIAYA STATION']
                                    
                                },                                
                                {
                                    width: 100,
                                    xtype: 'combo',
                                    editable: false,
                                    name: 'report_type',
                                    emptyText: i18n('type'),
                                    mode: 'local',store: [['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'],['C','PKS - Limbah'],['N','PKS - Laboratorium'],['J','PKS - Sample Produk'],['R','PKS - Others'],['PKS','Stock out']]
                                    /*listeners:{
                                        change:function(f){
                                            var container = f.up('container'), period = Ext.ComponentQuery.query('[name=report_period]', container)[0]; 
                                            if(f.value=='R'){
                                                period.setDisabled(false);
                                            }else{
                                                period.setDisabled(true);
                                            }
                                        }
                                    }*/
                                },                                                                
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'report_period',
                                    //disabled: true,
                                    emptyText: i18n('period')
                                }
                            ]
                           
                            
                        }
                    ],
                    fn:finance_report.production_detail_report
                });
            }); }
            if(me.perm_key.includes('production_detail_tbs_report')){me.asset_report = me.addReportByCategory(me.pks_report, 'production_detail_tbs_report', _('production')+' ' +_('detail')+' ' +_('tbs'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtproduction',fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250},
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'left'
                            },
                            fieldLabel: _('period'),
                            items: [                                                                                         
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'report_period',
                                    //disabled: true,
                                    emptyText: i18n('period')
                                }
                            ]
                           
                            
                        }
                    ],
                    fn:finance_report.production_detail_tbs_report
                });
            }); }
            if(me.perm_key.includes('ap_invoice_report')){me.ap_invoice_report = me.addReportByCategory(me.finance_report, 'ap_invoice_report', 'AP '+ _('invoice'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {xtype: 'combo',fieldLabel: _('type'),name: 'report_type',editable: false,width: 250,mode: 'local',store: [['P','Purchase'],['O','Others'],['A','Asset'], ['K','Asset Kebun'], ['F','Beli TBS Luar'],['G','Beli TBS Plasma'],['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'], ['R','PKS - Others']]}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_invoice_report
                });
            });}
            if(me.perm_key.includes('ap_invoice_buy_tbs_report')){me.ap_invoice_buy_tbs_report = me.addReportByCategory(me.kebun_report, 'ap_invoice_buy_tbs_report', _('buy_tbs'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200},
                                        {xtype: 'combo',fieldLabel: _('type'),name: 'report_type',editable: false,width: 250,mode: 'local', store: [['F','Beli TBS Luar'],['G','Beli TBS Plasma']]}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_invoice_buy_tbs_report
                });
            });}
            if(me.perm_key.includes('ap_recapitulation_report')){me.ap_recapitulation_report = me.addReportByCategory(me.finance_report, 'ap_recapitulation_report', 'AP '+ _('recapitulation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_recapitulation_report
                });
            });}
            if(me.perm_key.includes('ap_detail_report')){me.ap_detail_report = me.addReportByCategory(me.finance_report, 'ap_detail_report', 'AP '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_detail_report
                });
            });}
            if(me.perm_key.includes('ap_card_report')){me.ap_card_report = me.addReportByCategory(me.finance_report, 'ap_card_report', 'AP '+_('card'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}]
                                        },
                                        {xtype : 'textfield', name : 'report_dir',hidden: true}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtap_invoice', fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250, extraParams:-1, editable:false}]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer', layout: 'hbox',
                                            items: [{xtype: 'combo',fieldLabel: _('outstanding'),name: 'report_outstanding_type',editable: false,width: 200,mode: 'local',value: 'S',store: [['B', 'OUTSTANDING'], ['L', 'LUNAS'], ['S', 'ALL']]}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_card_report
                });
            });}
            if(me.perm_key.includes('ap_advance_card_report')){me.ap_advance_card_report = me.addReportByCategory(me.finance_report, 'ap_advance_card_report', 'AP '+_('advance')+' '+_('card'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsupplier', fieldLabel: _('supplier'),hideLabel: false, editable:false, extraParams:'S', name : 'report_vend_id',width: 200}]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcashbank', fieldLabel: _('cashbank'), extraParams:['C','B'], hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtap_advance', fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250, extraParams:-1, editable:false}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ap_advance_card_report
                });
            });}
            if(me.perm_key.includes('ar_invoice_report')){me.ar_invoice_report = me.addReportByCategory(me.finance_report, 'ar_invoice_report','AR '+_('invoice'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}

                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}]
                                        }

                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ar_invoice_report
                });
            });}
            if(me.perm_key.includes('ar_recapitulation_report')){me.ar_recapitulation_report = me.addReportByCategory(me.finance_report, 'ar_recapitulation_report','AR '+_('recapitulation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200},
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD']}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ar_recapitulation_report
                });
            });}
            if(me.perm_key.includes('ar_detail_report')){me.ar_detail_report = me.addReportByCategory(me.finance_report, 'ar_detail_report', 'AR '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200},
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD']}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:finance_report.ar_detail_report
                });
            });}
            if(me.perm_key.includes('ar_card_report')){me.ar_card_report = me.addReportByCategory(me.finance_report, 'ar_card_report', 'AR '+_('card'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'textfield', name : 'report_dir',hidden: true}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtaccount', fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200},
                                        {width: 200, xtype : 'xtunitbuildingcustomer',fieldLabel: _('unit_building'), editable:false, name : 'report_unit_building_id',emptyText: i18n('unit_building'), extraParams:['SOLD']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtar_invoice', fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250,extraParams:-1, editable:false},
                                        {xtype: 'combo',fieldLabel: _('outstanding'),name: 'report_outstanding_type',editable: false,width: 200,mode: 'local',value: 'S',store: [['B', 'OUTSTANDING'], ['L', 'LUNAS'], ['S', 'ALL']]}
                                    ]
                                }
                            ]
                        }

                    ],
                    fn:finance_report.ar_card_report
                });
            });}
            if(me.perm_key.includes('ar_advance_card_report')){me.ar_advance_card_report = me.addReportByCategory(me.finance_report, 'ar_advance_card_report', 'AR '+_('advance')+' '+_('card'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcashbank', fieldLabel: _('cashbank'), extraParams:['C','B'], hideLabel: false, editable:false, name : 'report_coa_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtar_advance', fieldLabel: _('id'),hideLabel: false, name : 'report_doc_id',width: 250,extraParams:-1, editable:false}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ar_advance_card_report
                });
            });}
            if(me.perm_key.includes('ar_sale_cogs_report')){me.ar_sale_cogs_report = me.addReportByCategory(me.finance_report, 'ar_sale_cogs_report',_('income')+' & HPP', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}

                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ar_sale_cogs_report
                });
            });}
            if(me.perm_key.includes('ar_sale_cogs_recapitulation_report')){me.ar_sale_cogs_recapitulation_report = me.addReportByCategory(me.finance_report, 'ar_sale_cogs_recapitulation_report',_('recapitulation')+' '+_('income')+' & HPP', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.ar_sale_cogs_recapitulation_report
                });
            });}
            if(me.perm_key.includes('detail_ar_sale_cogs_report')){me.detail_ar_sale_cogs_report = me.addReportByCategory(me.finance_report, 'detail_ar_sale_cogs_report',_('detail')+' '+_('income')+' & COGS', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'textfield', fieldLabel: _('document'),hideLabel: false, name : 'report_doc_id',width: 250}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.detail_ar_sale_cogs_report
                });
            });}

            if(me.perm_key.includes('transport_by_order_report')){me.transport_by_order_report = me.addReportByCategory(me.finance_report, 'transport_by_order_report', _('trucking')+' By Order', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'anchor',
                            width: 300,
                            items: [
                                {width: 200,xtype: 'datefield',fieldLabel: _('docdate'), name: 'report_date_doc_date', editable: false,emptyText: i18n('docdate'), value : new Date()},
                                {
                                    xtype: 'fieldcontainer',layout: 'hbox',
                                    items: [{xtype : 'xtsales_order', fieldLabel: _('salesorder'),hideLabel: false, editable:false, name : 'report_doc_id',width: 200}]
                                }
                            ]
                        }
                    ],
                    fn:finance_report.transport_by_order_report
                });
            });}
            if(me.perm_key.includes('cost_category_report')){me.asset_report = me.addReportByCategory(me.finance_report, 'cost_category_report', _('cost')+' ' +_('category'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                            {
                                xtype: 'container',
                                layout:'anchor',
                                width: 300,
                                items: [
                                    {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_from_doc_date', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                    {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_to_doc_date', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                ]
                            },
                            {
                                xtype: 'container',
                                layout:'anchor',
                                flex:1,
                                items: [
                                    {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200},
                                    {
                                        width: 200,
                                        xtype: 'xtol_type',
                                        fieldLabel: _('type'),
                                        name: 'report_ol_id',
                                        allowBlank: false,
                                        emptyText: i18n('id')
                                    },
                                ]
                            }
                                    
                        ]
                        } 
                    ],
                    fn:finance_report.cost_category_report
                });
            }); }
            if(me.perm_key.includes('gl_report')){me.gl_report = me.addReportByCategory(me.finance_report, 'gl_report', _('gl'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtaccount',fieldLabel: _('my_account'),hideLabel: false, editable:false, name : 'report_coa_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('document'),hideLabel: false, name : 'report_doc_id',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.gl_report
                });
            });}
            if(me.perm_key.includes('outlet_report')){me.outlet_report = me.addReportByCategory(me.finance_report, 'outlet_report', _('outlet_report'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'combo', store: [['A',_('ar_add_billing')],['H',_('house_keeping')],['D',_('drug_store')],['B',_('business_center')],['G',_('generate_room_rate')],['I',_('coffee_shop')],['S',_('room_service')],['P',_('ar_pub')],['Q',_('banquete')]], fieldLabel: _('modules'),hideLabel: false, editable:false, name : 'report_doc_type',width: 250}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.outlet_report
                });
            });}

            if(me.perm_key.includes('trial_balance_report')){me.trial_balance_report = me.addReportByCategory(me.finance_report, 'trial_balance_report', _('trial_balance'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                    ],
                    fn:finance_report.trial_balance_report
                });
            });}
            if(me.perm_key.includes('income_report')){me.income_report = me.addReportByCategory(me.finance_report, 'income_report',_('income'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200},
                                        {xtype : 'xtitems',fieldLabel: _('item'),hideLabel: false, editable:false, extraParams:['RM','RA','FG'], name : 'report_item_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.income_report
                });
            });}
            if(me.perm_key.includes('cost_kilograms_report')){me.cost_kilograms_report = me.addReportByCategory(me.finance_report, 'cost_kilograms_report', _('cost')+ ' /kg', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.cost_kilograms_report
                });
            });}
            if(me.perm_key.includes('cost_kilograms_detail_report')){me.cost_kilograms_detail_report = me.addReportByCategory(me.finance_report, 'cost_kilograms_detail_report', _('cost')+ ' Kg Detail', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype:'combo', fieldLabel: _('type'), editable: false,width:200,mode:'local', value:'I',
                                            store: [['I',_('items')],['C',_('account')]],
                                            listeners :{
                                                change :function(f,e){
                                                    var container = f.up('container'),
                                                        id = Ext.ComponentQuery.query('[name=report_id]', container)[0];
                                                    if(f.value=='I'){
                                                        container.remove(id);
                                                        container.add({xtype : 'xtitems',layout: {type: 'hbox'}, editable:false, fieldLabel: _('item'),extraParams:['RM','RA','FG'], hideLabel: false, name : 'report_id',width: 200});
                                                    }else if(f.value=='C'){
                                                        container.remove(id);
                                                        container.add({xtype : 'xtaccount', layout: {type: 'hbox'}, fieldLabel: _('account'), hideLabel: false, editable:false, name : 'report_id',width: 200});
                                                    }
                                                }
                                            }
                                        },
                                        {width: 200,xtype: 'xtitems',fieldLabel: _('item'), extraParams:['RM','RA','FG'] ,name: 'report_id', editable: false,emptyText: i18n('item')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.cost_kilograms_detail_report
                });
            });}
            if(me.perm_key.includes('gross_profit_report')){me.gross_profit_report = me.addReportByCategory(me.finance_report, 'gross_profit_report', _('gross_profit'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsales_order', fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.gross_profit_report
                });
            });}
            if(me.perm_key.includes('hpp_recapitulation_report')){me.hpp_recapitulation_report = me.addReportByCategory(me.finance_report, 'hpp_recapitulation_report', _('recapitulation')+' Hpp', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtcustomer', extraParams:['P','C'], fieldLabel: _('customer'),hideLabel: false, editable:false, name : 'report_cust_id',width: 200}]
                                        },
                                        {
                                            xtype: 'fieldcontainer',layout: 'hbox',
                                            items: [{xtype : 'xtsales_order', fieldLabel: _('document'),hideLabel: false, editable:false, name : 'report_doc_id',width: 250}]
                                        }
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:finance_report.hpp_recapitulation_report
                });
            });}
            if(me.perm_key.includes('vertical_hpp_report')){me.vertical_hpp_report = me.addReportByCategory(me.finance_report, 'vertical_hpp_report','Vertical Hpp', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'textfield',fieldLabel: _('from')+' Period', name: 'report_from_period', emptyText: i18n('from')},
                                        {width: 200,xtype: 'textfield',fieldLabel: _('to')+' Period',name: 'report_to_period', emptyText: i18n('to')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'numberfield',fieldLabel: 'CPO %', name: 'report_cpo_prs', value : 92},
                                        {width: 200,xtype: 'numberfield',fieldLabel: 'Kernel %' ,name: 'report_kernel_prs', value : 8}
                                    ]
                                }

                            ]
                        }
                        

                    ],
                    fn:finance_report.vertical_hpp_report
                });
            });}
            if(me.perm_key.includes('hpp_detail_report')){me.hpp_detail_report = me.addReportByCategory(me.finance_report, 'hpp_detail_report','Hpp Detail', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                }

                            ]
                        }
                        

                    ],
                    fn:finance_report.hpp_detail_report
                });
            });}
            if(me.perm_key.includes('rincian_hpp_detail_report')){me.rincian_hpp_detail_report = me.addReportByCategory(me.finance_report, 'rincian_hpp_detail_report','Rincian Hpp Detail', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'textfield',fieldLabel: _('group'),hideLabel: false, name : 'report_group_name',width: 300},
                                        {xtype : 'textfield',fieldLabel: _('description'),hideLabel: false, name : 'report_description',width: 300}
                                    ]
                                }

                            ]
                        }
                        

                    ],
                    fn:finance_report.rincian_hpp_detail_report
                });
            });}
            if(me.perm_key.includes('neraca_report')){me.neraca_report = me.addReportByCategory(me.finance_report, 'neraca_report',_('neraca'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200},
                        {xtype : 'numberfield',fieldLabel: _('level'),hideLabel: false, name : 'report_level',width: 200, value:5, maxValue:5}
                    ],
                    fn:finance_report.neraca_report
                });
            });}
            if(me.perm_key.includes('profit_lost_report')){me.profit_lost_report = me.addReportByCategory(me.finance_report, 'profit_lost_report', _('profit_lost'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200}
                    ],
                    fn:finance_report.profit_lost_report
                });
            });}
            if(me.perm_key.includes('old_new_document_report')){me.old_new_document_report = me.addReportByCategory(me.finance_report, 'old_new_document_report', 'Dokumen Lama & Baru', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'textfield',fieldLabel: 'Dokumen Baru',hideLabel: false, name : 'report_new_doc_id',width: 250},
                        {xtype : 'textfield',fieldLabel: 'Dokumen Lama',hideLabel: false, name : 'report_old_doc_id',width: 250}
                    ],
                    fn:finance_report.old_new_document_report
                });
            });}
            /*if(me.perm_key.includes('budget_report')){me.budget_report = me.addReportByCategory(me.finance_report, 'budget_report', _('budget'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtbudget_report',fieldLabel: _('document'),hideLabel: false, name : 'report_doc_id',width: 300}
                    ],
                    fn:finance_report.budget_report
                });
            });}*/

            // PPH 21 //
            if(me.perm_key.includes('employee_report')){me.employee_report = me.addReportByCategory(me.hris_report, 'employee_report', _('employee'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.employee_report
                });
            });}

            if(me.perm_key.includes('pph21_form_report')){me.pph21_form_report = me.addReportByCategory(me.hris_report, 'pph21_form_report', 'Detail PPh 21 / Person', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'),editable:false, labelAlign: 'right', hideLabel: false, name : 'report_emp_id',width: 200},
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                            ]
                        }
                    ],
                    fn:hris_report.pph21_form_report
                });
            });}
            if(me.perm_key.includes('tax_pph21_form_report')){me.tax_pph21_form_report = me.addReportByCategory(me.hris_report, 'tax_pph21_form_report', 'Detail PPh 21 / Person (Tax)', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'),editable:false, labelAlign: 'right', hideLabel: false, name : 'report_emp_id',width: 200},
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                            ]
                        }
                    ],
                    fn:hris_report.tax_pph21_form_report
                });
            });}
            if(me.perm_key.includes('pph21_report')){me.pph21_report = me.addReportByCategory(me.hris_report, 'pph21_report', 'Summary PPh 21', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('employee'),
                            items: [
                                {xtype : 'xtemployee', editable:false, hideLabel: false, name : 'report_emp_id',width: 100},
                                {width: 150, xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                {width: 200, xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')}
                            ]
                        }
                    ],
                    fn:hris_report.pph21_report
                });
            });}
            if(me.perm_key.includes('tax_pph21_report')){me.tax_pph21_report = me.addReportByCategory(me.hris_report, 'tax_pph21_report', 'Summary PPh 21 (Tax)', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('employee'),
                            items: [
                                {xtype : 'xtemployee', editable:false, hideLabel: false, name : 'report_emp_id',width: 100},
                                {width: 150, xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                {width: 200, xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')}
                            ]
                        }
                    ],
                    fn:hris_report.tax_pph21_report
                });
            });}
            if(me.perm_key.includes('pph21_year_report')){me.pph21_year_report = me.addReportByCategory(me.hris_report, 'pph21_year_report', 'PPh 21 Setahun', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            items: [
                                {xtype : 'numberfield',fieldLabel: _('from')+' Period',hideLabel: false, name : 'report_from_period',width: 200, maxLength:6},
                                {xtype : 'numberfield',fieldLabel: _('to')+' Period',hideLabel: false, name : 'report_to_period',width: 200, maxLength:6}
                            ]
                        },
                        {xtype : 'xtemployee',fieldLabel: _('employee'),labelAlign: 'right',editable:false, hideLabel: false, name : 'report_emp_id',width: 200}
                    ],
                    fn:hris_report.pph21_year_report
                });
            });}
            if(me.perm_key.includes('pph21_sim_report')){me.pph21_sim_report = me.addReportByCategory(me.hris_report, 'pph21_sim_report', 'Summary PPh 21 Simulation', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'numberfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200, maxLength:6}
                    ],
                    fn:hris_report.pph21_sim_report
                });
            });}
            if(me.perm_key.includes('salary_slip_form_report')){me.salary_slip_form_report = me.addReportByCategory(me.hris_report, 'salary_slip_form_report', _('salary')+' Slip', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'),editable:false, labelAlign: 'right', hideLabel: false, name : 'report_emp_id',width: 200},
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                            ]
                        }
                    ],
                    fn:hris_report.salary_slip_form_report
                });
            });}
            if(me.perm_key.includes('salary_slip_report')){me.salary_slip_report = me.addReportByCategory(me.hris_report, 'salary_slip_report', _('salary')+' Summary', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:hris_report.salary_slip_report
                });
            });}
            if(me.perm_key.includes('salary_slip_harian_report')){me.salary_slip_harian_report = me.addReportByCategory(me.hris_report, 'salary_slip_harian_report', _('salary')+' R'+' (Take Home Pay)', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                            ]
                                        },
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , labelAlign: 'right', hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: 'Mandor' , xtype : 'xtmandor', name : 'report_mandor_id', emptyText: i18n('mandor')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 400,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: 'PKS - Afdeling',
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    mode:'local',
                                                    name: 'report_pks_afdeling',
                                                    allowBlank:false,
                                                    store: ['PKS','AFDELING'],
                                                    emptyText: i18n('type'),
                                                    listeners:{
                                                        change:function(f){
                                                            var cont = f.up('container'),
                                                            pks_type = Ext.ComponentQuery.query('[name=report_pks_type]', cont)[0],
                                                            afdeling_id = cont.items.items[2];
                                                            if(f.value=='PKS'){
                                                                pks_type.setDisabled(false); pks_type.show(); pks_type.setValue(null);
                                                                afdeling_id.setDisabled(true); afdeling_id.hide(); afdeling_id.setValue(null);
                                                            }else{
                                                                pks_type.setDisabled(true); pks_type.hide(); pks_type.setValue(null);
                                                                afdeling_id.setDisabled(false); afdeling_id.show();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:150,
                                                    mode:'local',
                                                    name: 'report_pks_type',
                                                    hidden:true,
                                                    store: [['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'], ['R','PKS - Others']],
                                                    emptyText: i18n('type')
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    hidden:true,
                                                    disabled:true,
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'xtafdeling',
                                                            editable: false,
                                                            name: 'report_afdeling_id',
                                                            emptyText: i18n('id')
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:hris_report.salary_slip_harian_report
                });
            });}
            if(me.perm_key.includes('salary_tr_report')){me.salary_tr_report = me.addReportByCategory(me.hris_report, 'salary_tr_report', _('salary')+' TR', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                                
                                            ]
                                        },
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , labelAlign: 'right', hideLabel: false, name : 'report_emp_id'},
                                        {width: 200,xtype : 'combo',fieldLabel: _('type') , labelAlign: 'right', name: 'report_include_r',editable: false,mode:'local',value:'N',store: [['Y','Cetak R & TR'],['N','Cetak TR']]}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 400,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: 'PKS - Afdeling',
                                            items: [
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:100,
                                                    mode:'local',
                                                    name: 'report_pks_afdeling',
                                                    allowBlank:false,
                                                    store: ['PKS','AFDELING'],
                                                    emptyText: i18n('type'),
                                                    listeners:{
                                                        change:function(f){
                                                            var cont = f.up('container'),
                                                            pks_type = Ext.ComponentQuery.query('[name=report_pks_type]', cont)[0],
                                                            afdeling_id = cont.items.items[2];
                                                            if(f.value=='PKS'){
                                                                pks_type.setDisabled(false); pks_type.show(); pks_type.setValue(null);
                                                                afdeling_id.setDisabled(true); afdeling_id.hide(); afdeling_id.setValue(null);
                                                            }else{
                                                                pks_type.setDisabled(true); pks_type.hide(); pks_type.setValue(null);
                                                                afdeling_id.setDisabled(false); afdeling_id.show();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype:'combo',
                                                    editable: false,
                                                    width:150,
                                                    mode:'local',
                                                    name: 'report_pks_type',
                                                    hidden:true,
                                                    store: [['S','PKS - S.Leading R'],['V','PKS - V.Sterilizer'],['T','PKS - Threser'],['B','PKS - Boiler'],['I','PKS - Klarifikasi'],['L','PKS - Kernel'],['H','PKS - Power House'],['W','PKS - Workshop'], ['R','PKS - Others']],
                                                    emptyText: i18n('type')
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    fieldDefaults: {
                                                        labelAlign: 'right'
                                                    },
                                                    hidden:true,
                                                    disabled:true,
                                                    items: [
                                                        {
                                                            width: 100,
                                                            xtype : 'xtafdeling',
                                                            editable: false,
                                                            name: 'report_afdeling_id',
                                                            emptyText: i18n('id')
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:hris_report.salary_tr_report
                });
            });}

            if(me.perm_key.includes('salary_format_bni_report')){me.salary_format_bni_report = me.addReportByCategory(me.hris_report, 'salary_format_bni_report', _('salary')+' Format BNI', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:hris_report.salary_format_bni_report
                });
            });}


            if(me.perm_key.includes('tax_salary_slip_report')){me.tax_salary_slip_report = me.addReportByCategory(me.hris_report, 'tax_salary_slip_report',_('salary')+' Summary (Tax)', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.tax_salary_slip_report
                });
            });}
            if(me.perm_key.includes('salary_pph21_report')){me.salary_pph21_report = me.addReportByCategory(me.hris_report, 'salary_pph21_report', _('salary')+' PPh 21 Summary', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: {
                                                type: 'hbox'
                                            },
                                            fieldDefaults: {
                                                labelAlign: 'right'
                                            },
                                            fieldLabel: _('period'),
                                            items: [
                                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local',value:'1',store: [['1','1'],['2','2'],['',_('combined')]]}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }

                    ],
                    fn:hris_report.salary_pph21_report
                });
            });}

            if(me.perm_key.includes('bonus_thr_report')){me.bonus_thr_report = me.addReportByCategory(me.hris_report, 'bonus_thr_report', _('bonus_thr'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200, fieldLabel: _('period') , xtype : 'numberfield', name : 'report_period', emptyText: i18n('period')},
                                        {xtype : 'combo',layout: {type: 'hbox'}, fieldLabel: _('type'), hideLabel: false,width: 250, name : 'report_bt_type', value:'THR', editable:false,  mode:'local', store: ['BONUS TAHUNAN','THR']}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.bonus_thr_report
                });
            });}
            if(me.perm_key.includes('tax_bonus_thr_report')){me.tax_bonus_thr_report = me.addReportByCategory(me.hris_report, 'tax_bonus_thr_report', _('bonus_thr')+' (Tax)', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox'
                            },
                            fieldDefaults: {
                                labelAlign: 'right'
                            },
                            fieldLabel: _('period'),
                            items: [
                                {width: 100, maxLength:6, xtype : 'numberfield', name : 'report_period'},
                                {width: 60,xtype : 'combo',name: 'report_sub_period',editable: false,mode:'local', hidden:true, value:'',store: ['1','2']}
                            ]
                        },
                        {xtype : 'combo',layout: {type: 'hbox'}, fieldLabel: _('type'), labelAlign: 'right',  hideLabel: false,width: 250, name : 'report_bt_type', value:'BONUS TAHUNAN', editable:false,  mode:'local', store: ['BONUS TAHUNAN','THR']}
                    ],
                    fn:hris_report.tax_bonus_thr_report
                });
            });}
            /*if(me.perm_key.includes('salary_component_report')){me.salary_component_report = me.addReportByCategory(me.hris_report, 'salary_slip_report', _('salary')+' Summary', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'numberfield',fieldLabel: _('period'),hideLabel: false, name : 'report_period',width: 200, maxLength:6}
                    ],
                    fn:hris_report.salary_component_report
                });
            });}*/
            if(me.perm_key.includes('employee_form_report')){me.employee_form_report = me.addReportByCategory(me.hris_report, 'employee_form_report', 'Employee Data / Person', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'), editable:false, hideLabel: false, name : 'report_doc_id',width: 200}
                    ],
                    fn:hris_report.employee_form_report
                });
            });}
            if(me.perm_key.includes('attendance_report')){me.attendance_report = me.addReportByCategory(me.hris_report, 'attendance_report', _('attendance')+' / '+_('person'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    flex:1,
                                    items: [
                                        {xtype : 'xtemployee',fieldLabel: _('employee'), hideLabel: false, name : 'report_emp_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.attendance_report
                });
            });}
            if(me.perm_key.includes('attendance_summary_report')){me.attendance_summary_report = me.addReportByCategory(me.hris_report, 'attendance_summary_report', _('attendance')+' '+_('recapitulation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'combo',fieldLabel: _('group_by'),hideLabel: false,  mode:'local', store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['OPERATOR','OPERATOR'],['DRIVER','DRIVER'],['LAB','LAB'],['NON SHIFT','NON SHIFT']], name : 'report_group_id',width: 200},
                                        {xtype : 'combo',fieldLabel: _('line'),hideLabel: false,  mode:'local', store: ['LINE 1','LINE 2'], name : 'report_line',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.attendance_summary_report
                });
            });}
            if(me.perm_key.includes('attendance_summary_2_report')){me.attendance_summary_2_report = me.addReportByCategory(me.hris_report, 'attendance_summary_2_report', _('attendance')+' 2 '+_('recapitulation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'combo',fieldLabel: _('group_by'),hideLabel: false,  mode:'local', store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['DRIVER','DRIVER'],['OPERATOR','OPERATOR'],['LAB','LAB'],['NON SHIFT','NON SHIFT']], name : 'report_group_id',width: 200},
                                        {xtype : 'combo',fieldLabel: _('line'),hideLabel: false,  mode:'local', store: ['LINE 1','LINE 2'], name : 'report_line',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.attendance_summary_2_report
                });
            });}

            if(me.perm_key.includes('attendance_overtime_report')){me.attendance_overtime_report = me.addReportByCategory(me.hris_report, 'attendance_overtime_report', _('attendance')+' '+_('overtime'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {xtype : 'combo',fieldLabel: _('group_by'),hideLabel: false,  mode:'local', store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['OPERATOR','OPERATOR'],['DRIVER','DRIVER'],['LAB','LAB'],['NON SHIFT','NON SHIFT']], name : 'report_group_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.attendance_overtime_report
                });
            });}

            if(me.perm_key.includes('schedule_shift_report')){me.schedule_shift_report = me.addReportByCategory(me.hris_report, 'schedule_shift_report', _('schedule_shift'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date() }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('department') , xtype : 'xtdepartment', name : 'report_dept_id', emptyText: i18n('departments')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {xtype : 'combo',fieldLabel: _('group_by'),hideLabel: false,  mode:'local', store: [['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['G','G'],['H','H'],['I','I'],['J','J'],['K','K'],['L','L'],['M','M'],['N','N'],['CS','CS'],['OC','OC'],['MTC','MTC'],['MTN','MTN'],['SZ','SZ'],['TE','TE'],['SATPAM','SATPAM'],['OPERATOR','OPERATOR'],['DRIVER','DRIVER'],['LAB','LAB'],['NON SHIFT','NON SHIFT']], name : 'report_group_id',width: 200}
                                    ]
                                }

                            ]
                        }
                    ],
                    fn:hris_report.schedule_shift_report
                });
            });}
            if(me.perm_key.includes('leave_form_report')){me.leave_form_report = me.addReportByCategory(me.hris_report, 'leave_form_report', _('leave'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtleave',fieldLabel: _('leave'), editable:false, hideLabel: false, name : 'report_seq_id',width: 200}
                    ],
                    fn:hris_report.leave_form_report
                });
            });}
            if(me.perm_key.includes('outstation_form_report')){me.outstation_form_report = me.addReportByCategory(me.hris_report, 'outstation_form_report', _('outstation'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'), editable:false, hideLabel: false, name : 'report_emp_id',width: 200},
                        {
                            width: 380,
                            height: 50,
                            fieldLabel: _('remarks'),
                            xtype: 'textarea',
                            style:{overflow:'auto'},
                            name: 'report_remarks',
                            emptyText: i18n('remarks')
                        }
                    ],
                    fn:hris_report.outstation_form_report
                });
            });}
            if(me.perm_key.includes('hris_asset_report')){me.hris_asset_report = me.addReportByCategory(me.hris_report, 'hris_asset_report',_('list')+' Asset Detail', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtasset_type',fieldLabel: _('type'), editable:false, hideLabel: false, name : 'report_asset_type',width: 250},
                        {xtype : 'xtcompany',fieldLabel: _('company'), editable:false, hideLabel: false, name : 'report_company_id',width: 250}
                    ],
                    fn:hris_report.hris_asset_report
                });
            });}
            if(me.perm_key.includes('asset_management_form_report')){me.asset_management_form_report = me.addReportByCategory(me.hris_report, 'asset_management_form_report', _('asset_management'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtasset_management',fieldLabel: _('asset_management'), editable:false, hideLabel: false, name : 'report_seq_id',width: 200}
                    ],
                    fn:hris_report.asset_management_form_report
                });
            });}
            if(me.perm_key.includes('overtime_form_report')){me.overtime_form_report = me.addReportByCategory(me.hris_report, 'overtime_form_report', _('overtime'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtovertime_request',fieldLabel: _('overtime_request'), editable:false, hideLabel: false, name : 'report_seq_id',width: 200},
                    ],
                    fn:hris_report.overtime_form_report
                });
            });}
            if(me.perm_key.includes('overtime_detail_report')){me.overtime_detail_report = me.addReportByCategory(me.hris_report, 'overtime_detail_report', _('overtime')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:hris_report.overtime_detail_report
                });
            });}
            if(me.perm_key.includes('premi_emp_detail_report')){me.premi_emp_detail_report = me.addReportByCategory(me.hris_report, 'premi_emp_detail_report', _('premi')+' '+_('by')+' '+_('employee'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_from_date', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_to_date', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('premi') , xtype : 'xtaward_attendance', name : 'report_doc_type', emptyText: i18n('premi')},
                                        {xtype : 'xtafdeling', fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 200}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:hris_report.premi_emp_detail_report
                });
            });}
            if(me.perm_key.includes('premi_afd_detail_report')){me.premi_afd_detail_report = me.addReportByCategory(me.hris_report, 'premi_afd_detail_report', _('premi')+' '+_('by')+' '+_('afdeling'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('premi') , xtype : 'xtaward_attendance', name : 'report_doc_type', emptyText: i18n('premi')},
                                        {xtype : 'xtafdeling', fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 200}
                                    ]
                                }
                                
                            ]
                        }
                    ],
                    fn:hris_report.premi_afd_detail_report
                });
            });}
            if(me.perm_key.includes('premi_detail_report')){me.premi_detail_report = me.addReportByCategory(me.hris_report, 'premi_detail_report', _('premi')+' '+_('detail'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_from'), name: 'report_date_fromdate', editable: false,emptyText: i18n('date_from'), value : new Date()},
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date_to') ,name: 'report_date_todate', editable: false,emptyText: i18n('date_to'), value : new Date()}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('premi') , xtype : 'xtaward_attendance', name : 'report_doc_type', emptyText: i18n('premi')},
                                        {xtype : 'xtafdeling', fieldLabel: _('afdeling'),hideLabel: false, name : 'report_afdeling_id',width: 200}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 250, fieldLabel: _('job_status') , xtype : 'xtjob_status', name : 'report_js_id', emptyText: i18n('job_status')},
                                        {width: 250, fieldLabel: _('office_location') , xtype : 'xtol_type', name : 'report_ol_id', emptyText: i18n('job_status')}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:hris_report.premi_detail_report
                });
            });}
            if(me.perm_key.includes('loan_office_report')){me.loan_office_report = me.addReportByCategory(me.hris_report, 'loan_office_report', _('loan_office'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200, xtype : 'textfield', fieldLabel: _('period') , hideLabel: false, name : 'report_period'},
                                        {width: 200, xtype : 'xtemployee', fieldLabel: _('employee') , editable:false, hideLabel: false, name : 'report_emp_id'}
                                    ]
                                }
                            ]
                        }
                    ],
                    fn:hris_report.loan_office_report
                });
            });}
            if(me.perm_key.includes('mutation_form_report')){me.mutation_form_report = me.addReportByCategory(me.hris_report, 'mutation_form_report', _('mutation_employee'), function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {xtype : 'xtemployee',fieldLabel: _('employee'), editable:false, hideLabel: false, name : 'report_emp_id',width: 200}
                    ],
                    fn:hris_report.mutation_form_report
                });
            });}
            if(me.perm_key.includes('kopra_mandiri_report')){me.kopra_mandiri_report = me.addReportByCategory(me.hris_report, 'kopra_mandiri_report', 'Format Upload Kopra Mandiri', function(btn) {
                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype: 'container',
                            layout:'hbox',
                            flex:1,
                            items: [
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'datefield',fieldLabel: _('date'), name: 'report_date_salarydate', editable: false,emptyText: i18n('date'), value : new Date()},
                                        {width: 250, fieldLabel: _('company') , xtype : 'xtcompany', name : 'report_company_id', emptyText: i18n('company')}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'textfield',fieldLabel: _('source_account') ,name: 'report_source_account', editable: false,emptyText: i18n('source_account')},
                                        {width: 250,xtype: 'textfield',fieldLabel: 'Mandiri Cabang' ,name: 'report_sub_mandiri', editable: false,emptyText: 'Mandiri Cabang'}
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout:'anchor',
                                    width: 300,
                                    items: [
                                        {width: 200,xtype: 'combo',fieldLabel: 'FT Service', name: 'report_ft_service', editable: false,mode:'local', store: [['IBU','Inhouse'],['LBU','Kliring'],['RBU','RTGS'],['INU','International Trf']]},
                                        {width: 200,xtype: 'combo',fieldLabel: 'Charger Intruction' ,name: 'report_charge_intruction', editable: false,mode:'local', store: [['OUR','On US(Default)'],['BEN','Off Us'],['SHA','Sharing']]}
                                    ]
                                },
                            ]
                        }
                    ],
                    fn:hris_report.kopra_mandiri_report
                });
            });}


        });


        me.callParent(arguments);
	},

	/**
	 * Function to add categories with the respective with to the
	 * Report Center Panel
	 */
	addCategory: function(category, width){
		var me = this;
		return me.reports.add(Ext.create('Ext.container.Container', {
			cls: 'CategoryContainer',
			width: width,
			layout: 'anchor',
			items: [
				{
					xtype: 'container',
					cls: 'title',
					margin: '0 0 5 0',
					html: category
				}
			]
		}));
	},

	/**
	 * Function to add Items to the category
	 */
	addReportByCategory: function(category, id, text, fn){
        return category.add(Ext.create('Ext.button.Button', {
            cls: 'CategoryContainerItem',
            anchor: '100%',
            margin: '0 0 5 0',
            textAlign: 'left',
            text: text,
            handler: fn
        }));
	},

    CheckReportByCategory : function(){
	    var me= this; var xxx = [];
        //console.log('xxxx');
        Roles.getPerm_Key('xxxx', function(provider, response){
            xxx = response.result;
        });
        console.log(xxx);
    },

	/**
	 * Function to call the report panel.
	 * Remember the report fields are dynamically rendered.
	 */
	goToReportPanelAndSetPanel: function(config){
		var panel = app.MainPanel.getLayout().setActiveItem('panelReportPanel');
		panel.setReportPanel(config);
	},

	/**
	 * This function is called from MitosAPP.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive: function(callback){
		callback(true);
	}

});