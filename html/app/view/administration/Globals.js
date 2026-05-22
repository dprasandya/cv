
Ext.define('App.view.administration.Globals', {
	extend: 'App.ux.RenderPanel',
	pageTitle: _('global_settings'),
	initComponent: function(){
		var me = this;

		// *************************************************************************************
		// Module Data Store
		// *************************************************************************************
		me.model =Ext.define('model',{
			extend : 'Ext.data.Model',
			fields :[
				{name:'gl_name', type:'string'},
				{name:'gl_index', type:'integer'},
				{name:'gl_value', type:'string'},
				{name:'gl_category', type:'string'}

			],
			proxy:{
				type:'direct',
				api:{
					read: Globals.getGlobals,
					update: Globals.updateGlobals
				},
				reader :{
					root: 'rows',
					totalProperty: 'totals'
				}
			}
		});
		me.store = Ext.create('Ext.data.Store',{model: me.model ,remoteSort: true, autoLoad: false, groupField: 'gl_category'});
		me.grid = Ext.create('Ext.grid.Panel', {
			store: me.store,
			plugins: [
				me.formEditing = Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: 2,
					errorSummary : false
				})
			],
			columns: [
				{text: _('name'),width: 200,sortable: true,dataIndex: 'gl_name'},
				{text: _('value'),flex: 1,sortable: true,dataIndex: 'gl_value', editor:{
					xtype:'textfield'
				}},
				{text: _('category'),width: 150,sortable: true,dataIndex: 'gl_category'}
			],
			features: [{
				groupHeaderTpl: _('category')+' : {name}',
				ftype: 'groupingsummary'
			}],
			tbar: [
				{
					xtype:'combo',
					editable: false,
					width:100,
					mode:'local',
					store: [['gl_name',_('name')],['gl_value',_('value')],['gl_category',_('category')]],
					listeners:{change:function(){me.field_name=this.getValue();}}
				},
				{
					xtype:'textfield',
					emptyText: 'enter search key',
					width:150,
					listeners:{specialkey:function(field, e){if(e.getKey()== e.ENTER){me.store.proxy.extraParams = {field_name:me.field_name, field_search:field.value}; me.store.load({params:{start:0}})}}}
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 10,
				store: me.store,
				displayMsg: 'Diplay {0} - {1} Of {2}',
				emptyMsg: 'No Record Found',
				displayInfo: true
			}
		});
		me.pageBody = [ me.grid ];
		me.callParent(arguments);
	},
	/**
	 * This function is called from Viewport.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive: function(callback){
		this.store.load();
		callback(true);
	}
});
