/**
 *科室列表
 */
Ext.define('build.basic.OffimPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn'
    ],
    initComponent: function () {
        Ext.tip.QuickTipManager.init();
        this.initStore();
        this.initColumn();
        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                fieldLabel: '',
                xtype: 'textfield',
                name: 'fdesc',
                allowBlank: false
            }, {
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.search
            }, {
                text: '新建',
                iconCls: 'add',
                scope: this,
                handler: this.addDepart
            }, '-', {
                text: '修改',
                scope: this,
                iconCls: 'edit',
                handler: this.editDepart
            }, {
                text: '删除',
                iconCls: 'delete',
                scope: this,
                handler: this.deleteDepart
            }]
        });

        this.departPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            reserveScrollbar: true,
            useArrows: true,
            rootVisible: false,
            columnLines: true,
            collapseFirst: false,
            forceFit: true,
            viewConfig: {stripeRows: true},
            multiSelect: false,
            store: this.departStore,
            columns: this.columns,
            tbar: this.toolBar
        });

        this.foffn = Ext.create('Ext.form.field.Text', {
            fieldLabel: '科室编码',
            name: 'foffn',
            readOnly: true,
            allowBlank: false
        });

        this.departShowPanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            layout: 'column',
            defaults: {
                xtype: 'panel',
                layout: 'form',
                border: false,
                defaults: {margin: 2, anchor: '100%', xtype: 'textfield'}
            },
            fieldDefaults: {labelAlign: 'right', labelWidth: 90},
            items: [{
                xtype: 'fieldset',
                title: '账号信息',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [this.foffn, {
                    xtype: 'hidden', name: 'fid'
                }, {
                    fieldLabel: '科室名称',
                    name: 'fdesc',
                    allowBlank: false
                }, {
                    fieldLabel: '拼音码',
                    name: 'fqun'
                }, {
                    fieldLabel: '状态',
                    name: 'fst',
                    allowBlank: false,
                    store: this.statusStore,
                    queryMode: 'local',
                    value: "1",
                    editable: false,
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'id'
                }]
            }]
        });
        this.departWindow = Ext.create('Ext.window.Window', {
            autoHeight: true,
            width: 400,
            title: '新建',
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [this.departShowPanel],
            buttonAlign: 'center',
            buttons: [{
                text: '确定',
                scope: this,
                iconCls: 'confirm',
                handler: this.saveDepart
            }, {
                text: '取消',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    this.departShowPanel.reset();
                    this.departWindow.close();
                }
            }]
        });

        Ext.apply(this, {
            layout: 'border',
            items: [this.departPanel]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
    },
    initStore: function () {
        this.departStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/OffimController/list.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.statusStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {"id": "1", "name": "可用"},
                {"id": "0", "name": "不可用"}
            ]
        });
    },
    initColumn: function () {
        this.fstRenderer = function (v) {
            if (v == 1) return '<span style="color: #379337;font-weight: bold;">可用</span>';
            else if (v == 0) return '<span style="color: #c9c5dd;font-weight: bold;">不可用</span>';
        };
        this.columns = [{
            text: '科室代码',
            flex: 2,
            sortable: true,
            dataIndex: 'foffn'
        }, {
            text: '科室描述',
            flex: 1.4,
            sortable: true,
            dataIndex: 'fdesc'
        }, {
            text: '拼音码',
            flex: 2,
            sortable: true,
            dataIndex: 'fqun'
        }, {
            text: '类型',
            flex: 2.5,
            sortable: true,
            dataIndex: 'ftype'
        }, {
            text: '状态',
            flex: 1.2,
            sortable: true,
            renderer: this.fstRenderer,
            dataIndex: 'fst'
        }]
    },
    search: function () {
        var me = this;
        var value = Ext.ComponentQuery.query('textfield', this.toolBar)[0].getValue();
        var params = {fdesc: value};
        Ext.apply(this.departStore.proxy.extraParams, params);
        this.departStore.load();
    },
    addDepart: function () {
        var me = this;
        this.foffn.setReadOnly(false);
        me.departWindow.show();
    },
    saveDepart: function () {
        var form = this.departShowPanel.getForm();
        var baseParams = form.getFieldValues();
        if (form.isValid()) {
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/basic/OffimController/add.sdo',
                params: baseParams,
                waitTitle: '请稍等片刻',
                waitMsg: '正在提交...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        App.getApplication().msg('提示', '保存成功');
                        this.departShowPanel.reset();
                        this.departWindow.close();
                        this.search();
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        }
    },
    editDepart: function () {
        var me = this;
        me.foffn.setReadOnly(true);
        r = this.departPanel.getSelectionModel().getSelection()[0];
        this.departShowPanel.getForm().loadRecord(r);
        this.departWindow.setTitle('修改科室');
        me.departWindow.show();
    },
    deleteDepart: function () {
        var me = this;
        var r = this.departPanel.getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('提示', '确定删除所选科室？', function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/basic/OffimController/delete.sdo',
                params: {fid: r.get('fid')},
                waitTitle: '请稍等片刻',
                waitMsg: '正在删除...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        App.getApplication().msg('提示', '删除成功!');
                        me.search();
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});