//打开跳转-v=d.id v1=d.icon v2=d.menuName
function showMain(v, v1, v2, v3) {
    if (qufg == "fgxlcd" || qufg == undefined) {
        if (App.getApplication().topPanel.hidden) {
            //App.getApplication().topPanel.show();
            Ext.getCmp("qpczxsyc").setText('全屏操作');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen');
        } else {
            App.getApplication().topPanel.hide();
            Ext.getCmp("qpczxsyc").setText('退出全屏');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen_exit');
        }

    } else {
        if (!App.getApplication().nv.collapsed) {
            App.getApplication().collapse();
            Ext.getCmp("qpczxsyc").setText('退出全屏');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen_exit');
        }
    }
    var tabItem = mainTab.getComponent(v1);
    if (tabItem) {
        mainTab.setActiveTab(tabItem);
    } else {
        if (v != undefined && v != "") {
            Ext.getBody().mask('正在加载[' + v3 + ']模块信息...');
            var p = Ext.create('Ext.panel.Panel', {
                id: v1,
                icon: v2,
                title: v3,
                closable: true,
                closeAction: 'hide',
                border: false,
                layout: 'fit',
                items: [],
                listeners: {
                    'beforeclose': function () {
                        //防止硬关闭
                        Ext.getCmp(mainId).remove(p, false);
                        return false;
                    }
                }
            });
            var a = Ext.getCmp(mainId).add(p);
            Ext.require(v, function () {
                var s = Ext.create(v);
                p.add(s);
                p.updateLayout();
                Ext.getBody().unmask();
            }, this);
            mainTab.setActiveTab(a);
            mainTab.show();
        }
    }
}

//打开跳转-v=d.id v1=d.icon v2=d.menuName
function showPanel(v, v1, v2, v3) {
    if (qufg == "fgxlcd" || qufg == undefined) {
        if (App.getApplication().topPanel.hidden) {
            //App.getApplication().topPanel.show();
            Ext.getCmp("qpczxsyc").setText('全屏操作');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen');
        } else {
            App.getApplication().topPanel.hide();
            Ext.getCmp("qpczxsyc").setText('退出全屏');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen_exit');
        }
    } else {
        if (!App.getApplication().nv.collapsed) {
            App.getApplication().collapse();
            Ext.getCmp("qpczxsyc").setText('退出全屏');
            Ext.getCmp("qpczxsyc").setIconCls('fullscreen_exit');
        }
    }
    var tabItem = mainTab.getComponent(v1);
    if (tabItem) {
        mainTab.setActiveTab(tabItem);
    } else {
        if (v != undefined && v != "") {
            Ext.getBody().mask('正在加载[' + v3 + ']模块信息...');
            var p = Ext.create('Ext.panel.Panel', {
                id: v1,
                icon: v2,
                title: v3,
                closable: true,
                border: false,
                layout: 'fit',
                items: []
            });
            var a = Ext.getCmp(mainId).add(p);
            //Ext.require(v, function () {
            //    var s = Ext.create(v);
            //    p.add(s);
            //    p.updateLayout();
            //    Ext.getBody().unmask();
            //
            //}, this);
            p.add(v);
            p.updateLayout();
            Ext.getBody().unmask();
            mainTab.setActiveTab(a);
            mainTab.show();

        }
    }
}

//修改密码
function xgmm() {
    Ext.define('userEty', {
        extend: 'Ext.data.Model',
        idProperty: 'id'
    });
    this.userPanel = Ext.create('Ext.form.Panel', {
        frame: true,
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
            columnWidth: .5,
            items: [{
                xtype: 'hidden', id: 'id', name: 'id'
            }, {
                fieldLabel: '用户名',
                id: 'name',
                name: 'name',
                value: name,
                afterLabelTextTpl: this.redTpl,
                allowBlank: false,
                readOnly: true
            }, {
                fieldLabel: '原密码',
                inputType: 'password',
                id: 'oldPassword',
                name: 'oldPassword',
                afterLabelTextTpl: this.redTpl,
                allowBlank: false
            }, {
                fieldLabel: '新密码',
                inputType: 'password',
                id: 'newPassword',
                afterLabelTextTpl: this.redTpl,
                name: 'newPassword',
                allowBlank: false
            }
            ]
        }]
    });
    this.userWindow = Ext.create('Ext.window.Window', {
        autoHeight: true,
        autoWidth: true,
        title: '修改用户',
        bodyPadding: 5,
        modal: true,
        closable: true,
        frame: true,
        items: [this.userPanel],
        buttonAlign: 'center',
        buttons: [{
            id: 'OK',
            text: '确定',
            scope: this,
            iconCls: 'confirm',
            handler: function () {
                var form = this.userPanel.getForm();
                var id = form.findField('id').getValue();
                var name = form.findField('name').getValue();
                var oldPassword = form.findField('oldPassword').getValue();
                var newPassword = form.findField('newPassword').getValue();
                if (newPassword != oldPassword) {
                    if (form.isValid()) {
                        Ext.Ajax.request({
                            method: 'post',
                            url: globalCtx + '/basic/UserController/edit.sdo',
                            params: {name: name, password: newPassword},
                            waitTitle: '请稍等片刻',
                            waitMsg: '正在提交...',
                            scope: this,
                            success: function (resp) {
                                var obj = Ext.util.JSON.decode(resp.responseText);
                                if (obj.result == 'success') {
                                    //var msg = '修改';
                                    App.getApplication().msg('提示', '用户密码成功');
                                    this.userPanel.reset();
                                    this.userWindow.close();
                                    Ext.Ajax.request({
                                        url: globalCtx + '/basic/LoginController/logout.sdo',
                                        scope: this,
                                        success: function (response) {
                                            window.location.href = 'login.jsp';
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert("提示", "错误信息:" + obj.info);
                                }
                            },
                            failure: function (response, opts) {
                                this.exception();
                            }
                        });
                    }
                } else if (newPassword == "" || oldPassword == "") {
                    Ext.MessageBox.alert("提示", "请输入新旧密码");
                } else {
                    Ext.MessageBox.alert("提示", "新旧密码相同");
                }
            }
        }/*, {
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
        }*/]
    });
    this.userWindow.show();
}


function loadData() {

    Ext.Ajax.request({
        method: 'post',
        async: false,
        url: globalCtx + '/DictionaryController/queryDict.sdo',
        waitTitle: '请稍等片刻',
        waitMsg: '正在提交...',
        scope: this,
        success: function (resp) {
            var obj = Ext.util.JSON.decode(resp.responseText);
            DICTIONARY = obj.invdata[0];
            DICT_COMBO = new Object();
            DICT_QUERY = new Object();
            for (var x in DICTIONARY) {
                // DICT_COMBO[x] = DICTIONARY[x];
                var obj = new Array();
                var qbj = new Array();
                DICT_COMBO[x] = new Array();

                var i = 0;
                var j = 1;
                qbj[0] = new Array('全部', '');
                for (var v in DICTIONARY[x]) {
                    var ar = new Array(DICTIONARY[x][v], v);
                    obj[i] = ar;
                    qbj[j] = ar;
                    i++;
                    j++;
                    // DICT_COMBO[x].push([DICTIONARY[x][v], v]);
                }
                DICT_COMBO[x] = obj;
                DICT_QUERY[x] = qbj;

            }


        },
        failure: function (response, opts) {
            this.exception();
        }
    });
}

function newline(option, number, axis){
    /* 此处注意你的json是数组还是对象 */
    option[axis][0]['axisLabel']={
        interval: 0,
        formatter: function(params){
            var newParamsName = "";
            var paramsNameNumber = params.length;
            var provideNumber = number;
            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
            if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                    } else {
                        tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                }
            } else {
                newParamsName = params;
            }
            return newParamsName
        }
    };
    return option;
}