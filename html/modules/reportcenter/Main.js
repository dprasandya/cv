
Ext.define('Modules.reportcenter.Main', {
	extend: 'Modules.Module',
	init: function(){
		var me = this;
		/**
		 * @param panel     (Ext.component)     Component to add to MainPanel
		 */
		me.addAppPanel(Ext.create('Modules.reportcenter.view.ReportCenter'));
		me.addAppPanel(Ext.create('Modules.reportcenter.view.ReportPanel'));

		me.getController('Modules.reportcenter.controller.Dashboard');

		/**
		 * function to add navigation links
		 * @param parentId  (string)            navigation node parent ID,
		 * @param node      (object || array)   navigation node configuration properties
		 */
		me.addNavigationNodes('root', {
			text: _('report_center'),
			leaf: true,
			cls: 'file',
			iconCls: 'icoReport',
			id: 'Modules.reportcenter.view.ReportCenter'
		});
		me.callParent();
	}
}); 