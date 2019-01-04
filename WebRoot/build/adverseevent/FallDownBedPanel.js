Ext.define('build.adverseevent.FallDownBedPanel', {
    extend: 'Ext.panel.Panel',
    width: 1100,
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

        me.content = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">事件内容</b>',
            width: me.width - 20,
            layout: 'column',
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            collapsible: true,
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>一、跌倒事件发生的患者特征（多选）</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.zid, me.fda1, me.fda2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fda3, me.fda4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fda5, me.fda6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fda7, me.fda8]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fda9, me.fda10]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fda11]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二、发生不良事件的主要事由/要素（四选一）</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fdb1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fdb11, me.fdb12, me.fdb13, me.fdb141, me.fdb111, me.fdb121, me.fdb131]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>三、跌倒损伤严重程度分级</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fdc1]
            }]
        });


        me.baseinfo = Ext.create('build.adverseevent.base.PatientBasicInfoSet', {width: me.width - 20});
        me.adverseinfo = Ext.create('build.adverseevent.base.AdverseTypeSet', {width: me.width - 20});
        me.noteinfo = Ext.create('build.adverseevent.base.NotesSet', {width: me.width - 20});
        me.eventtime = Ext.create('build.adverseevent.base.EventTimeSet', {width: me.width - 20});

        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding-top:30px',
            autoHeight: true,
            autoScroll: true,
            border: false,
            fieldDefaults: {labelAlign: 'right', labelWidth: 150},
            items: [me.baseinfo, me.adverseinfo, me.eventtime, me.content, me.noteinfo]
        });


        me.newBtn = Ext.create('Ext.button.Button', {
                text: '新增',
                hidden: me.hideSave,
                iconCls: 'add',
                scope: this,
                handler: function () {
                    me.formPanel.getForm().reset();
                    me.saveBtn.setDisabled(false);
                    me.upBtn.setDisabled(false);
                }
            }
        );

        me.saveBtn = Ext.create('Ext.button.Button', {
            text: '保存',
            hidden: me.hideSave,
            iconCls: 'savewhite',
            scope: this,
            handler: me.save
        });

        me.upBtn = Ext.create('Ext.button.Button', {
            text: '上报',
            hidden: me.hideSave,
            iconCls: 'up',
            scope: this,
            handler: me.upload
        });

        me.viewPanel = new Ext.Panel({
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            border: true,
            region: 'center',
            split: true,
            buttonAlign: 'center',
            tbar: ['->', me.newBtn, '->'],
            buttons: [me.upBtn, '&emsp;&emsp;', me.saveBtn],
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
    },
    initPartsInfo: function () {
        var me = this;
        me.zid = Ext.create('Ext.form.field.Text', {
            name: 'id',
            hidden: true
        });

        me.fda1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-病人近一年跌倒≥1 次（不含本次）',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'aay',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-AAY']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda2 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-评估为高危人群',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'hrg',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-HRG']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda3 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-评估为不能自行下地行走',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'ycwoyo',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-YCWOYO']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda4 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-有陪护者',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'tate',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-TATE']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda5 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '5-使用辅具',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'uoad',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-UOAD']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                "change": function (a, b) {
                    if (a.rawValue == "是") {
                        me.fda6.allowBlank = false;
                        me.fda6.setDisabled(false);
                        me.fda6.setFieldLabel(redTpl + '6-使用何种辅具');
                    } else {
                        me.fda6.reset();
                        me.fda6.allowBlank = true;
                        me.fda6.setDisabled(true);
                        me.fda6.setFieldLabel('6-使用何种辅具');
                        me.fda6.beforeLabelTextTpl = '';
                    }
                }
            }
        });
        me.fda6 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '6-使用何种辅具',
            // beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'waau',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-WAAU']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda7 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '7-事件发生前床栏使用',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'bbu',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-BBU']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda8 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '8-事件发生时现场',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'tihats',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-TIHATS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda9 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '9-患者神志清楚',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'tpk',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-TPK']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda10 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '10-医院有跌倒/坠床预防及处理规范',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'ps',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-PS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.fda11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '11-跌倒/坠床致骨折脱位',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'fd',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-1-FD']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.fdb1 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '主要事由/要素',
            columns: 4,
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'matter',
            defaults: {
                margin: '0 5 0 0',
                name: 'matter'
            },
            items: [
                {boxLabel: '1-病人因素', inputValue: "1"},
                {boxLabel: '2-环境因素', inputValue: "2"},
                {boxLabel: '3-服用药物因素', inputValue: "3"},
                {boxLabel: '9-其他', inputValue: "9"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {


                    me.fdb11.allowBlank = true;
                    me.fdb12.allowBlank = true;
                    me.fdb13.allowBlank = true;


                    me.fdb111.setHidden(true);
                    me.fdb111.allowBlank = true;
                    me.fdb121.setHidden(true);
                    me.fdb121.allowBlank = true;
                    me.fdb131.setHidden(true);
                    me.fdb131.allowBlank = true;
                    me.fdb141.setHidden(true);
                    me.fdb141.allowBlank = true;

                    me.fdb111.reset();
                    me.fdb121.reset();
                    me.fdb131.reset();
                    me.fdb141.reset();

                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                    }
                    if (newValue.matter == 1) {
                        me.nowSelect = me.fdb11;
                        me.fdb11.setHidden(false);
                        me.fdb11.allowBlank = false;
                    } else if (newValue.matter == 2) {
                        me.nowSelect = me.fdb12;
                        me.fdb12.setHidden(false);
                        me.fdb12.allowBlank = false;
                    } else if (newValue.matter == 3) {
                        me.nowSelect = me.fdb13;
                        me.fdb13.setHidden(false);
                        me.fdb13.allowBlank = false;
                    } else if (newValue.matter == 9) {
                        me.nowSelect = null;
                        me.fdb141.setHidden(false);
                        me.fdb141.allowBlank = false;
                    }
                }
            }
        });
        me.fdb11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-病人因素',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            editable: false,
            name: 'pf',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-2-PF']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                change: function (thos, newValue, oldValue, eOpts) {
                    if (newValue == 99) {
                        me.fdb111.setHidden(false);
                        me.fdb111.allowBlank = false;
                    } else {
                        me.fdb111.setHidden(true);
                        me.fdb111.allowBlank = true;
                    }
                }
            }
        });
        me.fdb111 = Ext.create('Ext.form.field.Text', {
            name: 'pfother',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.fdb12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-环境因素',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            editable: false,
            name: 'ef',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-2-EF']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                change: function (thos, newValue, oldValue, eOpts) {
                    if (newValue == 99) {
                        me.fdb121.setHidden(false);
                        me.fdb121.allowBlank = false;
                    } else {
                        me.fdb121.setHidden(true);
                        me.fdb121.allowBlank = true;
                    }
                }
            }

        });
        me.fdb121 = Ext.create('Ext.form.field.Text', {
            name: 'efother',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.fdb13 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-服用药物因素',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            editable: false,
            name: 'mf',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-2-MF']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                change: function (thos, newValue, oldValue, eOpts) {
                    if (newValue == 99) {
                        me.fdb131.setHidden(false);
                        me.fdb131.allowBlank = false;
                    } else {
                        me.fdb131.setHidden(true);
                        me.fdb131.allowBlank = true;
                    }
                }
            }
        });
        me.fdb131 = Ext.create('Ext.form.field.Text', {
            name: 'mfother',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.fdb141 = Ext.create('Ext.form.field.Text', {
            name: 'qtother',
            beforeLabelTextTpl: redTpl,
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.fdc1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '严重程度分级',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'sr',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-FD-3-SR']
            }),
            queryMode: 'local',
            typeAhead: true
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
    setHideBtn: function () {
        var me = this;
        me.saveBtn.setHidden(true);
        me.saveBtn.setDisabled(true);

        me.upBtn.setDisabled(true);
        me.upBtn.setHidden(true);

        me.newBtn.setDisabled(true);
        me.newBtn.setHidden(true);
    },
    setShowBtn: function () {
        var me = this;
        me.saveBtn.setHidden(false);
        me.saveBtn.setDisabled(false);

        me.upBtn.setHidden(false);
        me.upBtn.setDisabled(false);

        me.newBtn.setHidden(false);
        me.newBtn.setDisabled(false);
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
                    url: globalCtx + '/FallDownController/saveFallDown.sdo',
                    method: 'POST',
                    submitEmptyText: false,
                    waitMsg: '正在保存,请稍候...',
                    timeout: 60000,
                    params: {},
                    success: function (response, options) {
                        var obj = Ext.util.JSON.decode(options.response.responseText);
                        if (obj.success == true) {
                            // me.baseinfo.fid.setValue(obj.info);
                            me.loadData(obj.info, 2);


                            App.getApplication().msg('提示', '保存成功！', 2000);
                            // me.saveBtn.setDisabled(true);

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
        if (Ext.isEmpty(me.baseinfo.fid.getValue())) {
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