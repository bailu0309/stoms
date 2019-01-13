Ext.define('build.goods.GoodsShowPanel', {
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
        me.showType = 1;
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

        me.search();
        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initBigParts: function () {
        var me = this;


        this.name = Ext.create('Ext.form.field.Text', {
            fieldLabel: '商品信息',
            name: 'name',
            labelAlign: 'right'
        });
        me.sval = Ext.create('Ext.form.field.Number', {
            name: 'sval',
            fieldLabel: '库存量'
        });
        me.eval = Ext.create('Ext.form.field.Number', {
            name: 'eval',
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
            width: 300,
            defaults: {bodyStyle: 'padding:2px', border: false},
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: 1, labelWidth: 60, labelAlign: 'right', width: '95%'},
                items: [me.name]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: 1, labelWidth: 60, labelAlign: 'right', width: '95%'},
                items: [me.brand]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .5, labelWidth: 60, labelAlign: 'right', width: '95%'},
                items: [me.sval, me.eval]
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            selModel: new Ext.selection.CheckboxModel({mode: 'MULTI', allowDeselect: true}),//单选可反选
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.fid = record.get('fid');
                    me.type = record.get('type');
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
        })

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
                url: globalCtx + '/GoodsController/queryGoods.sdo',
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
                url: globalCtx + '/GoodsController/queryWareHouseGoods.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '商品名称', width: 200, dataIndex: 'name', cellWrap: true, renderer: breakRenderers},
            {text: '品牌', width: 100, dataIndex: 'brand', cellWrap: true, renderer: breakRenderers},
            {text: '规格型号', width: 200, dataIndex: 'model', cellWrap: true, renderer: breakRenderers},
            {text: '总数量', width: 100, dataIndex: 'amount'},
            {text: '单位', width: 150, dataIndex: 'unit'},
            {text: '类别', width: 100, dataIndex: 'type'},
            {text: '供应商', width: 200, dataIndex: 'supplier'},
            {text: '备注', width: 200, dataIndex: 'remark', cellWrap: true, renderer: breakRenderers}
        ];
        this.itemscolumns = [
            {text: '仓库名称', width: 200, dataIndex: 'name', cellWrap: true, renderer: breakRenderers},
            {text: '库存量', width: 100, dataIndex: 'amount'}
        ]
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
                    url: globalCtx + '/AdverBaseController/upLoadAdverBase.sdo',
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
    loadData: function (sdate, edate, orgcode, type, qccid) {
        var me = this;
        me.sdate.setValue(sdate);
        me.edate.setValue(edate);
        me.atype.setValue(type);
        me.name.setValue(orgcode);
        me.qccid.setValue(qccid);
        me.fst.setValue(1);
        me.showType = 2;
        me.queryPanel.setHidden(true);
        if (me.spanel) {
            me.spanel.setTitle();
        }
        me.search();
    },
    setQueryParams: function (params) {
        var me = this;

        me.showType = 2;
        me.queryPanel.setHidden(true);
        if (me.spanel) {
            me.spanel.setTitle();
        }
        me.store.currentPage = 1;
        Ext.apply(this.store.proxy.extraParams, params);
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