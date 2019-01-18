Ext.define('build.goods.InstoreListPanel', {
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
            items: [me.queryPanel, {
                region: 'center',
                layout: 'border',
                items: [this.gridPanel, this.itemsPanel]
            }]
        });

        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initBigParts: function () {
        var me = this;

        this.iname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '入库人',
            name: 'iname',
            labelAlign: 'right'
        });
        this.goodsname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '入库物品',
            name: 'qv',
            labelAlign: 'right'
        });
        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'sdate',
            fieldLabel: '入库时间'
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'edate',
            fieldLabel: '至'
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: ['->', {
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
                    me.queryPanel.getForm().reset();
                }
            }]
        });
        this.toolBar2 = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '新增入库单',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.instoreShowWin.show();
                }
            }, {
                text: '新增入库物品',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.insitemWin.show();
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

        me.queryPanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            collapsible: true,
            dockedItems: [this.toolBar],
            title: '查询条件',
            layout: 'column',
            region: 'west',
            width: 360,
            defaults: {bodyStyle: 'padding:2px', border: false},
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 60, labelAlign: 'right', width: '100%'},
                items: [me.iname]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 60, labelAlign: 'right', width: '100%'},
                items: [me.goodsname]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .49, labelWidth: 60, labelAlign: 'right', width: '100%'},
                items: [me.sdate, me.edate]
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            dockedItems: [this.toolBar2],
            border: true,
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.insStore,
            columns: this.insColumns,
            listeners: {
                rowclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.rid = record.get('id');
                    me.searchItems();
                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: this.insStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.itemsPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            height: '45%',
            region: 'south',
            border: false,
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.itemsstore,
            columns: this.itemscolumns,
            listeners: {}
        });


        me.instorePanel = Ext.create('build.goods.InstorePanel', {
            width: 600,
            height: 400,
            region: 'center',
            border: true,
            callBack: function () {
                me.insStore.reload();
                me.reinfoShowWin.hide();
            }
        });

        me.instoreShowWin = Ext.create('Ext.window.Window', {
            title: '添加入库单',
            width: 620,
            height: 440,
            autoHeight: true,
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [me.instorePanel],
            buttonAlign: 'center'
        });

        me.insitemsPanel = Ext.create('build.goods.InstoreItemsPanel', {
            width: 600,
            height: 400,
            region: 'center',
            border: true,
            callBack: function () {
                me.itemsstore.reload();
                me.insitemWin.hide();
            }
        });

        me.insitemWin = Ext.create('Ext.window.Window', {
            title: '添加入库物品',
            width: 620,
            height: 440,
            autoHeight: true,
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [me.insitemsPanel],
            buttonAlign: 'center'
        });


    },
    initStore: function () {
        this.insStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/GoodsController/queryInstore.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.itemsstore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/GoodsController/queryInstoreItems.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.insColumns = [
            {text: '入库名称', width: 120, dataIndex: 'name'},
            {text: '入库编码', width: 120, dataIndex: 'code'},
            {text: '入库时间', width: 180, dataIndex: 'intime'},
            {text: '入库人', width: 150, dataIndex: 'iname'},
            {text: '供应商', width: 250, dataIndex: 'sname'}

        ];

        this.itemscolumns = [
            {text: '仓库', width: 120, dataIndex: 'wname'},
            {text: '物品名称', width: 180, dataIndex: 'gname'},
            {text: '型号', width: 180, dataIndex: 'model'},
            {text: '品牌', width: 180, dataIndex: 'brand'},
            {text: '供应商', width: 200, dataIndex: 'sname'},
            {text: '入库数量', width: 150, dataIndex: 'amount'}
        ]
    },
    del: function () {
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
                Ext.Msg.alert("提示", "选择的数据中包含已上报数据，无法删除！");
                return;
            }
            fids = fids.substring(0, fids.length - 1);
            Ext.MessageBox.confirm('提示', '删除数据后将无法恢复，是否删除所选数据？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    method: 'post',
                    url: globalCtx + '/AdverBaseController/delAdverBase.sdo',
                    params: {fid: fids},
                    waitTitle: '请稍等片刻',
                    waitMsg: '正在删除...',
                    scope: this,
                    success: function (resp) {
                        var obj = Ext.util.JSON.decode(resp.responseText);
                        if (obj.success == true) {
                            App.getApplication().msg('提示', '删除成功!');
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
            App.getApplication().msg('提示', '请选择一条数据进行删除！', 2000);
        }
    },
    search: function () {
        var me = this;
        me.insStore.currentPage = 1;

        var params = me.queryPanel.getForm().getValues();

        Ext.apply(this.insStore.proxy.extraParams, params);

        this.insStore.load();
    },
    searchItems: function () {
        var me = this;
        var params = {
            rid: me.rid
        };

        Ext.apply(this.itemsstore.proxy.extraParams, params);

        this.itemsstore.load();
    },
    exportData: function () {
        var me = this;
        var params = me.queryPanel.getForm().getValues();

        var link = Utils.createURL(globalCtx + '/ExportController/exportAdverse.sdo' + '?1=1', params);

        window.open(link);

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});