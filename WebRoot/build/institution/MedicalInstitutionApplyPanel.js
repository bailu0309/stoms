/**
 * 机构审请
 */
Ext.define('build.institution.MedicalInstitutionApplyPanel', {
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    type: 0, //0申请  1市审核显示  2省审核显示
    requires: [],
    initComponent: function () {
        this.initData();
        Ext.apply(this, {
            layout: 'border',
            border: true,
            items: [this.viewPanel, this.auditFlowPanel]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
        if (this.type == 0) {
            this.loadData('', name);
        }
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

        me.auditState = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: blue;">审核信息</b>',
            width: 1100,
            layout: 'column',
            hidden: true,
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            collapsible: false,
            columnWidth: 1,
            items: [{
                columnWidth: .3,
                border: false,
                items: [me.citystate]
            }, {
                columnWidth: .7,
                border: false,
                items: [me.citycomment]
            }, {
                columnWidth: .3,
                border: false,
                items: [me.provstate]
            }, {
                columnWidth: .7,
                border: false,
                items: [me.provcomment]
            }]
        });
        me.saveBtn = Ext.create('Ext.button.Button', {
            text: '保存',
            iconCls: 'savewhite',
            scope: this,
            handler: me.save
        });

        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            region: 'center',
            autoHeight: true,
            autoScroll: true,
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding-top:30px',
            // layout: 'auto',
            fieldDefaults: {labelAlign: 'right', labelWidth: 90},
            buttonAlign: 'center',
            buttons: [me.saveBtn],
            items: [{
                xtype: 'fieldset',
                width: 1100,
                title: '<b style="font-size: 15px;color: blue;">基础信息</b>',
                layout: 'column',
                border: true,
                defaults: {bodyStyle: 'padding-top:10px', border: false},
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: .5,
                    border: false,
                    // bodyStyle: 'padding-top:20px',
                    items: [me.fid, me.auditprogress, me.name]
                }, {
                    columnWidth: .5,
                    border: false,
                    // bodyStyle: 'padding-top:20px',
                    items: [me.orgcode]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.license]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.qccid]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.flevel]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.fgrade]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.orgtype]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.legalperson]
                }, {
                    columnWidth: .35,
                    border: false,
                    items: [me.commitment]
                }, {
                    columnWidth: .15,
                    border: false,
                    items: [me.fileShowBtn, me.downBtn]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.fileText, me.fileadd]
                }]
            }, {
                xtype: 'fieldset',
                title: '<b style="font-size: 15px;color: blue;">地址信息</b>',
                width: 1100,
                layout: 'column',
                border: true,
                defaults: {bodyStyle: 'padding:1px', border: false},
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: .5,
                    border: false,
                    items: [me.addresscode]
                }, {
                    columnWidth: .85,
                    border: false,
                    items: [me.address]
                }, {
                    columnWidth: 0.15,
                    border: false,
                    items: [me.addressSetBtn]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.contacts]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.contactsphone]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.contactsemail]
                }]
            }, me.auditState]
        });

        me.viewPanel = new Ext.Panel({
            layout: {
                // align: 'middle',
                pack: 'center',
                type: 'hbox'
            },
            border: true,
            region: 'center',
            split: true,
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
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true,
            labelWidth: 60,
            width: 160
        });
        me.auditprogress = Ext.create('Ext.form.field.Text', {
            name: 'auditprogress',
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
            readOnly: true,
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
                    if (record.get('roleids') == '100048') {
                        me.citystate.setValue('1');
                        me.auditprogress.setValue('11'); //省待审
                    } else {
                        me.citystate.setValue('0');
                        me.auditprogress.setValue('10');//市待审
                    }
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
        me.fileText = Ext.create('Ext.form.field.File', {
            fieldLabel: '选择文件',
            buttonText: '请选择',
            labelWidth: 100,
            height: 30,
            labelAlign: 'right',
            name: 'file',
            width: '95%',
            listeners: {
                change: function (view, value, eOpts) {
                    if (!Ext.isEmpty(value)) {
                        var vs = value.split('\\');
                        var ftype = vs[vs.length - 1].split('.');
                        if (ftype[ftype.length - 1] != 'PDF' && ftype[ftype.length - 1] != 'pdf') {
                            App.getApplication().msg('提示', '请上传PDF文件！', 2000);
                            me.fileText.reset();
                            return;
                        }
                        me.commitment.setValue(vs[vs.length - 1]);
                    }
                }
            }
        });
        me.address = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '机构地址',
            beforeLabelTextTpl: redTpl,
            readOnly: true,
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
        me.fileadd = Ext.create('Ext.form.field.Text', {
            hidden: true,
            name: 'fileadd'
        });
        me.fileShowBtn = Ext.create('Ext.button.Button', {
            hidden: true,
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
        });
        me.downBtn = {
            html: '<a href="doc/加入省护理质量数据平台申请书.docx" target="_blank">下载模板</a>',
            margin: '0 0 0 10',
            xtype: 'label'
        };
        me.addressWindow = Ext.create('build.ux.AddressSelectWindow', {
            address: me.address,
            addresscode: me.addresscode
        });
        me.addressSetBtn = {
            text: '设置地址',
            width: 90,
            // hidden: (me.type != 0) ? true : false,
            disabled: false,
            enableKeyEvents: true,
            scope: this,
            xtype: 'button',
            listeners: {
                'click': function () {
                    me.addressWindow.show();
                }
            }
        };
        me.commitment = Ext.create('Ext.form.field.Text', {
            fieldLabel: '承诺书',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            readOnly: true,
            labelWidth: 100,
            width: '95%',
            name: 'commitment'
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
            regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|1\d{10})$/,
            regexText: "请输入051(6)-1234567(8)的固话号码，或者11位的手机号码",
            name: 'contactsphone'
        });
        me.contactsemail = Ext.create('Ext.form.field.Text', {
            fieldLabel: '邮箱',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            labelWidth: 100,
            width: '95%',
            vtype: 'email',
            name: 'contactsemail'
        });


        me.citystate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '市级审核状态',
            readOnly: true,
            name: 'citystate',
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['未审', '0'], ['通过', '1'], ['未过', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.provstate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '省级审核状态',
            name: 'provstate',
            readOnly: true,
            editable: false,
            labelWidth: 100,
            width: '95%',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['未审', '0'], ['通过', '1'], ['未过', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.citycomment = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '地州质控审核意见',
            readOnly: true,
            labelWidth: 120,
            width: '95%',
            name: 'citycomment'
        });
        me.provcomment = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '省级质控审核意见',
            readOnly: true,
            labelWidth: 120,
            width: '95%',
            name: 'provcomment'
        });

        me.auditFlowPanel = Ext.create('build.audit.AuditFlowShowPanel', {
            region: 'east',
            border: true,
            width: 610,
            collapsed: true,
            collapsible: true,
            listeners: {
                expand: function () {
                    me.auditFlowPanel.reload(me.fid.getValue());
                }
            }
        });

    },
    loadData: function (id, name) {
        var me = this;
        this.formPanel.reset();
        this.store.load({
            params: {"fid": id, fuid: name},
            callback: function (records) {
                var data = records[0].data;
                if (data['auditprogress'] != '0') {
                    me.fileShowBtn.setHidden(false);
                } else {
                    me.fileShowBtn.setHidden(true);
                }
                if (data['auditprogress'] != '0' && data['citystate'] != '2' && data['provstate'] != '2') {
                    me.saveBtn.setDisabled(true);
                } else {
                    me.saveBtn.setDisabled(false);
                }
                if (data['citystate'] == '0') {
                    me.auditState.setHidden(true);
                } else {
                    me.auditState.setHidden(false);
                }
                var r = Ext.create('Model', data);
                me.formPanel.getForm().loadRecord(r);
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
            if (me.qccid.getSelection().get('roleids') == '100048') {
                me.citystate.setValue('1');
                me.auditprogress.setValue('11'); //省待审
            } else {
                me.citystate.setValue('0');
                me.auditprogress.setValue('10');//市待审
            }
            me.provstate.setValue('0'); //省设置为未审核
            me.saveBtn.setDisabled(true);
            Ext.MessageBox.confirm('提示', '保存后将无法修改，确认保存？', function (btn) {
                if (btn != 'yes') {
                    me.saveBtn.setDisabled(false);
                    return;
                }
                me.formPanel.getForm().submit({
                    url: globalCtx + '/AccountController/saveMedicalInstitutionApply.sdo',
                    method: 'POST',
                    submitEmptyText: false,
                    waitMsg: '正在上传附件,请稍候...',
                    timeout: 60000,
                    params: {
                        // contacts: me.contacts.getValue()
                    },
                    success: function (response, options) {
                        var obj = Ext.util.JSON.decode(options.response.responseText);
                        if (obj.success == true) {
                            if (obj.info) {
                                me.fileadd.setValue(obj.info);
                            }
                            App.getApplication().msg('提示', '上传成功！', 2000);
                        } else {
                            me.saveBtn.setDisabled(false);
                        }
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('温馨提示', "上传错误！");
                        me.saveBtn.setDisabled(false);
                    }
                });
            });
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});