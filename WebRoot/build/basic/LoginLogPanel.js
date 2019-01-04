Ext.define('build.basic.LoginLogPanel', {
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
            width: 140,
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
            fieldLabel: '时间范围',
            format: 'Y-m-d',
            width: 180
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            labelAlign: 'right',
            fieldLabel: '~',
            labelSeparator: '',
            labelWidth: 10,
            format: 'Y-m-d',
            width: 120
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.qname, me.msgtype, me.sdate, me.edate, {
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
                url: globalCtx + '/basic/UserController/listLogin.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var statusRenderer = function (v) {
            if (v == 1) return '<span style="color: #379337;font-weight: bold;">成功</span>';
            else if (v == 0) return '<span style="color: #c9c5dd;font-weight: bold;">失败</span>';
        };
        this.columns = [
            {text: 'ID', dataIndex: 'fid', hidden: true},
            new Ext.grid.RowNumberer({width: 40}),
            {text: '登录人', align: 'center', width: 150, dataIndex: 'name'},
            {text: '登录时间', align: 'center', width: 150, dataIndex: 'loginTime'},
            {text: '登录IP', align: 'center', width: 110, dataIndex: 'ip'},
            {text: '登录状态', align: 'center', width: 60, dataIndex: 'status', renderer: statusRenderer},
            {text: '登录消息', align: 'center', width: 110, dataIndex: 'message'}
        ]
    },
    search: function () {
        var me = this;
        var params = {fcontent: me.qname.getValue()};
        this.logStore.currentPage = 1;
        Ext.apply(this.logStore.proxy.extraParams, params);
        this.logStore.load({params: {"start": 0, "limit": 20}});
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});