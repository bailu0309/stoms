Ext.define('build.goods.RecieveGridPanel', {
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

        this.recname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '领用人',
            name: 'recname',
            labelAlign: 'right'
        });
        this.goodsname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '领用物品',
            name: 'qv',
            labelAlign: 'right'
        });
        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'sdate',
            fieldLabel: '领用时间'
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
                text: '新增',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.reinfoShowWin.show();
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
                items: [me.recname]
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
            border: false,
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.rid = record.get('id');
                    me.searchItems();
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


        me.reinfoPanel = Ext.create('build.goods.RecievePanel', {
            width: 600,
            height: 400,
            region: 'center',
            border: true,
            callBack: function () {
                me.store.reload();
                me.reinfoShowWin.hide();
            }
        });

        me.reinfoShowWin = Ext.create('Ext.window.Window', {
            title: '',
            width: 620,
            height: 440,
            autoHeight: true,
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [me.reinfoPanel],
            buttonAlign: 'center'
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
                url: globalCtx + '/GoodsController/queryRecieveInfo.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.itemsstore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/GoodsController/queryRecieveItems.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '领用人', width: 120, dataIndex: 'recname'},
            {text: '领用时间', width: 180, dataIndex: 'rectime'},
            {text: '出库单号', width: 200, dataIndex: 'outnum'},
            {text: '审批人', width: 150, dataIndex: 'auditname'},
            {text: '出库人', width: 150, dataIndex: 'outperson'},
            {text: '用途', width: 250, dataIndex: 'purpose', cellWrap: true, renderer: breakRenderers},
            {
                text: '类别', width: 100, dataIndex: 'outtype', dicttype: 'outtype',
                renderer: dictionaryRenderer
            },
            {
                text: '归还状态', width: 100, dataIndex: 'outin', dicttype: 'outin',
                renderer: dictionaryRenderer
            }
        ];

        this.itemscolumns = [
            {text: '仓库', width: 120, dataIndex: 'wname'},
            {text: '商品名称', width: 180, dataIndex: 'gname'},
            {text: '型号', width: 180, dataIndex: 'model'},
            {text: '品牌', width: 180, dataIndex: 'brand'},
            {text: '供应商', width: 200, dataIndex: 'sname'},
            {text: '数量', width: 150, dataIndex: 'amount'}
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
        me.store.currentPage = 1;

        var params = me.queryPanel.getForm().getValues();

        Ext.apply(this.store.proxy.extraParams, params);

        this.store.load();
    },
    searchItems: function () {
        var me = this;
        var params = {
            rid: me.rid
        };

        Ext.apply(this.itemsstore.proxy.extraParams, params);

        this.store.load();
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