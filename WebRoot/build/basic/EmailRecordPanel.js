Ext.define('build.basic.EmailRecordPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel',
        'build.util.selector.RoleSelectorWindow'
    ],
    initComponent: function () {
        var me = this;
        me.sdeparts = '';
        this.initStore();
        this.initColumn();
        this.initMyItems();

        Ext.apply(this, {
            layout: 'border',
            items: [this.gridPanel]
        });
        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initMyItems: function () {
        var me = this;
        me.qname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '关键字',
            labelWidth: 50,
            width: 200,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER) {
                        me.search();
                    }
                }
            }
        });
        this.sdate = Ext.create('Ext.form.field.Date', {
            labelAlign: 'right',
            labelWidth: 70,
            fieldLabel: '发送时间',
            format: 'Y-m-d',
            width: 200
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            labelAlign: 'right',
            fieldLabel: '~',
            labelSeparator: '',
            labelWidth: 10,
            format: 'Y-m-d',
            width: 140
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.qname, me.sdate, me.edate, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.search
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            forceFit: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.logStore,
            columns: this.columns,
            tbar: this.toolBar,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: this.logStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
    },
    initStore: function () {
        this.logStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/EmailRecordController/queryEmailRecord.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: 'ID', dataIndex: 'fid', hidden: true},
            new Ext.grid.RowNumberer({width: 40}),
            {text: '接收人/发送人', align: 'left', width: 100, dataIndex: 'funame', cellWrap: true, renderer: breakRenderers},
            {text: '邮箱地址', align: 'left', width: 100, dataIndex: 'emailaddress'},
            {text: '创建时间', align: 'center', width: 100, dataIndex: 'sendtime'},
            {text: '发送时间', align: 'center', width: 100, dataIndex: 'acttime'},
            {text: '邮件内容', align: 'left', width: 200, dataIndex: 'content', cellWrap: true, renderer: breakRenderers},
            {text: '发送状态', align: 'center', width: 80, dataIndex: 'state', renderer: stateRenderers}
        ]
    },
    search: function () {
        var me = this;
        var params = {content: me.qname.getValue(), sdate: me.sdate.getRawValue(), edate: me.edate.getRawValue()};
        this.logStore.currentPage = 1;
        Ext.apply(this.logStore.proxy.extraParams, params);
        this.logStore.load({params: {"start": 0, "limit": 20}});
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});