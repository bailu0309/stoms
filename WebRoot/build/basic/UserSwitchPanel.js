Ext.define('build.basic.UserSwitchPanel', {
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
        this.initStore();//初始化数据
        this.initColumn();//初始化columns

        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            forceFit: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.userStore,
            columns: this.columns,
            tbar: this.toolBar
        });

        Ext.apply(this, {
            layout: 'border',
            items: [this.gridPanel]
        });
        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
        this.gridPanelLoadData();
    },
    initStore: function () {
        this.statusStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {"id": "0", "name": "可用"},
                {"id": "1", "name": "不可用"}
            ]
        });
        this.stateStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {"id": "0", "name": "否"},
                {"id": "1", "name": "是"}
            ]
        });
        this.userStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/listmainbyself.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var statusRenderer = function (v) {
            if (v == 0) return '<span style="color: #379337;font-weight: bold;">可用</span>';
            else if (v == 1) return '<span style="color: #c9c5dd;font-weight: bold;">不可用</span>';
        };
        var mtypeRenderer = function (v) {
            if (v == 1) return '<span style="color: #379337;font-weight: bold;">是</span>';
            else if (v == 0) return '<span style="color: #c9c5dd;font-weight: bold;">否</span>';
        };
        this.columns = [
            {
                text: '用户名', width: 90, dataIndex: 'name', renderer: function (v) {
                if (name == v) {
                    return v + '<span style="color:blue;font-weight:bold" data-qtip="当前用户">*</span>'
                } else {
                    return v;
                }
            }
            },
            {text: '姓名', width: 80, dataIndex: 'username'},
            {text: '科室编码', width: 100, dataIndex: 'depid', hidden: true},
            {text: '科室名称', width: 200, dataIndex: 'depname'},
            {text: '角色', width: 150, dataIndex: 'rolenames'},
            {
                text: '', dataIndex: 'name', width: 60, renderer: function (v) {
                // return " <a href=\"#\" title=\"切换用户\" onclick=\"crt.removeMsg('" + record.data.fid + "')\"><img class=\"m3\" src=\"" + globalCtx + "/images/main/littleh06.png\"/>切换</a>";
                return "<a href='#' title='切换用户' onclick=\"crt.switchUser('" + v + "')\">切换</a>";
            }
            }

        ]
    },
    gridPanelLoadData: function () {
        this.userStore.load({params: {"start": 0, "limit": 25}});
    },
    reloadGrid: function () {
        this.gridPanel.getView().refresh();
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});