/**
 * 临床护理类
 */
Ext.define('build.adverseevent.BedsideCarePanel', {
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
                html: '<div>一、发生不良事件/错误的名称</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.bca1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bca11, me.bca12, me.bca13]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二、发生不良事件的主要事由/要素</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bca2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.bca21, me.bca22, me.bca23, me.bca24, me.bca25]
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
        me.bca1 = Ext.create('Ext.form.RadioGroup', {
            // fieldLabel: '输入何种血时发生事件或错误?',
            columns: 3,
            defaults: {
                margin: '0 5 0 0',
                name: 'bca1'
            },
            items: [
                {boxLabel: '1-临床护理错误', inputValue: "1"},
                {boxLabel: '2-进食错误', inputValue: "2"},
                {boxLabel: '3-其他错误情况', inputValue: "3"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                    }
                    if (newValue.bca1 == 1) {
                        me.nowSelect = me.bca11;
                        me.bca11.setHidden(false);
                    } else if (newValue.bca1 == 2) {
                        me.nowSelect = me.bca12;
                        me.bca12.setHidden(false);
                    } else if (newValue.bca1 == 3) {
                        me.nowSelect = me.bca13;
                        me.bca13.setHidden(false);
                    }
                }
            }

        });

        me.bca11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-临床护理错误',
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
        me.bca12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-进食错误',
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
        me.bca13 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-其他错误情况',
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

        me.bca2 = Ext.create('Ext.form.RadioGroup', {
            // fieldLabel: '发生不良事件/错误的名称',
            columns: 3,
            defaults: {
                margin: '0 5 0 0',
                name: 'bca2'
            },
            items: [
                {boxLabel: '1-临床护理', inputValue: "1"},
                {boxLabel: '2-行动限制医嘱', inputValue: "2"},
                {boxLabel: '3-患者自带药品', inputValue: "3"},
                {boxLabel: '4-营养与饮食', inputValue: "4"},
                {boxLabel: '5-物品运送', inputValue: "5"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect2) {
                        me.nowSelect2.setHidden(true);
                        me.nowSelect2.reset();
                    }
                    if (newValue.bca2 == 1) {
                        me.nowSelect2 = me.bca21;
                        me.bca21.setHidden(false);
                    } else if (newValue.bca2 == 2) {
                        me.nowSelect2 = me.bca22;
                        me.bca22.setHidden(false);
                    } else if (newValue.bca2 == 3) {
                        me.nowSelect2 = me.bca23;
                        me.bca23.setHidden(false);
                    } else if (newValue.bca2 == 4) {
                        me.nowSelect2 = me.bca24;
                        me.bca24.setHidden(false);
                    } else if (newValue.bca2 == 5) {
                        me.nowSelect2 = me.bca25;
                        me.bca25.setHidden(false);
                    }
                }
            }

        });
        me.bca21 = Ext.create('Ext.form.ComboBox', {
            hidden: true,
            fieldLabel: '1-临床护理',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.bca22 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-行动限制医嘱',
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
        me.bca23 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-患者自带药品',
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
        me.bca24 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-营养与饮食',
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
        me.bca25 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '5-物品运送',
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