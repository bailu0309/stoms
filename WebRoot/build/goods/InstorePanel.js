Ext.define('build.goods.InstorePanel', {
    extend: 'Ext.panel.Panel',
    callBack: null,
    width: 600,
    initComponent: function () {
        this.initData();
        Ext.apply(this, {
            layout: 'border',
            border: true,
            items: [this.viewPanel]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
    },
    onDestroy: function () {
        this.callParent();
    },
    initData: function () {
        var me = this;
        me.initToolBar();
        me.initStore();
        me.initPartsInfo();
        me.initBigPartsInfo();
    },
    initBigPartsInfo: function () {
        var me = this;

        me.formPanel = Ext.create('Ext.form.Panel', {
            width: me.width - 10,
            layout: 'column',
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 70, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.name, me.code]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 70, labelAlign: 'right', width: '95%'},
                items: [me.iid, me.iname, me.sid, me.sname, me.scode]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 70, labelAlign: 'right', width: '95%'},
                items: [me.intime]
            }]
        });

        me.saveBtn = Ext.create('Ext.button.Button', {
            text: '保存',
            iconCls: 'savewhite',
            scope: this,
            handler: me.save
        });


        me.viewPanel = new Ext.Panel({
            border: true,
            region: 'center',
            buttonAlign: 'center',
            buttons: [me.saveBtn],
            autoScroll: true,
            items: [me.formPanel]
        });

    },
    initToolBar: function () {
        var me = this;
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AdverBaseController/queryAdverBaseById.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.userStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/queryUsers.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        })
    },
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'id',
            hidden: true
        });


        me.iid = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '入库人',
            name: 'iid',
            store: this.userStore,
            queryMode: 'local',
            editable: true,
            anyMatch: true,
            displayField: 'username',
            valueField: 'name',
            value: name,
            listeners: {
                select: function (combo, record, index) {
                    me.iname.setValue(record.get('username'));
                }
            }
        });
        me.iname = Ext.create('Ext.form.field.Text', {
            name: 'iname',
            value: userName,
            hidden: true
        });
        me.sid = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '供应商',
            name: 'sid',
            store: this.supplierStore,
            queryMode: 'local',
            editable: true,
            anyMatch: true,
            displayField: 'name',
            valueField: 'id',
            value: name,
            listeners: {
                select: function (combo, record, index) {
                    me.sname.setValue(record.get('name'));
                    me.scode.setValue(record.get('code'));
                }
            }
        });
        me.sname = Ext.create('Ext.form.field.Text', {
            name: 'sname',
            hidden: true
        });

        me.scode = Ext.create('Ext.form.field.Text', {
            name: 'scode',
            hidden: true
        });

        me.name = Ext.create('Ext.form.field.Text', {
            fieldLabel: '入库名称',
            name: 'name'
        });
        me.code = Ext.create('Ext.form.field.Text', {
            fieldLabel: '入库编码',
            name: 'code'
        });
        me.intime = Ext.create('build.ux.DateTimeField', {
            value: new Date(),
            name: 'intime',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '入库时间',
            listeners: {
                select: function (dateField, date) {
                }
            }
        });

    },
    loadData: function (id, type) {
        var me = this;
        me.formPanel.reset();
        me.store.load({
            params: {"fid": id, type: type},
            callback: function (records) {

                var data = records[0].data;

                var r = Ext.create('Model', data);
                me.formPanel.getForm().loadRecord(r);

                if (data['fst'] == 1 || roleId != '100046') {
                    me.setHideBtn();
                } else {
                    me.setShowBtn();
                }

            }
        });
        me.formPanel.isValid();
    },
    loadModelData: function (r) {
        var me = this;
        me.formPanel.getForm().loadRecord(r);
        me.formPanel.isValid();

    },
    save: function () {
        var me = this;
        if (me.formPanel.isValid()) {
            Ext.MessageBox.confirm('提示', '确认保存？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                me.formPanel.getForm().submit({
                    url: globalCtx + '/GoodsController/saveRecieveInfo.sdo',
                    method: 'POST',
                    submitEmptyText: false,
                    waitMsg: '正在保存,请稍候...',
                    timeout: 60000,
                    params: {},
                    success: function (response, options) {
                        var obj = Ext.util.JSON.decode(options.response.responseText);
                        if (obj.success == true) {
                            if (me.callBack) {
                                me.callBack();
                            }
                            me.formPanel.getForm().reset();
                            App.getApplication().msg('提示', '保存成功！', 2000);
                        } else {
                            me.saveBtn.setDisabled(false);
                        }
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('温馨提示', "保存错误！");
                        me.saveBtn.setDisabled(false);
                    }
                });
            });
        } else {
            App.getApplication().msg('提示', '红色星号为必填项，请填写完整数据后保存！', 2000);
        }
    },
    upload: function () {
        var me = this;
        if (Ext.isEmpty(me.fid.getValue())) {
            Ext.Msg.alert("提示", "数据还未保存，无法上报！");
            return;
        }
        Ext.MessageBox.confirm('提示', '上报后将无法修改，确认上报？', function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/AdverBaseController/upLoadAdverBase.sdo',
                params: {
                    fid: me.baseinfo.fid.getValue()
                },
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        App.getApplication().msg('提示', '上报成功！', 2000);
                        me.upBtn.setDisabled(true);
                        me.saveBtn.setDisabled(true);
                        if (me.callBack) {
                            me.callBack();
                        }
                    } else {
                        me.upBtn.setDisabled(false)
                    }
                },
                failure: function (response, opts) {
                    this.exception();
                }
            })
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});