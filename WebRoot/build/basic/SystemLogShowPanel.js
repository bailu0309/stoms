/**
 * 医院基础信息页面
 */
Ext.define('build.basic.SystemLogShowPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    initComponent: function () {
        this.initData();
        Ext.apply(this, {
            layout: 'border',
            items: [this.formPanel]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
    },
    onDestroy: function () {
        this.callParent();
    },
    initData: function () {
        var me = this;
        me.initToolBar();
        me.initStore();
        me.initPartsInfo();
        me.initBigPartsInfo();
    },
    initBigPartsInfo: function () {
        var me = this;

        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            region: 'center',
            autoHeight: true,
            autoScroll: true,
            border: false,
            layout: 'auto',
            fieldDefaults: {labelAlign: 'right', labelWidth: 70, width: '95%'},
            buttonAlign: 'center',
            items: [{
                xtype: 'fieldset',
                layout: 'column',
                border: false,
                collapsible: false,
                columnWidth: 1,
                items: [{
                    border: false,
                    bodyStyle: 'padding-top:5px',
                    items: [me.version]
                }, {
                    border: false,
                    items: [me.ftime]
                }, {
                    border: false,
                    items: [me.content]
                }]
            }]
        })
    },
    initToolBar: function () {
        var me = this;
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/SystemLogController/queryLastSystemLog.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initPartsInfo: function () {
        var me = this;

        me.version = Ext.create('Ext.form.field.Text', {
            labelAlign: 'right',
            labelWidth: 70,
            name: 'version',
            fieldLabel: '版本号'
        });

        me.ftime = Ext.create('Ext.form.field.Date', {
            labelAlign: 'right',
            name: 'ftime',
            labelWidth: 70,
            fieldLabel: '更新时间',
            format: 'Y-m-d'
        });

        me.content = Ext.create('Ext.form.field.TextArea', {
            labelAlign: 'right',
            name: 'content',
            labelWidth: 70,
            fieldLabel: '更新说明',
            height: 180
        });
    },
    loadData: function () {
        var me = this;
        this.formPanel.reset();
        this.store.load({
            params: {},
            callback: function (records) {
                var data = records[0].data;

                var r = Ext.create('Model', data);
                me.formPanel.getForm().loadRecord(r);
            }
        });
        me.formPanel.isValid();
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});