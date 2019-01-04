/**
 * 药物不良反应上报
 */
Ext.define('build.adverseevent.AdverseDrugReactionPanel', {
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

        me.reportType = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">填报人类别</b>',
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
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.ada1]
            }]
        });
        me.drugInfo = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">使用药品信息</b>',
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
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adb1, me.adb2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adb3, me.adb4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adb5, me.adb6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adb7, me.adb8]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adb9]
            }]
        });
        me.clinicalInfo = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">临床信息</b>',
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
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adc1, me.adc2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adc3, me.adc4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adc5, me.adc6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adc7, me.adc8]
            }]
        });
        me.clinacaltreatment = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">临床处理</b>',
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
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.add1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.add2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.add3]
            }]
        });

        me.nurseEvaluation = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">护士评价</b>',
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
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade5]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.ade7]
            }]
        });
        me.doctorEvaluation = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">医师评价</b>',
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
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf5]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adf7]
            }]
        });
        me.pharmacistEvaluation = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">药师评价</b>',
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
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg1]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg5]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 350, labelAlign: 'right', width: '95%'},
                items: [me.adg6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adg7]
            }]
        });
        me.drugReaction = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size: 15px;color: black;">药品不良反应</b>',
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
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.adh1]
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

            items: [me.hospinfo, me.reprelate, me.baseinfo, me.adverseinfo, me.reportType, me.drugInfo, me.clinicalInfo, me.clinacaltreatment,
                me.nurseEvaluation, me.doctorEvaluation, me.pharmacistEvaluation, me.drugReaction,
                me.preventinfo, me.druginfo, me.relainfo,
                me.peopleinfo, me.reportinfo, me.eventinfo, me.signinfo, me.noteinfo]
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
        me.ada1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '填报人类别',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['K-TOC']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.adb1 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '通用名称',
        });
        me.adb2 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '商品名称',
        });

        me.adb3 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '生产厂家',
        });

        me.adb4 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '批号',
        });

        me.adb5 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '药品剂型',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['L-measure']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.adb6 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '药品用法',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['L-usage']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.adb7 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '药品剂量',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['L-dosage']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.adb8 = Ext.create('build.ux.DateTimeField', {
            name: '',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '首剂用药时间',
        });
        me.adb9 = Ext.create('build.ux.DateTimeField', {
            name: '',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '末剂用药时间',
        });

        me.adc1 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: '体温',
            min: 35,
            max: 42
        });

        me.adc2 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: '呼吸',
            min: 10,
            max: 40
        });
        me.adc3 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: '脉搏',
            min: 50,
            max: 160
        });
        me.adc4 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: '血压（收缩压）',
            min: 0,
            max: 200
        });
        me.adc5 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: '血压（舒张压）',
            min: 0,
            max: 200
        });
        me.adc6 = Ext.create('Ext.form.field.Number', {
            name: '',
            fieldLabel: 'Glasgow昏迷指数',
            min: 0,
            max: 15
        });

        me.adc7 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '其他临床信息',
        });

        me.adc8 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '发生不良反应距末次用药时间',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['M-LastTime']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.add1 = Ext.create('Ext.form.CheckboxGroup', {
            fieldLabel: '临床处理措施（最多选3项）',
            columns: 1,
            defaults: {
                margin: '0 5 0 0',
                name: 'visitresult'
            },
            items: [
                {boxLabel: '停止用药', inputValue: "1"},
                {boxLabel: '抗过敏', inputValue: "2"},
                {boxLabel: '降温', inputValue: "3"},
                {boxLabel: '支持治疗', inputValue: "4"},
                {boxLabel: '入住ICU', inputValue: "5"},
                {boxLabel: '血液净化', inputValue: "6"},
                {boxLabel: '心肺复苏', inputValue: "7"},
                {boxLabel: '其他', inputValue: "8"}
            ]
        });
        me.add2 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '其他',
        });

        me.add3 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '处理后结果',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['N-result']
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.ade1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '护士认为可能原因',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['O-PC']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.ade2 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '用药与不良反应/事件的出现有无合理的时间关系？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.ade3 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应是否符合该药已知的不良反应类型？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.ade4 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '停药或减量后，反应/事件是否消失或减轻？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.ade5 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '再次使用可疑药品后是否再次出现同样反应/事件？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });

        me.ade6 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应/事件是否可用并用药的作用、患者病情的进展、其他治疗的影响来解释？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.ade7 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '其他',
        });


        me.adf1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医师认为可能原因',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['O-PC']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.adf2 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '用药与不良反应/事件的出现有无合理的时间关系？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adf3 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应是否符合该药已知的不良反应类型？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adf4 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '停药或减量后，反应/事件是否消失或减轻？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adf5 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '再次使用可疑药品后是否再次出现同样反应/事件？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });

        me.adf6 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应/事件是否可用并用药的作用、患者病情的进展、其他治疗的影响来解释？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adf7 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '其他',
        });

        me.adg1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '药师认为可能原因',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['O-PC']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.adg2 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '用药与不良反应/事件的出现有无合理的时间关系？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adg3 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应是否符合该药已知的不良反应类型？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adg4 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '停药或减量后，反应/事件是否消失或减轻？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adg5 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '再次使用可疑药品后是否再次出现同样反应/事件？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });

        me.adg6 = Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '反应/事件是否可用并用药的作用、患者病情的进展、其他治疗的影响来解释？',
            columns: 2,
            defaults: {
                margin: '0 5 0 0',
                name: ''
            },
            items: [
                {boxLabel: '是', inputValue: "1"},
                {boxLabel: '否', inputValue: "2"}

            ]
        });
        me.adg7 = Ext.create('Ext.form.field.Text', {
            name: '',
            fieldLabel: '其他',
        });

        me.adh1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '药品不良分类',
            name: '',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['P-COR']
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
                    url: globalCtx + '/AdverseDrugReactionController/saveAdverseDrug.sdo',
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