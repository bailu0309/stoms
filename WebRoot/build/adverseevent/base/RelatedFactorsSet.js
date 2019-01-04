/**
 * 当事人相关因素
 */
Ext.define('build.adverseevent.base.RelatedFactorsSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        me.otherinfo = Ext.create('Ext.form.FieldSet', {
            width: 1200,
            border: false,
            defaults: {bodyStyle: 'padding-top:50px', labelWidth: 200, border: false, width: '50%', hidden: true},
            collapsible: false,
            columnWidth: 1,
            items: [me.ra1, me.ra2, me.ra3, me.ra4, me.ra5,
                me.ra6, me.ra7, me.ra8, me.ra9, me.ra10,
                me.ra11, me.ra12, me.ra13, me.ra14, me.ra15,
                me.ra16, me.ra17, me.ra18, me.ra19, me.ra20,
                me.ra21, me.ra22]
        });

        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">事件当事人可能相关的因素</b>',
            width: 1200,
            layout: 'column',
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            collapsible: true,
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 0, labelAlign: 'right', width: '95%'},
                items: [me.relationfactory]
            }, me.otherinfo]
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
    initPartsInfo: function () {
        var me = this;

        me.relationfactory = Ext.create('Ext.form.RadioGroup', {
            name: 'felement',
            columns: 4,
            defaults: {
                margin: '0 5 0 0',
                name: 'relationfactory'
            },
            items: [
                {boxLabel: '1-查对与确认', inputValue: "1"},
                {boxLabel: '2-观察', inputValue: "2"},
                {boxLabel: '3-诊断/评估', inputValue: "3"},
                {boxLabel: '4-知识/经验', inputValue: "4"},
                {boxLabel: '5-技能/处置', inputValue: "5"},
                {boxLabel: '6-报告/汇报', inputValue: "6"},
                {boxLabel: '7-身体状态', inputValue: "7"},
                {boxLabel: '8-心理状态', inputValue: "8"},
                {boxLabel: '9-人员配合/协调', inputValue: "9"},
                {boxLabel: '10-病历等记录', inputValue: "10"},
                {boxLabel: '11-类似/类同', inputValue: "11"},
                {boxLabel: '12-服务状态', inputValue: "12"},
                {boxLabel: '13-环境状态', inputValue: "13"},
                {boxLabel: '14-医疗设备器材', inputValue: "14"},
                {boxLabel: '15-药品', inputValue: "15"},
                {boxLabel: '16-辅助用品', inputValue: "16"},
                {boxLabel: '17-环境设备/器材', inputValue: "17"},
                {boxLabel: '18-教育与培训', inputValue: "18"},
                {boxLabel: '19-患者与家属知情同意', inputValue: "19"},
                {boxLabel: '20-诊疗常规/指南/操作规程', inputValue: "20"},
                {boxLabel: '21-医疗失误', inputValue: "21"},
                {boxLabel: '22-其他可能因素', inputValue: "22"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                    }
                    if (newValue.relationfactory == 1) {
                        me.nowSelect = me.ra1;
                        me.ra1.setHidden(false);
                    } else if (newValue.relationfactory == 2) {
                        me.nowSelect = me.ra2;
                        me.ra2.setHidden(false);
                    } else if (newValue.relationfactory == 3) {
                        me.nowSelect = me.ra3;
                        me.ra3.setHidden(false);
                    } else if (newValue.relationfactory == 4) {
                        me.nowSelect = me.ra4;
                        me.ra4.setHidden(false);
                    } else if (newValue.relationfactory == 5) {
                        me.nowSelect = me.ra5;
                        me.ra5.setHidden(false);
                    } else if (newValue.relationfactory == 6) {
                        me.nowSelect = me.ra6;
                        me.ra6.setHidden(false);
                    } else if (newValue.relationfactory == 7) {
                        me.nowSelect = me.ra7;
                        me.ra7.setHidden(false);
                    } else if (newValue.relationfactory == 8) {
                        me.nowSelect = me.ra8;
                        me.ra8.setHidden(false);
                    } else if (newValue.relationfactory == 9) {
                        me.nowSelect = me.ra9;
                        me.ra9.setHidden(false);
                    } else if (newValue.relationfactory == 10) {
                        me.nowSelect = me.ra10;
                        me.ra10.setHidden(false);
                    } else if (newValue.relationfactory == 11) {
                        me.nowSelect = me.ra11;
                        me.ra11.setHidden(false);
                    } else if (newValue.relationfactory == 12) {
                        me.nowSelect = me.ra12;
                        me.ra12.setHidden(false);
                    } else if (newValue.relationfactory == 13) {
                        me.nowSelect = me.ra13;
                        me.ra13.setHidden(false);
                    } else if (newValue.relationfactory == 14) {
                        me.nowSelect = me.ra14;
                        me.ra14.setHidden(false);
                    } else if (newValue.relationfactory == 15) {
                        me.nowSelect = me.ra15;
                        me.ra15.setHidden(false);
                    } else if (newValue.relationfactory == 16) {
                        me.nowSelect = me.ra16;
                        me.ra16.setHidden(false);
                    } else if (newValue.relationfactory == 17) {
                        me.nowSelect = me.ra17;
                        me.ra17.setHidden(false);
                    } else if (newValue.relationfactory == 18) {
                        me.nowSelect = me.ra18;
                        me.ra18.setHidden(false);
                    } else if (newValue.relationfactory == 19) {
                        me.nowSelect = me.ra19;
                        me.ra19.setHidden(false);
                    } else if (newValue.relationfactory == 20) {
                        me.nowSelect = me.ra20;
                        me.ra20.setHidden(false);
                    } else if (newValue.relationfactory == 21) {
                        me.nowSelect = me.ra21;
                        me.ra21.setHidden(false);
                    } else if (newValue.relationfactory == 22) {
                        me.nowSelect = me.ra22;
                        me.ra22.setHidden(false);
                    }
                }
            }
        });

        me.ra1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-查对与确认',
            name: 'ffind',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-CAC']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra2 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-观察',
            name: 'fview',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-observe']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra3 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-诊断/评估',
            name: 'fda',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-D-A']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra4 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-知识/经验',
            name: 'fke',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-K-E']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra5 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '5-技能/处置',
            name: 'fsd',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-S-D']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra6 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '6-报告/汇报',
            name: 'frr',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-R-R']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra7 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '7-身体状态',
            name: 'fps',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-PS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra8 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '8-心理状态',
            name: 'fpls',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-PlS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra9 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '9-人员配合/协调',
            name: 'fpcc',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-PC-C']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra10 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '10-病历等记录',
            name: 'fmr',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-MR']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra11 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '11-类似/类同',
            name: 'fss',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-S-S']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra12 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '12-服务状态',
            name: 'fservice',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-SS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra13 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '13-环境状态',
            name: 'fes',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-ES']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra14 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '14-医疗设备器材',
            name: 'fmedicale',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-medicalE']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra15 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '15-药品',
            name: 'fdrug',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-drug']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra16 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '16-辅助用品',
            name: 'fauxiliarys',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-auxiliaryS']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra17 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '17-环境设备/器材',
            name: 'feee',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-EE-E']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra18 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '18-教育与培训',
            name: 'feat',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-EAT']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra19 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '19-患者与家属知情同意',
            name: 'ficopaf',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-ICOPAF']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra20 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '20-诊疗常规/指南/操作规程',
            name: 'fcpgop',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-CP-G-OP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra21 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '21-医疗失误',
            name: 'fmalap',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['F28-malaP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.ra22 = Ext.create('Ext.form.field.Text', {
            fieldLabel: '22-其他可能因素',
            name: 'fopf'
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});