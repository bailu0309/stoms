Ext.define('build.institution.MedicalInstitutionAuditPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    callBack: null,
    auditType: 1,//1市级审核 2省级审核
    requires: [],
    initComponent: function () {
        this.initData();
        Ext.apply(this, {
            layout: 'border',
            items: [this.viewPanel]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
        if (this.type == 0) {
            this.loadData('', name)
        }
        this.setType();
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
        me.viewPanel = new Ext.Panel({
            layout: 'border',
            autoHeight: true,
            region: 'center',
            split: true,
            items: [me.formPanel]

        });
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AccountController/queryMedicalInstitutionById.sdo',
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
    initBigPartsInfo: function () {
        var me = this;

        me.passBtn = Ext.create('Ext.button.Button', {
            text: '通过',
            iconCls: 'pass',
            handler: function (btn) {
                me.audit(1);
            }
        });
        me.unpassBtn = Ext.create('Ext.button.Button', {
            text: '不通过',
            iconCls: 'unpass',
            handler: function (btn) {
                me.audit(2);
            }
        });

        me.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            frame: true,
            autoHeight: true,
            // autoScroll: true,
            border: false,
            layout: 'auto',
            fieldDefaults: {labelAlign: 'right', labelWidth: 90},
            buttonAlign: 'center',
            buttons: [me.passBtn, me.unpassBtn],
            items: [{
                xtype: 'fieldset',
                title: '<b style="font-size: 15px">基础信息</b>',
                layout: 'column',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.fid, me.fuid, me.name]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.orgcode]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.license]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.qccid]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.flevel]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.fgrade]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.orgtype]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.legalperson]
                }, {
                    columnWidth: .4,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.commitment, me.fileadd]
                }, {
                    columnWidth: .1,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.fileViewBtn]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.fileText]
                }]
            }, {
                xtype: 'fieldset',
                title: '<b style="font-size: 15px">联系信息</b>',
                layout: 'column',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.addresscode]
                }, {
                    columnWidth: .85,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.address]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.contacts]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.contactsphone]
                }, {
                    columnWidth: .5,
                    border: false,
                    defaults: {readOnly: true},
                    items: [me.contactsemail]
                }]
            }, {
                xtype: 'fieldset',
                title: '<b style="font-size: 15px">审核信息</b>',
                layout: 'column',
                border: true,
                defaults: {bodyStyle: 'padding:2px', border: false},
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: 1,
                    border: false,
                    items: [me.citycomment]
                }, {
                    columnWidth: 1,
                    border: false,
                    items: [me.provcomment]
                }]
            }]
        });
    },
    initToolBar: function () {
        var me = this;
    },
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true,
            labelWidth: 60,
            width: 160
        });
        me.name = Ext.create('Ext.form.field.Text', {
            fieldLabel: '医疗机构名称',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'name',
            scope: this
        });

        me.orgcode = Ext.create('Ext.form.field.Text', {
            fieldLabel: '医疗机构代码',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'orgcode',
            scope: this
        });

        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所属质控中心',
            beforeLabelTextTpl: redTpl,
            name: 'qccid',
            allowBlank: false,
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
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
        me.flevel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院级别',
            beforeLabelTextTpl: redTpl,
            name: 'flevel',
            allowBlank: false,
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            value: '3A',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['三级', '3'], ['二级', '2'], ['一级', '1']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.fgrade = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院等次',
            beforeLabelTextTpl: redTpl,
            name: 'fgrade',
            allowBlank: false,
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            value: '3A',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['甲等', '1'], ['乙等', '2'], ['丙等', '3'], ['未定', '9']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.orgtype = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '机构类型',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'orgtype',
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            value: '1',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['综合医院', '1'], ['专科医院', '2'], ['中医院', '3']
                ]
            }),
            queryMode: 'local',
            // store: this.xqStore,
            // queryMode: 'remote',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.legalperson = Ext.create('Ext.form.field.Text', {
            fieldLabel: '法人代表',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'legalperson',
            scope: this
        });
        me.license = Ext.create('Ext.form.field.Text', {
            fieldLabel: '执业许可证',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'license',
            scope: this
        });
        me.fileViewBtn = {
            text: '预览',
            width: 50,
            disabled: false,
            enableKeyEvents: true,
            scope: this,
            xtype: 'button',
            listeners: {
                'click': function () {
                    previewFile(me.fileadd.getValue(), '');
                }
            }
        };
        me.address = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '机构地址',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'address'
        });
        me.addresscode = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构地址编码',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'addresscode'
        });
        me.commitment = Ext.create('Ext.form.field.Text', {
            fieldLabel: '承诺书', //初步由机构编码和时间戳生成
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'commitment'
        });
        me.fileadd = Ext.create('Ext.form.field.Text', {
            hidden: true,
            name: 'fileadd'
        });
        me.fuid = Ext.create('Ext.form.field.Text', {
            hidden: true,
            name: 'fuid'
        });
        me.contacts = Ext.create('Ext.form.field.Text', {
            fieldLabel: '联系人',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'contacts'
        });
        me.contactsphone = Ext.create('Ext.form.field.Text', {
            fieldLabel: '联系电话',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'contactsphone'
        });
        me.contactsemail = Ext.create('Ext.form.field.Text', {
            fieldLabel: '邮箱',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            name: 'contactsemail'
        });
        me.citycomment = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '市级质控审核意见',
            labelWidth: 130,
            width: '95%',
            name: 'citycomment'
        });
        me.provcomment = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '省级质控审核意见',
            labelWidth: 130,
            width: '95%',
            name: 'provcomment'
        });
    },
    loadData: function (fid, name) {
        var me = this;
        this.store.load({
            params: {"fid": fid, fuid: name},
            callback: function (records) {
                var data = records[0].data;
                if (data['qccid'] == '10001') {
                    me.citycomment.setHidden(true);
                } else {
                    me.citycomment.setHidden(false);
                }
                var r = Ext.create('Model', data);
                me.formPanel.getForm().loadRecord(r);
            }
        });
    },
    save: function () {
        var me = this;
    },
    audit: function (zt) {
        var me = this;

        if (me.formPanel.getForm().isValid()) {
            var params = me.formPanel.getForm().getValues();

            params['audittype'] = me.auditType;
            if (me.auditType == 1) {
                //通过
                if (zt == 1) {
                    params['auditprogress'] = '11'; //市级过
                } else {
                    params['auditprogress'] = '12';//市级不过
                }
                params['citystate'] = zt;
            } else {
                //通过
                if (zt == 1) {
                    params['auditprogress'] = '21';//省级过
                } else {
                    params['auditprogress'] = '22';//省级不过
                }
                params['provstate'] = zt;
            }

            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/AccountController/audit.sdo',
                params: params,
                waitTitle: '请稍等片刻',
                waitMsg: '正在提交...',
                scope: this,
                success: function (resp) {
                    var obj = Ext.util.JSON.decode(resp.responseText);
                    if (obj.success == true) {
                        if (me.callBack) {
                            me.callBack();
                        }
                        App.getApplication().msg('提示', '审核成功');
                    } else {
                        Ext.Msg.alert("提示", "错误信息:" + obj.info);
                    }
                },
                failure: function (response, opts) {
                    this.exception();
                }
            });
        } else {
            App.getApplication().msg('提示', '请录入红色*的必填数据', 2000);
        }
    },
    setType: function () {
        var me = this;
        //市级审核
        if (me.auditType == 1) {
            me.provcomment.setReadOnly(true);//省意见只读

            me.citycomment.allowBlank = false;//市意见不可为空
            me.citycomment.setFieldLabel(redTpl + '市级质控审核意见');//市意见
        }
        if (me.auditType == 2) {
            me.citycomment.setReadOnly(true); //市意见只读

            me.provcomment.allowBlank = false;
            me.provcomment.setFieldLabel(redTpl + '省级质控审核意见');
        }
    },
    hideBtn: function () {
        var me = this;
        me.passBtn.setHidden(true);
        me.unpassBtn.setHidden(true);
    },
    showBtn: function () {
        var me = this;
        me.passBtn.setHidden(false);
        me.unpassBtn.setHidden(false);
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});