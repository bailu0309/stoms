/**
 * 输血
 */
Ext.define('build.adverseevent.BloodTransfusionPanel', {
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
                html: '<div style="text-align: left;font-size: medium; ">一、输入何种血时发生事件或错误?</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta11, me.bta12]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二、发生不良事件/错误的名称</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta21, me.bta22, me.bta23, me.bta24]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>三、发生不良事件的主要事由/情况</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .75, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bta31, me.bta32, me.bta33]
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

        me.bta1 = Ext.create('Ext.form.RadioGroup', {
            // fieldLabel: '输入何种血时发生事件或错误?',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: 'bta1'
            },
            items: [
                {boxLabel: '1-输血种类', inputValue: "1"},
                {boxLabel: '2-本事件发生后引起的输血反应', inputValue: "2"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                    }
                    if (newValue.bta1 == 1) {
                        me.nowSelect = me.bta11;
                        me.bta11.setHidden(false);
                    } else if (newValue.bta1 == 2) {
                        me.nowSelect = me.bta12;
                        me.bta12.setHidden(false);
                    }
                }
            }

        });

        me.bta11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-输血种类',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-本事件发生后引起的输血反应',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta2 = Ext.create('Ext.form.RadioGroup', {
            // fieldLabel: '发生不良事件/错误的名称',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: 'bta2'
            },
            items: [
                {boxLabel: '1-输血前检查错误', inputValue: "1"},
                {boxLabel: '2-备血错误(血样采集与送检)', inputValue: "2"},
                {boxLabel: '3-发血错误', inputValue: "3"},
                {boxLabel: '4-输血错误', inputValue: "4"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect2) {
                        me.nowSelect2.setHidden(true);
                        me.nowSelect2.reset();
                    }
                    if (newValue.bta2 == 1) {
                        me.nowSelect2 = me.bta21;
                        me.bta21.setHidden(false);
                    } else if (newValue.bta2 == 2) {
                        me.nowSelect2 = me.bta22;
                        me.bta22.setHidden(false);
                    } else if (newValue.bta2 == 3) {
                        me.nowSelect2 = me.bta23;
                        me.bta23.setHidden(false);
                    } else if (newValue.bta2 == 4) {
                        me.nowSelect2 = me.bta24;
                        me.bta24.setHidden(false);
                    }
                }
            }
        });

        me.bta21 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-输血前检查错误',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta22 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-备血错误(血样采集与送检)',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta23 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-发血错误',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta24 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-输血错误',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.bta3 = Ext.create('Ext.form.RadioGroup', {
            // fieldLabel: '发生不良事件的主要事由/情况',
            columns: 3,
            defaults: {
                margin: '0 5 0 0',
                name: 'bta3'
            },
            items: [
                {boxLabel: '1-操作指南/规范/程序', inputValue: "1"},
                {boxLabel: '2-检查申请单/医嘱/处方信息传递与接受错误', inputValue: "2"},
                {boxLabel: '3-使用前核查及选择错误', inputValue: "3"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect3) {
                        me.nowSelect3.setHidden(true);
                        me.nowSelect3.reset();
                    }
                    if (newValue.bta3 == 1) {
                        me.nowSelect3 = me.bta31;
                        me.bta31.setHidden(false);
                    } else if (newValue.bta3 == 2) {
                        me.nowSelect3 = me.bta32;
                        me.bta32.setHidden(false);
                    } else if (newValue.bta3 == 3) {
                        me.nowSelect3 = me.bta33;
                        me.bta33.setHidden(false);
                    }
                }
            }
        });
        me.bta31 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-操作指南/规范/程序',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta32 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-检查申请单/医嘱/处方信息传递与接受错误',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bta33 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-使用前核查及选择错误',
            hidden: true,
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
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