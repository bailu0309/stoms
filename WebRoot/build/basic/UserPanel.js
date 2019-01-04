/*
 * 系统管理 - 用户管理
 * */
Ext.define('build.basic.UserPanel', {
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
        me.fst = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '状态',
            labelWidth: 40,
            name: 'frevoke',
            width: 170,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            mode: 'local',
            triggerAction: 'all',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [['全部', ''], ['可用', '1'], ['不可用', '0']]
            })
        });
        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: '新建',
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.userWindow.setTitle('新建用户');
                    me.userWindow.show();
                }
            }, '-', {
                text: '修改',
                scope: this,
                iconCls: 'edit',
                handler: this.editUser
            }, {
                text: '删除',
                iconCls: 'delete',
                scope: this,
                handler: this.deleteUser
            }, {
                text: '配置角色',
                scope: this,
                iconCls: 'show',
                handler: function () {
                    this.roleWin.show();
                    var r = this.gridPanel.getSelectionModel().getSelection()[0];
                    this.roleWin.setValue(r.get('roleids'));
                }
            }, {
                xtype: 'button',
                text: '初始用户',
                iconCls: 'add2',
                scope: this,
                handler: this.initAccount
            }, '-', {
                xtype: 'textfield',
                fieldLabel: '关键字',
                labelAlign: 'right',
                labelWidth: 60,
                name: 'name',
                listeners: {}
            }, me.fst, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.searchUser
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            forceFit: true,
            reserveScrollbar: true,
            selModel: new Ext.selection.CheckboxModel({mode: 'SINGLE', allowDeselect: true}),//单选可反选
            viewConfig: {stripeRows: true},
            store: this.userStore,
            columns: this.columns,
            tbar: this.toolBar,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: this.userStore,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        this.addUserKey = {
            scope: this, specialkey: function (f, e) {
                if (e.getKey() == e.ENTER) {
                    // this.newUser();
                }
            }
        };
        //用户 新建 修改 查看 Panel
        this.userPanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            layout: 'column',
            defaults: {
                xtype: 'panel',
                layout: 'form',
                border: false,
                defaults: {margin: 2, anchor: '100%', xtype: 'textfield', listeners: this.addUserKey}
            },
            fieldDefaults: {labelAlign: 'right', labelWidth: 90},
            items: [{
                xtype: 'fieldset',
                title: '账号信息',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [{
                    xtype: 'hidden', name: 'id'
                }, {
                    fieldLabel: '用户名',
                    name: 'name',
                    afterLabelTextTpl: this.redTpl,
                    allowBlank: false,
                    listeners: {
                        blur: function (v, v1, v2) {
                            me.checkNameRepeat();
                        }
                    }
                }, {
                    fieldLabel: '密码',
                    inputType: 'password',
                    afterLabelTextTpl: this.redTpl,
                    name: 'password',
                    allowBlank: false
                }, {
                    fieldLabel: '姓名',
                    name: 'username'
                }, {
                    fieldLabel: '状态',
                    name: 'status',
                    afterLabelTextTpl: this.redTpl,
                    allowBlank: false,
                    store: this.statusStore,
                    queryMode: 'local',
                    value: "1",
                    editable: false,
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'id',
                    listeners: {}
                }]
            }]
        });
        this.userWindow = Ext.create('Ext.window.Window', {
            autoHeight: true,
            width: 400,
            title: '新建用户',
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [this.userPanel],
            buttonAlign: 'center',
            buttons: [{
                text: '确定',
                scope: this,
                iconCls: 'confirm',
                handler: this.newUser
            }, {
                text: '取消',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    this.userPanel.items.each(function (c) {
                        c.setDisabled(false)
                    });
                    this.userPanel.reset();
                    this.userWindow.close();
                }
            }]
        });
        //配置角色 window
        this.roleWin = Ext.create('build.util.selector.RoleSelectorWindow', {parentPanel: this});
        Ext.apply(this, {
            layout: 'border',
            items: [this.gridPanel]
        });
        this.callParent();
    },

    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
        this.gridPanel.on('celldblclick', this.editUser, this);
        this.gridPanel.getSelectionModel().on('selectionchange', function (sm) {
            this.setBtn(sm.getCount())
        }, this);
    },
    initMethod: function () {
        this.gridPanelLoadData();
        this.setBtn(0);
    },
    initStore: function () {
        this.statusStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
                {"id": "1", "name": "可用"},
                {"id": "0", "name": "不可用"}
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
            sorters: 'id',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/list.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var statusRenderer = function (v) {
            if (v == 1) return '<span style="color: #379337;font-weight: bold;">可用</span>';
            else if (v == 0) return '<span style="color: #c9c5dd;font-weight: bold;">不可用</span>';
        };

        this.columns = [
            {text: '用户ID', flex: 1, dataIndex: 'id'},
            {text: '用户名', flex: 2, dataIndex: 'name'},
            {text: '姓名', flex: 2, dataIndex: 'username'},
            {text: '角色', flex: 2, dataIndex: 'rolenames'},
            {text: '状态', flex: 1.2, dataIndex: 'status', renderer: statusRenderer}
        ]
    },
    newUser: function () {
        var form = this.userPanel.getForm();
        var baseParams = form.getFieldValues();
        var id = form.findField('id').getValue();
        var name = form.findField('name').getValue();
        if (form.isValid()) {
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/basic/UserController/add.sdo',
                params: baseParams,
                waitTitle: '请稍等片刻',
                waitMsg: '正在提交...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.result == 'success') {
                        var msg = id == "" ? '新建 ' : '修改';
                        App.getApplication().msg('提示', msg + '用户[ <font>' + name + '</font> ]成功');
                        this.userPanel.reset();
                        this.userWindow.close();
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                    this.gridPanelLoadData();
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        }
    },
    deleteUser: function () {
        var r = this.gridPanel.getSelectionModel().getSelection()[0];
        var s = this;
        var userStr = '删除用户[ <font color="blue" >' + r.get('name') + '</font> ]';
        Ext.MessageBox.confirm('提示', '确定' + userStr + ' ？', function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/basic/UserController/delete.sdo',
                params: {id: r.get('id')},
                waitTitle: '请稍等片刻',
                waitMsg: '正在删除...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.result == 'success') {
                        App.getApplication().msg('提示', userStr + '成功!');
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                    s.gridPanelLoadData();
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        });
    },
    initAccount: function () {
        var r = this.gridPanel.getSelectionModel().getSelection()[0];
        var s = this;
        var userStr = '同步用户[ <font color="blue" >' + r.get('name') + '</font> ]';
        Ext.MessageBox.confirm('提示', '确定' + userStr + ' ？', function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/AccountController/initMedicalInstitution.sdo',
                params: {orgcode: r.get('name')},
                waitTitle: '请稍等片刻',
                waitMsg: '正在同步...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        App.getApplication().msg('提示', userStr + '成功!');
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                    s.gridPanelLoadData();
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        });
    },
    searchUser: function () {
        var me = this;
        var value = Ext.ComponentQuery.query('textfield', this.toolBar)[0].getValue();
        var params = {username: value, status: me.fst.getValue()};
        Ext.apply(this.userStore.proxy.extraParams, params);
        this.userStore.load({params: {"start": 0, "limit": 25}});
    },
    editUser: function (p, td, cellIndex, r, tr, rowIndex, e, eOpts) {
        if (r == undefined) {
            r = this.gridPanel.getSelectionModel().getSelection()[0];
        }
        this.userWindow.setTitle('修改用户');
        this.userWindow.show();
        this.userPanel.getForm().loadRecord(r);
    },
    configureRoles: function (roleValue) {
        var r = this.gridPanel.getSelectionModel().getSelection()[0];
        var s = this;
        Ext.MessageBox.confirm('提示', "确定给[<font color=red >" + r.get('name') + "</font>]配置如下角色:</br><font color=red>" +
            this.roleWin.getNames() + "</font>?", function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/basic/UserController/setRole.sdo',
                params: {userid: r.get('id'), roleid: roleValue == "" ? "" : roleValue},
                waitTitle: '请稍等片刻',
                waitMsg: '正在提交...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.result == 'success') {
                        App.getApplication().msg('提示', '配置角色成功');
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                    s.gridPanelLoadData();
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        });

    },
    gridPanelLoadData: function () {
        this.userStore.load({params: {"start": 0, "limit": 25}});
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
            // var status = this.gridPanel.getSelectionModel().getSelection()[0].get('status');
            // if (status == "0") {
            //     items[3].setDisabled(true);
            // }
        }
    },
    checkNameRepeat: function () {
        var me = this;
        var form = this.userPanel.getForm();
        var id = form.findField('id').getValue();
        var name = form.findField('name').getValue();
        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/basic/UserController/checkNameRepeat.sdo',
            params: {id: id, name: name},
            waitTitle: '请稍等片刻',
            waitMsg: '正在提交...',
            scope: this,
            success: function (resp) {
                var obj = Ext.util.JSON.decode(resp.responseText);
                if (obj.result == 'success') {
                    App.getApplication().msg("提示", "此用户名有存在，请重新录入！");
                    form.findField('name').setValue("");
                    form.findField('name').focus("");
                }
            },
            failure: function (response, opts) {
                this.exception();
            }
        });

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});