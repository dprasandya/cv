Ext.define('Modules.reportcenter.view.ReportFormPanel', {
    extend: 'App.ux.RenderPanel',
    pageLayout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        var me = this;
        var Typefile = [
            {"tipe":"XLS","name":"Microsoft Excel .xls"},
            {"tipe":"DOC","name":"Microsoft Word .doc"},
            {"tipe":"RTF","name":"Rich Text Format .rtf"},
            {"tipe":"HTML","name":"HTML .html"},
            {"tipe":"PDF","name":"PDF .pdf"},
            {"tipe":"TXT","name":"Text Files .txt"},
            {"tipe":"CSV","name":"Comma Delimited .csv"},
            {"tipe":"ODS","name":"Libre Office Calc .ods"},
            {"tipe":"ODT","name":"Libre Office Writer .odt"}
        ];
        var cbexptype = 'PDF .pdf';

        Ext.define('FileType', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'string', name: 'tipe'},
                {type: 'string', name: 'name'}
            ]
        });

        function createStore() {
            // The data store holding the states; shared by each of the ComboBox examples below
            return Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'FileType',
                data: Typefile
            });
        }

        me.comboExport = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Export to',
            //id : 'cb_exporttype',
            displayField: 'name',
            valueField: 'tipe',
            value : 'PDF',
            width: 250,
            labelWidth: 60,
            store: createStore(),
            queryMode: 'local',
            margin : '0 5 0 0',
            typeAhead: true
        });

        me.renderContainer = Ext.create('Ext.panel.Panel',{
            flex : 1,
            border : true,
            autoScroll: true,
            autoHeight: true
        });

        // END PDF Panel
        //-----------------------------------------------------------------------
        // Filter panel for the report
        //-----------------------------------------------------------------------
        me.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 3,
            margin: '0 0 3 0',
            collapsible: true,
            floatable : false,
            buttonAlign: 'left',
            title: i18n('filter'),
            // Draw the buttons to render and clear the report panel view.
            buttons: [
                {
                    text: i18n('generate_report'),
                    iconCls: 'icoReport',
                    listeners: {
                        afterrender: function() {
                            this.fireEvent('click', this); // works
                        },
                        click: function() {
                            me.generateReport();
                        }
                    }
                    /*scope: me,
                    handler: me.generateReport*/
                },
                '->',
                me.comboExport
            ],
            listeners: {
                collapse : function(){
                    this.updateLayout();
                   // console.log('collapse');
                },
                expand : function(){
                    this.updateLayout();
                   // console.log('expand');
                }
            }
        });
        me.pageBody = [me.formPanel, me.renderContainer];
        me.callParent(arguments);
    },

    setReportPanel: function(config){
        var me = this;
        if(config.title) me.formPanel.setTitle(config.title);
        if(config.action) me.formPanel.action = config.action;
        if(config.fn) me.formPanel.reportFn = config.fn;
//        if(config.store) me.store = config.store;
//        if(config.columns) me.columns = config.columns;
        me.formPanel.removeAll();
        me.formPanel.add(config.items);
        say(config);


    },

    /*
     getGridPanel:function(){
     var me = this;
     return this.renderContainer.add(Ext.create('Ext.grid.Panel',{
     store:me.store,
     columns:me.columns,
     border:false
     }));
     },
     */
    /**
     * PDF render panel
     * Just create the panel and do not display the PDF yet, until
     * the user click create report.
     * @return {*}
     */
    getPDFPanel:function(src){
        //-----------------------------------------------------------------------
        // PDF render panel
        // Just create the panel and do not display the PDF yet, until
        // the user click create report.
        //-----------------------------------------------------------------------
        return this.renderContainer.add(Ext.create('App.ux.ManagedIframe', {
            src: src, height: '100%'

        }));
    },

    generateReport:function(btn){
        var me = this, form = me.formPanel, params = form.getForm().getValues();
        var cbexptype = me.comboExport.getValue();//Ext.getCmp('cb_exporttype').getValue();
        this.renderContainer.removeAll(true);
        delete this.pdf;
        if(typeof form.reportFn == 'function'){
            this.renderContainer.removeAll(true);
            params.cb_exporttype = cbexptype;
            form.reportFn({params:params}, function(provider, response){
                me.pdf = me.getPDFPanel(response.result.url);
            });
        }else{
            Ext.Msg.alert('Oops!', 'No function provided');
        }

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
