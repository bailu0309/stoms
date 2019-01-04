Ext.define('build.adverseevent.PressureSoresPanel_cbak', {
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
                html: '<div>一、压疮发生前的干预措施</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.psa1, me.psa2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.psa3, me.psa4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.psa5, me.psa6]
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
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>三、评估与干预中可能的缺陷</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 220, labelAlign: 'right', width: '95%'},
                items: [me.psc1]
            }]
        });

        me.baseinfo = Ext.create('build.adverseevent.base.PatientBasicInfoSet', {});
        me.adverseinfo = Ext.create('build.adverseevent.base.AdverseTypeSet', {});
        me.noteinfo = Ext.create('build.adverseevent.base.NotesSet', {});

        // me.hospinfo = Ext.create('build.adverseevent.base.HospitalSet', {});
        // me.reprelate = Ext.create('build.adverseevent.base.ReportingRelateSet', {});
        // me.druginfo = Ext.create('build.adverseevent.base.InvolveDrugSet', {});
        // me.relainfo = Ext.create('build.adverseevent.base.RelatedFactorsSet', {});
        // me.preventinfo = Ext.create('build.adverseevent.base.PreventiveMeasureSet', {});
        // me.peopleinfo = Ext.create('build.adverseevent.base.InvolvePeopleSet', {});
        // me.reportinfo = Ext.create('build.adverseevent.base.ReportPeopleSet', {});
        // me.eventinfo = Ext.create('build.adverseevent.base.Report4EventSet', {});
        // me.signinfo = Ext.create('build.adverseevent.base.SignInfoSet', {});


        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            width: me.width - 20,
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding-top:30px',
            autoHeight: true,
            autoScroll: true,
            border: false,
            fieldDefaults: {labelAlign: 'right', labelWidth: 150},
            buttonAlign: 'center',
            buttons: [me.saveBtn],
            items: [me.baseinfo, me.adverseinfo, me.content, me.noteinfo]
        });

        me.saveBtn = Ext.create('Ext.button.Button', {
            text: '保存',
            iconCls: 'savewhite',
            scope: this,
            handler: me.save
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

    },
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'id',
            hidden: true
        });

        me.psa1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-评估为压疮高危患者',
            name: 'psa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-highUlcers']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psa2 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-压疮危险因素评估Braden表',
            name: 'psa2',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-braden']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psa3 = Ext.create('Ext.form.field.Text', {
            fieldLabel: '3-Braden表评估分值'
        });
        me.psa4 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-压疮评估结果选择',
            name: 'psa4',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-result']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psa5 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '5-评估患者压疮易患部位',
            name: 'psa5',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-sore_area']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psa6 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '6-高危患者入院后的干预措施',
            name: 'psa6',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-cMeasure']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.psb1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-压疮发生部位',
            name: 'psb1',
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
            fieldLabel: '2-压疮分期 注:引自卫生部临床护理实践指南（2011 版）p315',
            name: 'psb2',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-pressure_US']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.psb3 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-患者发生压疮后的干预措施',
            name: 'psb3',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-pressure_ulcer']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.psc1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-评估与干预可能的缺陷',
            name: 'psc1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-ps-1-defective']
            }),
            queryMode: 'local',
            typeAhead: true
        });
    },
    loadData: function (id, name) {
        var me = this;
        me.formPanel.reset();
        me.store.load({
            params: {"fid": id, fuid: name},
            callback: function (records) {
                var data = records[0].data;

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
            Ext.MessageBox.confirm('提示', '确认保存？', function (btn) {
                if (btn != 'yes') {
                    me.saveBtn.setDisabled(false);
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
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});