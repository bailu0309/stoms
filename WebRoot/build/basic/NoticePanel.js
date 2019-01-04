Ext.define('build.basic.NoticePanel', {
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
        me.msgtype = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '消息类型',
            labelWidth: 70,
            name: 'msgtype',
            width: 170,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            mode: 'local',
            triggerAction: 'all',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [['全部', ''], ['系统消息', '1'], ['发布消息', '2']]
            })
        });
        me.frevoke = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '消息状态',
            labelWidth: 70,
            name: 'frevoke',
            width: 170,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            mode: 'local',
            triggerAction: 'all',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [['全部', ''], ['正常', '0'], ['撤销', '1']]
            })
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.qname, me.msgtype, me.frevoke, me.sdate, me.edate, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.search
            }, {
                text: '新建',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.noticeWindow.setTitle('新建通知');
                    me.noticeWindow.show();
                }
            }, {
                text: '删除',
                iconCls: 'delete',
                scope: this,
                handler: this.deleteNotice
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            // forceFit: true,
            reserveScrollbar: true,
            selModel: new Ext.selection.CheckboxModel({mode: 'MULTI', allowDeselect: true}),
            viewConfig: {stripeRows: true},
            store: this.noticeStore,
            columns: this.columns,
            tbar: this.toolBar,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: this.noticeStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        this.addNoticeKey = {
            scope: this, specialkey: function (f, e) {
                if (e.getKey() == e.ENTER) {
                    this.newNotice();
                }
            }
        };
        this.noticePanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            layout: 'column',
            defaults: {},
            fieldDefaults: {labelAlign: 'right', labelWidth: 70},
            items: [{
                xtype: 'fieldset',
                layout: 'column',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [
                    {
                        xtype: 'hidden', name: 'fid',
                        xtype: 'hidden', name: 'fdeptid'
                    }, {
                        fieldLabel: '消息标题',
                        name: 'ftitle',
                        xtype: 'textfield',
                        columnWidth: 1,
                        afterLabelTextTpl: this.redTpl,
                        margin: 2, anchor: '100%',
                        allowBlank: false
                    }, {
                        fieldLabel: '消息内容',
                        name: 'fcontent',
                        columnWidth: 1,
                        xtype: 'textarea',
                        afterLabelTextTpl: this.redTpl,
                        margin: 2, anchor: '100%',
                        allowBlank: false
                    }, {
                        columnWidth: 1,
                        layout: 'column',
                        border: false,
                        items: [{
                            columnWidth: .8,
                            border: false,
                            items: [{
                                columnWidth: 1,
                                fieldLabel: '通知科室',
                                name: 'fdeptname',
                                margin: 2,
                                anchor: '100%',
                                width: '95%',
                                labelWidth: 70,
                                xtype: 'textarea',
                                afterLabelTextTpl: this.redTpl,
                                editable: false
                            }]
                        }, {
                            columnWidth: .2,
                            border: false,
                            items: [Ext.create('Ext.button.Button', {
                                xtype: 'button',
                                width: 60,
                                text: '选择',
                                listeners: {
                                    'click': function () {
                                        me.departSelectWin.show();
                                    }
                                }
                            })]
                        }]
                    }, {
                        fieldLabel: '状态',
                        columnWidth: 1,
                        margin: 2, anchor: '100%',
                        name: 'frevoke',
                        afterLabelTextTpl: this.redTpl,
                        allowBlank: false,
                        store: this.statusStore,
                        queryMode: 'local',
                        value: "0",
                        editable: false,
                        xtype: 'combo',
                        displayField: 'name',
                        valueField: 'id',
                        listeners: {}
                    }
                ]
            }]
        });
        this.noticeWindow = Ext.create('Ext.window.Window', {
            autoHeight: true,
            width: 400,
            title: '新建消息(<span style="color: blue">科室不选默认所有科室</span>)',
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [this.noticePanel],
            buttonAlign: 'center',
            buttons: [{
                text: '确定',
                scope: this,
                iconCls: 'confirm',
                handler: this.newNotice
            }, {
                text: '取消',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    this.noticePanel.reset();
                    this.noticeWindow.close();
                }
            }]
        });

        me.departSelectWin = Ext.create('build.common.NoticeDepartSelectWindow', {
            callBackFn: function (value, name) {
                me.sdeparts = value;
                me.noticePanel.getForm().findField('fdeptid').setValue(value);
                me.noticePanel.getForm().findField('fdeptname').setValue(name);
            }
        });

    },
    initStore: function () {
        this.statusStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {"id": "0", "name": "正常"},
                {"id": "1", "name": "撤销"}
            ]
        });
        this.noticeStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/NoticeController/list.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var statusRenderer = function (v) {
            if (v == 0) return '<span style="color: #379337;font-weight: bold;">正常</span>';
            else if (v == 1) return '<span style="color: #c9c5dd;font-weight: bold;">撤销</span>';
        };
        this.columns = [
            {text: 'ID', dataIndex: 'fid', hidden: true},
            new Ext.grid.RowNumberer({width: 40}),
            {text: '标题', align: 'center', width: 150, dataIndex: 'ftitle'},
            {text: '内容', align: 'left', width: 400, dataIndex: 'fcontent', renderer: breakRenderers},
            {text: '发布人', align: 'center', width: 100, dataIndex: 'fcname'},
            {text: '发布人科室', align: 'center', width: 150, dataIndex: 'fcdepname'},
            {text: '发布时间', align: 'center', width: 110, dataIndex: 'ftime'},
            {text: '消息类型', align: 'center', width: 110, dataIndex: 'ftype', renderer: msgTypeRenderer},
            {text: '系统类型', align: 'center', width: 110, dataIndex: 'fsystype', renderer: sysTypeRenderer},
            // {text: '发布类型', align: 'center', width: 90, dataIndex: 'fpubtype'},
            {text: '状态', align: 'center', width: 60, dataIndex: 'frevoke', renderer: statusRenderer}
        ]
    },
    newNotice: function () {
        var form = this.noticePanel.getForm();
        var baseParams = form.getFieldValues();
        if (form.isValid()) {
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/NoticeController/addPublishNotice.sdo',
                params: baseParams,
                waitTitle: '请稍等片刻',
                waitMsg: '正在提交...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        App.getApplication().msg('提示', '保存成功');
                        this.noticePanel.reset();
                        this.noticeWindow.close();
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                    this.search();
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        }
    },
    deleteNotice: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length > 0) {
            var flag = false;
            var fids = '';
            Ext.Array.forEach(r, function (data) {
                if (data.get('fcid') != name) {
                    flag = true;
                }
                fids += data.get('fid') + ',';
            });
            if (flag) {
                Ext.Msg.alert("提示", "错误信息：无法删除非本人发布的消息！");
                return;
            }
            fids = fids.substring(0, fids.length - 1);
            Ext.MessageBox.confirm('提示', '确定删除所选消息？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    method: 'post',
                    url: globalCtx + '/NoticeController/deleteNotice.sdo',
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
            Ext.Msg.alert("提示", "请选择所要删除的消息！");
        }
    },
    editNotice: function (p, td, cellIndex, r, tr, rowIndex, e, eOpts) {
        if (r == undefined) {
            r = this.gridPanel.getSelectionModel().getSelection()[0];
        }
        this.noticeWindow.setTitle('修改用户');
        this.noticeWindow.show();
        this.noticePanel.getForm().loadRecord(r);
    },
    search: function () {
        var me = this;
        var params = {
            fcontent: me.qname.getValue(),
            ftype: me.msgtype.getValue(),
            frevoke: me.frevoke.getValue()
        };
        this.noticeStore.currentPage = 1;
        Ext.apply(this.noticeStore.proxy.extraParams, params);
        this.noticeStore.load({params: {"start": 0, "limit": 20}});
    },
    reloadGrid: function () {
        this.gridPanel.getView().refresh();
    },
    setBtn: function (sm) {
        var btns = this.toolBar;
        var items = Ext.ComponentQuery.query('button', btns);
        if (sm < 1) {
            items[1].setDisabled(true);
            items[2].setDisabled(true);
            items[3].setDisabled(true);
        } else {
            items[1].setDisabled(false);
            items[2].setDisabled(false);
            items[3].setDisabled(false);
            var status = this.gridPanel.getSelectionModel().getSelection()[0].get('status');
            if (status == "1") {
                items[3].setDisabled(true);
            }
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});