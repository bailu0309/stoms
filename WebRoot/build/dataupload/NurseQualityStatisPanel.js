Ext.define('build.dataupload.NurseQualityStatisPanel', {
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

        me.year = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '年度',
            labelWidth: 40,
            labelAlign: 'right',
            width: 150,
            name: 'year',
            queryMode: 'local',
            store: new Ext.data.ArrayStore({
                fields: ['id', 'name'],
                data: []
            }),
            value: Ext.Date.format(new Date(), 'Y'),
            valueField: 'name',
            displayField: 'id',
            triggerAction: 'all',
            autoSelect: true,
            listeners: {
                beforerender: function () {
                    var newyear = Ext.Date.format(new Date(), 'Y');//这是为了取现在的年份数
                    var yearlist = [];
                    for (var i = newyear; i >= newyear - 10; i--) {
                        yearlist.push([i, i]);
                    }
                    this.store.loadData(yearlist);
                }
            }
        });

        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '医疗机构名称',
            labelAlign: 'right',
            labelWidth: 90,
            width: 250
        });
        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所属质控中心',
            labelWidth: 90,
            labelAlign: 'right',
            width: 280,
            hidden: !PROROLE,
            name: 'qccid',
            editable: false,
            displayField: 'username',
            valueField: 'name',
            store: me.qccStore,
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.year, this.username, me.qccid, '-', {
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
                    me.year.reset();
                    me.username.reset();
                    me.qccid.reset();
                }
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
                }
            }
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
                url: globalCtx + '/NurseQualityController/queryNurseQualityStatis.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.qccStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/listQcc.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            new Ext.grid.RowNumberer({width: 40}),
            {text: '组织机构代码', width: 120, dataIndex: 'name', hidden: true},
            {text: '医疗机构名称', width: 350, dataIndex: 'username', renderer: qtipRenderers},
            {text: '年度', width: 100, dataIndex: 'year', hidden: true},
            {text: '第一季度', width: 100, dataIndex: 'a', renderer: uploadRenderers},
            {text: '第二季度', width: 100, dataIndex: 'b', renderer: uploadRenderers},
            {text: '第三季度', width: 100, dataIndex: 'c', renderer: uploadRenderers},
            {text: '第四季度', width: 100, dataIndex: 'd', renderer: uploadRenderers}
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        this.store.load({
            params: {
                year: me.year.getValue(),
                username: me.username.getValue(),
                qccid: me.qccid.getValue()
            }
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});