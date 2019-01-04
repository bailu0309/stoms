Ext.define('build.dataupload.NurseQualityShowPanel', {
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
            items: [this.gridPanel, me.showPanel]
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
        me.quarter = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '季度',
            labelWidth: 40,
            labelAlign: 'right',
            width: 150,
            name: 'quarter',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['一季度', '1'], ['二季度', '2'], ['三季度', '3'], ['四季度', '4']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.fst = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '上报状态',
            hidden: !HOSPROLE,
            labelWidth: 60,
            labelAlign: 'right',
            width: 150,
            name: 'fst',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['全部', ''], ['已上报', '1'], ['未上报', '0']
                ]
            }),
            queryMode: 'local',
            typeAhead: true
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
            items: [me.year, me.quarter, this.username, me.qccid, me.fst, '-', {
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
                    me.quarter.reset();
                    me.username.reset();
                    me.qccid.reset();
                    me.fst.reset();
                }
            }, {
                xtype: 'button',
                text: '上报',
                hidden: !HOSPROLE,
                iconCls: 'up',
                scope: this,
                handler: function () {
                    me.upload();
                }
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'excel',
                scope: this,
                handler: function () {
                    me.exportData();
                }
            }]
        });


        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            selModel: new Ext.selection.CheckboxModel({mode: 'MULTI', allowDeselect: true}),//单选可反选
            dockedItems: [this.toolBar],
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.fid = record.get('fid');
                    me.showPanel.setData(me.fid);

                    me.showPanel.expand();

                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: this.store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.showPanel = Ext.create('build.dataupload.NurseQualityPanel', {
            region: 'east',
            title: '上报数据',
            border: true,
            width: 1100,
            collapsed: true,
            collapsible: true,
            listeners: {
                beforeexpand: function () {
                }
            },
            callBack: function () {
                me.store.reload();
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
                url: globalCtx + '/NurseQualityController/queryNurseQualityPage.sdo',
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
            {text: '组织机构代码', width: 120, dataIndex: 'name', hidden: true},
            {text: '医疗机构名称', width: 200, dataIndex: 'username', renderer: qtipRenderers},
            {text: '年份', width: 100, dataIndex: 'year'},
            {
                text: '季度', width: 100, dataIndex: 'quarter', renderer: function (v) {
                if (v == 1) {
                    return '一季度';
                } else if (v == 2) {
                    return '二季度';
                } else if (v == 3) {
                    return '三季度';
                } else if (v == 4) {
                    return '四季度';
                }
            }
            },
            {text: '录入时间', width: 180, dataIndex: 'ftime'},
            {text: '上报人', width: 150, dataIndex: 'xm'},
            {
                text: '上报状态', width: 100, dataIndex: 'fst',
                renderer: function (v) {
                    if (v == 1) {
                        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shtg.png title='已上报'> 已上报</img>";
                    } else {
                        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/unaudit.png title='未上报'> 未上报</img>";
                    }
                }
            }
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        var params = {
            year: me.year.getValue(),
            quarter: me.quarter.getValue(),
            username: me.username.getValue(),
            qccid: me.qccid.getValue(),
            fst: me.fst.getValue()
        };
        Ext.apply(this.store.proxy.extraParams, params);
        this.store.load();
    },
    upload: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length > 0) {
            var flag = false;
            var fids = '';
            Ext.Array.forEach(r, function (data) {
                if (data.get('fst') == '1') {
                    flag = true;
                }
                fids += data.get('fid') + ",";
            });
            if (flag) {
                Ext.Msg.alert("提示", "选择的数据中包含已上报数据，请重新选择后上报！");
                return;
            }
            fids = fids.substring(0, fids.length - 1);
            Ext.MessageBox.confirm('提示', '确定上报所选数据？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    method: 'post',
                    url: globalCtx + '/NurseQualityController/upLoadQuality.sdo',
                    params: {fid: fids},
                    waitTitle: '请稍等片刻',
                    waitMsg: '正在上报...',
                    scope: this,
                    success: function (resp) {
                        var obj = Ext.util.JSON.decode(resp.responseText);
                        if (obj.success == true) {
                            App.getApplication().msg('提示', '上报成功!');
                        } else {
                            Ext.Msg.alert("提示", "错误信息:" + obj.info);
                        }
                        me.search();
                    },
                    failure: function (response, opts) {
                        this.exception();
                    }
                });
            });
        } else {
            App.getApplication().msg('提示', '请选择一条数据进行上报！', 2000);
        }
    },
    exportData: function () {
        var me = this;
        var params = {
            year: me.year.getValue(),
            quarter: me.quarter.getValue(),
            username: me.username.getValue(),
            qccid: me.qccid.getValue(),
            fst: me.fst.getValue()
        };

        var link = Utils.createURL(globalCtx + '/NurseQualityController/exportNurseQuality.sdo' + '?1=1', params);

        window.open(link);

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});