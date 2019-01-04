/**
 * 输液反应
 */
Ext.define('build.adverseevent.InfusionReactionPanel', {
    extend: 'Ext.panel.Panel',
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
            width: 1200,
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
                html: '<div>一-使用药品制剂的种类</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.ira1]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二-事件过程特征</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.irb1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.irb11, me.irb12, me.irb13, me.irb14, me.irb15, me.irb16, me.irb17, me.irb18,]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>三、处理</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.irc1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.irc11, me.irc12]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>四-相关可能的因素</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.ird1]
            }]
        });


        me.baseinfo = Ext.create('build.adverseevent.base.PatientBasicInfoSet', {});
        me.hospinfo = Ext.create('build.adverseevent.base.HospitalSet', {});
        me.reprelate = Ext.create('build.adverseevent.base.ReportingRelateSet', {});
        me.adverseinfo = Ext.create('build.adverseevent.base.AdverseTypeSet', {});
        me.druginfo = Ext.create('build.adverseevent.base.InvolveDrugSet', {});
        me.relainfo = Ext.create('build.adverseevent.base.RelatedFactorsSet', {});
        me.preventinfo = Ext.create('build.adverseevent.base.PreventiveMeasureSet', {});
        me.peopleinfo = Ext.create('build.adverseevent.base.InvolvePeopleSet', {});
        me.reportinfo = Ext.create('build.adverseevent.base.ReportPeopleSet', {});
        me.eventinfo = Ext.create('build.adverseevent.base.Report4EventSet', {});
        me.signinfo = Ext.create('build.adverseevent.base.SignInfoSet', {});
        me.noteinfo = Ext.create('build.adverseevent.base.NotesSet', {});


        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            baseCls: 'my-panel-no-border',
            bodyStyle: 'padding-top:30px',
            autoHeight: true,
            autoScroll: true,
            border: false,
            fieldDefaults: {labelAlign: 'right', labelWidth: 150},
            buttonAlign: 'center',
            buttons: [me.saveBtn],
            items: [me.hospinfo, me.reprelate, me.baseinfo, me.adverseinfo, me.content, me.preventinfo, me.druginfo, me.relainfo,
                me.peopleinfo, me.reportinfo, me.eventinfo, me.signinfo, me.noteinfo]
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
            hidden: true
        });
        me.ira1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-药品制剂种类',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-BTR-1-TOPP']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.irb1 = Ext.create('Ext.form.RadioGroup', {
            columns: 4,
            defaults: {
                margin: '0 5 0 0',
                name: 'irb1'
            },
            items: [
                {boxLabel: '1-常见静脉输液反应类', inputValue: "1"},
                {boxLabel: '2-生理反应描述', inputValue: "2"},
                {boxLabel: '3-距输液开始时间', inputValue: "3"},
                {boxLabel: '4-持续时间', inputValue: "4"},
                {boxLabel: '5-是否取了血样', inputValue: "5"},
                {boxLabel: '6-加药口是否使用了消毒剂', inputValue: "6"},
                {boxLabel: '7-是否有重复使用的器具', inputValue: "7"},
                {boxLabel: '8-在输液体中加药', inputValue: "8"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                    }
                    if (newValue.irb1 == 1) {
                        me.nowSelect = me.irb11;
                        me.irb11.setHidden(false);
                    } else if (newValue.irb1 == 2) {
                        me.nowSelect = me.irb12;
                        me.irb12.setHidden(false);
                    } else if (newValue.irb1 == 3) {
                        me.nowSelect = me.irb13;
                        me.irb13.setHidden(false);
                    } else if (newValue.irb1 == 4) {
                        me.nowSelect = me.irb14;
                        me.irb14.setHidden(false);
                    } else if (newValue.irb1 == 5) {
                        me.nowSelect = me.irb15;
                        me.irb15.setHidden(false);
                    } else if (newValue.irb1 == 6) {
                        me.nowSelect = me.irb16;
                        me.irb16.setHidden(false);
                    } else if (newValue.irb1 == 7) {
                        me.nowSelect = me.irb17;
                        me.irb17.setHidden(false);
                    } else if (newValue.irb1 == 8) {
                        me.nowSelect = me.irb18;
                        me.irb18.setHidden(false);
                    }
                }
            }
        });

        me.irb11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-常见静脉输液反应类',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-1-CVTR']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-生理反应描述',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-2-PRD']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb13 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-距输液开始时间',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-3-TTSI']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb14 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-持续时间',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-4-TOD']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb15 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '5-是否取了血样',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-5-HYTABS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb16 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '6-加药口是否使用了消毒剂',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-6-IADUI']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb17 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '7-是否有重复使用的器具',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-7-ITARA']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irb18 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '8-在输液体中加药',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D54-2-8-ATMTTI']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.irc1 = Ext.create('Ext.form.RadioGroup', {
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: 'irc1'
            },
            items: [
                {boxLabel: '1-处理措施', inputValue: "1"},
                {boxLabel: '2-处理后结果', inputValue: "2"}

            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect2) {
                        me.nowSelect2.setHidden(true);
                        me.nowSelect2.reset();
                    }
                    if (newValue.irc1 == 1) {
                        me.nowSelect2 = me.irc11;
                        me.irc11.setHidden(false);
                    } else if (newValue.irc1 == 2) {
                        me.nowSelect2 = me.irc12;
                        me.irc12.setHidden(false);
                    }
                }
            }
        });
        me.irc11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-处理措施',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D55-3-1-TM']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.irc12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-处理后结果',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D55-3-2-PTR']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ird1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-相关因素',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['D-BTR-4-RF']
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
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});