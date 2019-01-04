Ext.define('build.adverseevent.AdverseStatisCityPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        this.initColumn();
        this.initBigParts();
        Ext.apply(this, {
            layout: 'border',
            border: true,
            defaults: {split: true},
            items: [this.gridPanel]
        });

        me.search();
        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initBigParts: function () {
        var me = this;


        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'sdate',
            labelWidth: 60,
            width: 180,
            fieldLabel: '上报时间'
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'edate',
            labelWidth: 20,
            width: 140,
            labelSeparator: '',
            fieldLabel: '~'
        });


        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.sdate, me.edate, '-', {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: function () {
                    me.search();
                }
            }, {
                xtype: 'button',
                text: '清空',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    me.sdate.reset();
                    me.edate.reset();
                }
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'download',
                scope: this,
                handler: me.exportStatis
            }]
        });


        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            dockedItems: [this.toolBar],
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.statisWin.setTitle(record.get('username'));
                    me.statisPanel.loadData(me.sdate.getRawValue(), me.edate.getRawValue(), record.get('name'));
                    me.statisWin.show();
                }
            }
        });

        me.statisPanel = Ext.create('build.adverseevent.AdverseStatisPanel', {
            width: '100%',
            hideBtn: true,
            height: 500
        });

        me.statisWin = Ext.create('Ext.window.Window', {
            autoHeight: true,
            width: 950,
            height: 550,
            title: '',
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [me.statisPanel]
        });


    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AdverBaseController/queryAdverseCityStatis.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            new Ext.grid.RowNumberer({width: 40}),
            {text: '组织机构代码', width: 120, dataIndex: 'name', hidden: true},
            {text: '质控中心名称', width: 350, dataIndex: 'username', renderer: qtipRenderers},
            {text: '压疮', width: 100, align: 'center', dataIndex: 'a'},
            {text: '跌倒坠床', width: 100, align: 'center', dataIndex: 'b'},
            {text: '安全管理及意外伤害', width: 150, align: 'center', dataIndex: 'c'},
            {text: '非计划拔管', width: 100, align: 'center', dataIndex: 'd'},
            {text: '给药错误', width: 100, align: 'center', dataIndex: 'e'},
            {text: '合计', width: 100, align: 'center', dataIndex: 'tj'}
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        this.store.load({
            params: {
                sdate: me.sdate.getRawValue(),
                edate: me.edate.getRawValue()
            }
        });
    },
    exportStatis: function () {
        var me = this;
        var fdate = this.sdate.getRawValue();
        var fedate = this.edate.getRawValue();
        var link = globalCtx + '/ExportController/exportAdverseCityStatis.sdo' + '?1=1';
        if (!Ext.isEmpty(fdate)) {
            link += '&sdate=' + fdate;
        }
        if (!Ext.isEmpty(fedate)) {
            link += '&edate=' + fedate;
        }
        window.open(link);

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});