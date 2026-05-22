
Ext.define('App.view.miscellaneous.MySettings',
{
	extend : 'App.ux.RenderPanel',
	id : 'panelMySettings',
	pageTitle : _('my_settings'),
	uses : ['Ext.grid.Panel'],
	initComponent : function()
	{
		var panel = this;
		// *************************************************************************************
		// User Settings Form
		// Add or Edit purpose
		// *************************************************************************************
		panel.uSettingsForm = Ext.create('App.ux.form.Panel',
		{
			id : 'uSettingsForm',
			bodyStyle : 'padding: 10px;',
			cls : 'form-white-bg',
			frame : true,
			hideLabels : true,
			items : [
			{
				xtype : 'textfield',
				hidden : true,
				id : 'id',
				name : 'id'
			},
			{
				xtype : 'fieldset',
				title : _('appearance_settings'),
				collapsible : true,
				defaultType : 'textfield',
				layout : 'anchor',
				defaults :
				{
					labelWidth : 89,
					anchor : '100%',
					layout :
					{
						type : 'hbox',
						defaultMargins :
						{
							top : 0,
							right : 5,
							bottom : 0,
							left : 0
						}
					}
				},
				items : [
				{
					// fields
				},
				{

				},
				{

				}]
			},
			{
				xtype : 'fieldset',
				title : _('locale_settings'),
				collapsible : true,
				defaultType : 'textfield',
				layout : 'anchor',
				defaults :
				{
					labelWidth : 89,
					anchor : '100%',
					layout :
					{
						type : 'hbox',
						defaultMargins :
						{
							top : 0,
							right : 5,
							bottom : 0,
							left : 0
						}
					}
				},
				items : [
				{
					// fields
				},
				{

				},
				{

				}]
			},
			{
				xtype : 'fieldset',
				title : _('calendar_settings'),
				collapsible : true,
				defaultType : 'textfield',
				layout : 'anchor',
				defaults :
				{
					labelWidth : 89,
					anchor : '100%',
					layout :
					{
						type : 'hbox',
						defaultMargins :
						{
							top : 0,
							right : 5,
							bottom : 0,
							left : 0
						}
					}
				},
				items : [
				{
					// fields
				},
				{

				},
				{

				}]
			}],
			dockedItems : [
			{
				xtype : 'toolbar',
				dock : 'top',
				items : [
				{
					text : _('save'),
					iconCls : 'save',
					id : 'cmdSave',
					disabled : true,
					handler : function()
					{

					}
				}]
			}]
		});
		panel.pageBody = [panel.uSettingsForm];
		panel.callParent(arguments);
	},
	/**
	 * This function is called from Viewport.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive : function(callback)
	{
		callback(true);
	}
});
// End ExtJS
