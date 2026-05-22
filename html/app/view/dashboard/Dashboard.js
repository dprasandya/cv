
Ext.define('App.view.dashboard.Dashboard', {
	extend: 'App.ux.RenderPanel',
	pageTitle: _('dashboard'),
	itemId: 'DashboardPanel',
    xtype: 'basic-column',

	initComponent: function(){
		var me = this;
        me.dashboard = Ext.create('Ext.panel.Panel', {
            layout: 'auto'
        });
/*		
		Ext.define('model', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                //{name: 'item_id',type: 'string'},
                {name: 'periode',type: 'string'},
                {name: 'qty1',type: 'float'},
                {name: 'qty2',type: 'float'},
                {name: 'total',type: 'float'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Chart.jenis_order
                }
            }
        });
		me.jenis_so_store = Ext.create('Ext.data.Store', { storeId : 'jenis_so_store',model : 'model',remoteSort : false});
        me.jenis_so_store.proxy.extraParams = {module:'jenis_so_order'}; me.jenis_so_store.load();
        me.jenis_inv_store = Ext.create('Ext.data.Store', { storeId : 'jenis_inv_store',model : 'model',remoteSort : false});
        me.jenis_inv_store.proxy.extraParams = {module:'jenis_inv_order'}; me.jenis_inv_store.load();

        me.cpo = me.addCategory(600, {
            xtype: 'chart',
            height: 410,
            width: 600,
            style: 'background: #fff',
            padding: '10 0 0 0',
            insetPadding: 40,
            legend: {
                position: 'bottom',
                boxStrokeWidth: 0,
                labelFont: '12px Helvetica'
            },
            animate: true,
            shadow: false,
            store: me.jenis_so_store,
            items: [{
                type  : 'text',
                text  : 'Monthly Sale '+ new Date().getFullYear(),
                font  : '22px Helvetica',
                width : 200,
                height: 50,
                x : 40, //the sprite x position
                y : 12,  //the sprite y position,
                insetPadding: {
                    top: 40,
                    bottom: 40,
                    left: 20,
                    right: 40
                },
            }],
            axes: [{
                type: 'Numeric',
                fields: 'qty1',
                position: 'left',
                grid: true,
                minimum: 0,
                titleMargin: 20,
                title: {
                    text: 'QTY(Ton)'
                },
                label: {
                    renderer: function(v) { return Ext.util.Format.number(v, '0,0') }
                }
            }, {
                type: 'Category',
                fields: ['periode'],
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: 0
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                title: ['CPO','Kernel'],
                xField: ['periode'],
                yField: ['qty1','qty2'],
                style: {
                    opacity: 1,
                },
                highlight: {
                    fill: '#008000',
                    'stroke-width': 10,
                    stroke: '#00FF00'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    width: 250,
                    renderer: function(storeItem, item) {
                        var barang = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                        this.setTitle(barang + ': ' + Ext.util.Format.number(storeItem.get(item.yField), '0,0'));
                    }
                }
            }]
        });
        me.jenis_order = me.addCategory(400, {
            xtype: 'chart',
            width: 400,
            height: 400,
            style: 'background: #fff',
            padding: '10 0 0 0',
            insetPadding: 40,
            animate: true,
            shadow: false,
            align: 'right',
            store: me.jenis_inv_store,
            items: [{
                type  : 'text',
                text  : 'Monthly Kernel Sale '+ new Date().getFullYear(),
                font  : '22px Helvetica',
                width : 200,
                height: 50,
                x : 40, //the sprite x position
                y : 12,  //the sprite y position,
                insetPadding: {
                    top: 40,
                    bottom: 40,
                    left: 20,
                    right: 40
                },
            }
            ],
            axes: [{
                type: 'Numeric',
                fields: 'qty',
                position: 'left',
                grid: true,
                minimum: 0,
                titleMargin: 20,
                title: {
                    text: 'QTY(Ton)'
                },
                label: {
                    renderer: function(v) { return Ext.util.Format.number(v, '0,0') }
                }
            }, {
                type: 'Category',
                fields: ['periode'],
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: 0
                    }
                }
            }],
            series: [{
                type: 'column',
                axis: 'left',
                xField: ['item_id'],
                yField: ['qty'],
                style: {
                    minGapWidth: 20
                },
                highlight: {
                    strokeStyle: 'black',
                    fillStyle: 'yellow'
                },
                label: {
                    field: 'qty',
                    display: 'insideEnd',
                    renderer: function (value) {
                        return Ext.util.Format.number(value.toFixed(0), '0,0') ;
                    }                    
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    width: 140,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('item_id') + ': ' +  Ext.util.Format.number(storeItem.get('qty'), '0,0'));
                    }
                }
            }]
        });*/

		Ext.apply(me, {
			pageBody: [me.dashboard
			]
		});

		me.callParent();
	},
    addCategory: function(width, chart){
        var me = this;
        return me.dashboard.add(Ext.create('Ext.container.Container', {
            cls: 'CategoryContainer',
            width: width,
            layout: 'anchor',
            items: [chart]
        }));
    },
    onActive      : function(callback) 
	{
		callback(true);
	}
});
