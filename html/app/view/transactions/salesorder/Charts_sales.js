
Ext.define('App.view.transactions.salesorder.Charts_sales', {
    //extend: 'App.ux.RenderPanel',
    extend: 'Ext.Panel',
    xtype: 'tip-chart',
    pageTitle: _('charts_sales'),
    initComponent: function(){
        var me = this;

        // *************************************************************************************
        // Module Data Store
        // *************************************************************************************
        me.store_order = Ext.create('App.store.transactions.salesorder.Charts_order',{remoteSort: true, pageSize : 20, autoLoad: false});
        me.store_sales = Ext.create('App.store.transactions.salesorder.Charts_sales',{remoteSort: true, pageSize : 20, autoLoad: false});

        me.items= [{
            xtype: 'chart',
            width: 400,//'100%',
            height: 410,
            padding: '10 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: me.store_sales,
            insetPadding: 40,
            items: [{
                type  : 'text',
                text  : 'Order of Month',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                fields: 'qty',
                position: 'left',
                grid: true,
                minimum: 0,
                label: {
                    renderer: function(v) { return Ext.util.Format.number(v, '0,0') + ' Kg' }
                }
            }, {
                type: 'Category',
                fields: ['monthx'],
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: ['monthx'],
                yField: ['qty'],
                style: {
                    'stroke-width': 3
                },
                markerConfig: {
                    radius: 3
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 3,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('monthx') + ': ' + storeItem.get('qty') + ' Kg');
                    }
                }
            }]
        }];
        me.pageBody = [me.items];
        me.callParent(arguments);
    },


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.store_order.load();
        this.store_sales.load();
        callback(true);
    }
});
