/**
 * 事件报告相关信息
 */
Ext.define('build.basecomp.ReportInfoPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    requires: [],
    initComponent: function () {
        this.initData();
        Ext.apply(this, {
            layout: 'border',
            items: [this.formPanel]
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
            frame: true,
            title: '医院信息',
            region: 'center',
            autoHeight: true,
            autoScroll: true,
            border: false,
            layout: 'auto',
            fieldDefaults: {labelAlign: 'right', labelWidth: 90},
            buttonAlign: 'center',
            items: [{
                xtype: 'fieldset',
                layout: 'column',
                border: true,
                collapsible: false,
                columnWidth: 1,
                items: [{
                    columnWidth: .5,
                    border: false,
                    bodyStyle: 'padding-top:20px',
                    items: [me.fid, me.hosp_type]
                }, {
                    columnWidth: .5,
                    border: false,
                    bodyStyle: 'padding-top:20px',
                    items: [me.hosp_belong]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.hosp_level]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.hosp_ownership]
                }, {
                    columnWidth: .5,
                    border: false,
                    items: [me.hosp_prov]
                }]
            }]
        })
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
    },
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true,
            labelWidth: 60,
            width: 160
        });
        me.hosp_type = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院类型',
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
                data: DICT_COMBO['']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.hosp_belong = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '隶属关系',
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
                data: DICT_COMBO['']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.hosp_level = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院等级',
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
                data: DICT_COMBO['']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        me.hosp_ownership = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所有制',
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
                data: DICT_COMBO['']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        me.hosp_prov = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '省别',
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
                data: DICT_COMBO['']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
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

                var r = Ext.create('Model', data);
                me.formPanel.getForm().loadRecord(r);
            }
        });
        me.formPanel.isValid();
    },
    save: function () {
        var me = this;
        if (me.formPanel.isValid()) {

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