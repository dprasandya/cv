

Ext.define('App.ux.RenderPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.renderpanel',
	cls: 'RenderPanel',
	layout: 'border',
	frame: false,
	border: false,
	pageLayout: 'fit',
	pageBody: [],
	pageTitle: '',
	pageButtons: null,
	pageTBar: null,
	pageBBar: null,
	pagePadding: null,
	showRating: false,

	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			items: [
				me.mainHeader = Ext.widget('container', {
					cls: 'RenderPanel-header',
					itemId: 'RenderPanel-header',
					region: 'north',
					layout: 'hbox',
					height: 30
				}),
				{
					cls: 'RenderPanel-body-container',
					itemId: 'RenderPanel-body-container',
					xtype: 'container',
					region: 'center',
					layout: 'fit',
					padding: this.pagePadding == null ? 5 : this.pagePadding,
					items: [
						me.mainBoddy = Ext.widget('panel', {
							cls: 'RenderPanel-body',
							frame: true,
							border: false,
							itemId: 'pageLayout',
							defaults: { frame: false, border: false, autoScroll: true },
							layout: me.pageLayout,
							items: me.pageBody,
							tbar: me.pageTBar,
							bbar: me.pageBBar,
							buttons: me.pageButtons
						})
					]
				}
			]
		});

		me.pageTitleDiv = me.mainHeader.add(
			Ext.widget('container', {
				cls: 'panel_title',
				html: me.pageTitle
			})
		);

		me.pageReadOnlyDiv = me.mainHeader.add(
			Ext.widget('container') // placeholder
		);

		if(me.showRating){
			me.pageRankingDiv = me.mainHeader.add(
				Ext.widget('ratingField', {
					flex: 1,
					listeners: {
						scope: me,
						click: function(field, val){
							Patient.setPatientRating({pid: app.patient.pid, rating: val}, function(){
								app.msg('Sweet!', _('record_saved'))
							});
						}
					}
				})
			);
		}

		me.pageTimerDiv = me.mainHeader.add(
			Ext.widget('container', {
				style: 'float:right',
				width: 200
			})
		);

		me.callParent(arguments);
	},

	updateTitle: function(pageTitle, readOnly, timer){
		this.pageTitleDiv.update(pageTitle);
		this.pageReadOnlyDiv.update(readOnly ? _('read_only') : '');
		this.pageTimerDiv.update(timer);
	},

	getPageHeader: function(){
		return this.getComponent('RenderPanel-header');
	},

	getPageBodyContainer: function(){
		return this.getComponent('RenderPanel-body-container');
	},

	getPageBody: function(){
		return this.mainBoddy;
	},

	onActive: function(callback){
		if(typeof callback == 'function') callback(true);
	}


});
