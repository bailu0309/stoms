Ext.define('build.adverseevent.PressureSoresPanel', {
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
                html: '<div>一、压疮风险评估</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.zid, me.psa1]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二、压疮发生后的干预措施</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.psb1, me.psb2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.psb3]
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
        me.psa1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '压疮风险评估',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'result',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-result']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.psb1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-压疮发生部位',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'site',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-pressure_Site']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psb2 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-压疮分期',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'us',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-pressure_US']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psb3 = Ext.create('Ext.form.field.Tag', {
            fieldLabel: '3-患者发生压疮后的干预措施',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'ulcer',
            displayField: 'name',
            valueField: 'value',
            multiSelect: true,
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-pressure_ulcer']
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
                    url: globalCtx + '/PressureSoresController/savePressSores.sdo',
                    method: 'POST',
                    submitEmptyText: false,
                    waitMsg: '正在保存,请稍候...',
                    timeout: 60000,
                    params: {},
                    success: function (response, options) {
                        var obj = Ext.util.JSON.decode(options.response.responseText);
                        if (obj.success == true) {
                            me.loadData(obj.info, 1);
                            // me.baseinfo.fid.setValue(obj.info);

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