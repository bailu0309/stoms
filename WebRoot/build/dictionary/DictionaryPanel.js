Ext.define('build.dictionary.DictionaryPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    xtype: 'cell-editing',
    dateFormat: function (value) {
        if (!Ext.isEmpty(value)) {
            return Ext.Date.format(new Date(value), 'Y-m-d');
        } else {
            return null;
        }
    },
    initComponent: function () {
        Ext.tip.QuickTipManager.init();
        var me = this;
        me.fcodes = "";
        this.initStore();
        this.initColumn();
        this.initMyItems();
        me.ftypes;

        /**
         * 树形结构
         */
        this.TreePanel = Ext.create('Ext.tree.Panel', {
            collapsible: true,
            region: 'center',
            autoWidth: true,
            displayField: 'text',
            valueField: 'code',
            // autoScroll: false,
            columnLines: true,
            plain: true,
            header: false,
            border: false,
            closable: false,
            draggable: false,
            frame: false,
            resizable: false,
            split: true,
            scope: this,
            dockedItems: [this.toolBar],
            listeners: {
                itemdblclick: function (selModel, selections) {
                    if (selections) {
                        var rec = selections;
                        me.dicTypeWindow.setTitle('修改');
                        me.pid.setValue(rec.data.fid);
                        me.pcode.setValue(rec.data.code);
                        me.ptext.setValue(rec.data.text);
                        me.status.setValue(rec.data.status);
                        me.dicTypeWindow.show();
                    }
                },
                itemclick: function (selModel, selections) {
                    if (selections) {
                        var rec = selections;
                        var ids = (rec.data.code).split(',');
                        me.searchAll(ids[0]);
                        me.ftypes = ids[0];
                    }
                }
            },
            reserveScrollbar: true,
            viewConfig: {stripeRows: true, forceFit: true},
            store: this.fileTypeTreeStore,
        });


        this.DictionaryItemPanel = Ext.create('Ext.grid.Panel', {
            collapsible: true,
            region: 'east',
            width: 1000,
            columnLines: true,
            plain: true,
            header: false,
            border: false,
            closable: false,
            draggable: false,
            frame: false,
            resizable: false,
            split: true,
            scope: this,
            dockedItems: [this.toolBar1],
            selModel: new Ext.selection.CheckboxModel({
                allowDeselect: true,
            }),
            listeners: {
                itemdblclick: function (selModel, selections) {
                    if (selections) {
                        var rec = selections;
                        me.dicWindow.setTitle('修改');
                        me.fid.setValue(rec.data.fid);
                        me.typeid.setValue(rec.data.typeid);
                        me.code.setValue(rec.data.code);
                        me.text.setValue(rec.data.text);
                        me.sort.setValue(rec.data.sort);
                        me.dicWindow.show();
                    }
                },
                itemclick: function (selModel, selections) {
                    if (selections) {
                        var rec = selections;
                        me.fid.setValue(rec.data.fid);
                    }
                }
            },
            reserveScrollbar: true,
            viewConfig: {
                stripeRows: true,
                forceFit: true
            },
            store: this.dicStore,
            columns: this.diccolumns,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: this.dicStore,
                displayInfo: true,
                displayMsg: '<div align="left">共{2}条, 显示{0} - {1}条 </div>',
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        this.dicPanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            layout: 'form',
            height: 260,
            width: 480,
            bbar: ['->', this.addDic, '-', this.cancelDic, '->'],
            autoScoll: true,
            fieldDefaults: {
                labelSeparator: '',
                labelAlign: 'right',
                labelWidth: 60,
                width: 160
            },
            items: [{
                columnWidth: 1,
                layout: 'column',
                border: false,
                items: [{
                    border: false,
                    columnWidth: 1,
                    items: [{
                        xtype: 'fieldset',
                        border: false,
                        collapsible: false,
                        layout: 'column',
                        columnWidth: 1,
                        items: [{
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                hidden: true,
                                border: false,
                                items: [this.fid]
                            }, {
                                hidden: true,
                                border: false,
                                items: [this.typeid]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.9,
                                border: false,
                                items: [this.text]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.9,
                                border: false,
                                items: [this.code]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.9,
                                border: false,
                                items: [this.sort]
                            }]
                        }]
                    }]
                }]
            }]
        });

        this.dicTypePanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            layout: 'form',
            height: 260,
            width: 480,
            bbar: ['->', this.addDicType, '-', this.cancelDicType, '->'],
            autoScoll: true,
            fieldDefaults: {
                labelSeparator: '',
                labelAlign: 'right',
                labelWidth: 60,
                width: 160
            },
            items: [{
                columnWidth: 1,
                layout: 'column',
                border: false,
                items: [{
                    border: false,
                    columnWidth: 1,
                    items: [{
                        xtype: 'fieldset',
                        border: false,
                        collapsible: false,
                        layout: 'column',
                        columnWidth: 1,
                        items: [{
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                hidden: true,
                                border: false,
                                items: [this.pid]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.9,
                                border: false,
                                items: [this.ptext]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.9,
                                border: false,
                                items: [this.pcode]
                            }]
                        }, {
                            columnWidth: 1,
                            layout: 'column',
                            border: false,
                            items: [{
                                columnWidth: 0.86,
                                border: false,
                                items: [this.status]
                            }]
                        }]
                    }]
                }]
            }]
        });

        me.dicTypeWindow = Ext.create('Ext.window.Window', {
            width: 480,
            height: 295,
            layout: 'border',
            closeAction: 'hide',
            // title: '',
            modal: true,
            frame: true,
            // autoScroll:true,
            buttonAlign: 'center',
            items: [me.dicTypePanel],
            listeners: {
                'hide': function () {
                    me.searchType();
                }
            }
        });

        me.dicWindow = Ext.create('Ext.window.Window', {
            width: 480,
            height: 295,
            layout: 'border',
            closeAction: 'hide',
            // title: '',
            modal: true,
            frame: true,
            // autoScroll:true,
            buttonAlign: 'center',
            items: [me.dicPanel],
            listeners: {
                'hide': function () {
                    me.searchAll(me.ftypes);
                }
            }
        });

        Ext.apply(this, {
            layout: 'border',
            defaults: {split: true}, //是否有分割线
            items: [this.TreePanel, this.DictionaryItemPanel]
        });
        this.callParent();
    },

    initMyItems: function () {
        var me = this;
        //字典类型字段
        this.pid = Ext.create('Ext.form.field.Text', {
            hidden: true,
            readOnly: true,
            fieldLabel: '主键：',
            labelWidth: 80,
            width: 370
        });

        this.pcode = Ext.create('Ext.form.field.Text', {
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            fieldLabel: '编码：',
            labelWidth: 80,
            width: 370
        });

        this.ptext = Ext.create('Ext.form.field.Text', {
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            fieldLabel: '字典值：',
            labelWidth: 80,
            width: 370
        });

        this.status = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '状态',
            allowBlank: false,
            beforeLabelTextTpl: redTpl,
//	            triggerWrapCls:'',
            editable: false,
            name: 'status',
            labelWidth: 80,
            labelAlign: 'right',
            width: '100%',
            displayField: 'name',
            valueField: 'value',
            blankText: "请选择",
            mode: 'local',
            listWidth: 120,
            triggerAction: 'all',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [['启用', '1'],
                    ['禁用', '0']
                ]
            }),
            listeners: {
                blur: function (a) {
                }
            }
        });


        //字典项字段
        this.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true,
            readOnly: true,
            fieldLabel: '主键：',
            labelWidth: 80,
            width: 370
        });

        this.typeid = Ext.create('Ext.form.field.Text', {
            name: 'typeid',
            hidden: true,
            readOnly: true,
            fieldLabel: '关联编码：',
            labelWidth: 80,
            width: 370
        });

        this.code = Ext.create('Ext.form.field.Number', {
            name: 'code',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            fieldLabel: '编码：',
            labelWidth: 80,
            width: 370
        });

        this.text = Ext.create('Ext.form.field.Text', {
            name: 'text',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            fieldLabel: '字典值：',
            labelWidth: 80,
            width: 370
        });


        this.sort = Ext.create('Ext.form.field.Number', {
            name: 'sort',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            fieldLabel: '排序：',
            labelWidth: 80,
            width: 370
        });


        this.qtext = Ext.create('Ext.form.field.Text', {
            fieldLabel: '',
            labelWidth: 0,
            width: 100
        });


        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.dicTypePanel.reset();
                    me.dicTypeWindow.show();
                }
            }, '-', {
                text: '',
                iconCls: 'delete',
                scope: this,
                handler: function () {
                    var sm = me.TreePanel.getSelectionModel().getSelection()[0];
                    var ids = (sm.data.id).split(',');
                    if (sm) {
                        Ext.MessageBox.confirm('提示', '确定删除<' + " " + sm.data.name + '>？', function (btn) {
                            if (btn != 'yes') {
                                return;
                            }
                            Ext.Ajax.request({
                                method: 'post',
                                url: globalCtx + '/DictionaryController/deleteDictionaryType.sdo',
                                params: {fid: ids[1]},
                                waitTitle: '请稍等片刻',
                                waitMsg: '正在删除...',
                                scope: this,
                                success: function (resp) {
                                    var obj = Ext.util.JSON.decode(resp.responseText);
                                    if (obj.success == true) {
                                        me.searchType();
                                        App.getApplication().msg('提示', '删除成功！');
                                    } else {
                                        Ext.Msg.alert("提示：删除失败！", obj.info);
                                    }
                                },
                                failure: function (response, opts) {
                                    this.exception();
                                }
                            });
                        });

                    }
                }
            }, '-', this.qtext, {
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: function () {

                    me.searchType();
                }
            }]
        });

        //字典项按钮
        this.addDic = Ext.create('Ext.button.Button', {
            text: '保存',
            iconCls: 'confirm',
            handler: function () {
                me.saveDic();
            }
        });

        this.cancelDic = Ext.create('Ext.button.Button', {
            text: '重置',
            iconCls: 'delete',
            handler: function () {
                me.qingkong();
            }
        });

        //字典类型按钮
        this.addDicType = Ext.create('Ext.button.Button', {
            text: '保存',
            iconCls: 'confirm',
            handler: function () {
                me.saveDicType();
            }
        });

        this.cancelDicType = Ext.create('Ext.button.Button', {
            text: '重置',
            iconCls: 'delete',
            handler: function () {
                me.qingkongType();
            }
        });


        this.toolBar1 = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.dicWindow.setTitle('新建');
                    me.dicPanel.reset();
                    me.typeid.setValue(me.ftypes);
                    me.dicWindow.show();
                }
            }, '-', {
                text: '',
                iconCls: 'delete',
                scope: this,
                handler: function () {
                    var sm = me.DictionaryItemPanel.getSelectionModel().getSelection()[0];
                    if (sm) {
                        Ext.MessageBox.confirm('提示', '确定删除<' + " " + sm.data.text + '>？', function (btn) {
                            if (btn != 'yes') {
                                return;
                            }
                            Ext.Ajax.request({
                                method: 'post',
                                url: globalCtx + '/DictionaryController/deleteDictionaryItem.sdo',
                                params: {fid: sm.data.fid},
                                waitTitle: '请稍等片刻',
                                waitMsg: '正在删除...',
                                scope: this,
                                success: function (resp) {
                                    var obj = Ext.util.JSON.decode(resp.responseText);
                                    me.searchAll(me.ftypes);
                                    if (obj.success == true) {
                                        App.getApplication().msg('提示', '删除成功！');
                                    } else {
                                        Ext.Msg.alert("提示：删除失败！", obj.info);
                                    }
                                },
                                failure: function (response, opts) {
                                    this.exception();
                                }
                            });
                        });

                    }
                }
            }]
        });


    },
    initStore: function () {
        Ext.define('TreePanelEty', {
            extend: 'Ext.data.Model',
            idProperty: 'id'
        });
        this.dicStore = Ext.create('Ext.data.JsonStore', {
            model: 'TreePanelEty',
            // sorters: 'id',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/DictionaryController/queryDictionaryItem.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.fileTypeTreeStore = Ext.create('Ext.data.TreeStore', {
            model: 'Model',
            // fields: ['name', 'id'],
            root: {
                name: '字典菜单',
                expanded: true
            },
            proxy: {
                type: 'ajax',
                url: globalCtx + '/DictionaryController/queryDictionaryType.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

    },
    initColumn: function () {
        this.diccolumns = [{
            text: '字典项值',
            width: 200,
            dataIndex: 'text'
        }, {
            text: '字典项编码',
            width: 200,
            dataIndex: 'code'
        }, {
            text: '字典项排序',
            width: 200,
            dataIndex: 'sort'
        }
        ];
    },

    initEvents: function () {
    },
    initMethod: function () {
    },
    resetAll: function () {
        var me = this;
        // me.fcode.reset();
        me.fid.reset();
        // me.fpid.reset();
        me.fdesc.reset();
        // me.forder.reset();
    },

    searchAll: function (data) {
        var me = this;

        var params = {
            typeid: data
        };
        Ext.apply(me.dicStore.proxy.extraParams, params);
        me.dicStore.load({
            params: {}
        });
    },
    searchType: function () {
        var me = this;

        var params = {text: me.qtext.getValue()};
        Ext.apply(me.fileTypeTreeStore.proxy.extraParams, params);
        me.fileTypeTreeStore.load();
    },

    saveDic: function () {
        var me = this;

        var baseParams = me.dicPanel.getForm().getValues();
        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/DictionaryController/saveDictionaryItem.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: baseParams,
            scope: this,
            success: function (resp) {
                var obj = Ext.util.JSON.decode(resp.responseText);
                if (obj.success == true) {
                    me.dicWindow.hide();
                    me.searchAll(me.ftypes);
                    App.getApplication().msg('提示', '保存成功！');
                } else {
                    Ext.Msg.alert('提示：保存失败!', obj.info);
                }
            },
            failure: function (response, opts) {
                App.getApplication().msg('出错', '上报出错！', 2000);
            }
        });
    },
    saveDicType: function () {
        var me = this;

        var baseParams = {
            fid: me.pid.getValue(),
            code: me.pcode.getValue(),
            text: me.ptext.getValue(),
            status: me.status.getValue()
        };
        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/DictionaryController/saveDictionaryType.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: baseParams,
            scope: this,
            success: function (resp) {
                var obj = Ext.util.JSON.decode(resp.responseText);
                if (obj.success == true) {
                    me.dicTypeWindow.hide();
                    me.searchType();
                    App.getApplication().msg('提示', '保存成功！');
                } else {
                    Ext.Msg.alert('提示：保存失败!', obj.info);
                }
            },
            failure: function (response, opts) {
                App.getApplication().msg('出错', '上报出错！', 2000);
            }
        });
    },

    qingkongType: function () {
        var me = this;
        me.code.reset();
        me.text.reset();
        me.sort.reset();
    },

    qingkong: function () {
        var me = this;
        me.code.reset();
        me.text.reset();
        me.sort.reset();
    },

    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});