Ext.define('build.adverseevent.NoPlanExtubationPanel_cbak', {
    extend: 'Ext.panel.Panel',
    width: 1200,
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
                html: '<div>一、导管类型</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.npa1]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>二、置管时间</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.npb1, me.npb2]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>三、管路滑脱时情况描述（意识、活动能力、固定方法、健康教育、约束带使用、脱管时工作人员是否在场）</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.npc1]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>四、处理措施</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.npd1]
            }, {
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div>五、并发症</div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.npe1]
            }]
        });

        me.baseinfo = Ext.create('build.adverseevent.base.PatientBasicInfoSet', {width: me.width - 20});
        me.adverseinfo = Ext.create('build.adverseevent.base.AdverseTypeSet', {width: me.width - 20});
        me.noteinfo = Ext.create('build.adverseevent.base.NotesSet', {width: me.width - 20});

        // me.baseinfo = Ext.create('build.adverseevent.base.PatientBasicInfoSet', {});
        // me.hospinfo = Ext.create('build.adverseevent.base.HospitalSet', {});
        // me.reprelate = Ext.create('build.adverseevent.base.ReportingRelateSet', {});
        // me.adverseinfo = Ext.create('build.adverseevent.base.AdverseTypeSet', {});
        // me.druginfo = Ext.create('build.adverseevent.base.InvolveDrugSet', {});
        // me.relainfo = Ext.create('build.adverseevent.base.RelatedFactorsSet', {});
        // me.preventinfo = Ext.create('build.adverseevent.base.PreventiveMeasureSet', {});
        // me.peopleinfo = Ext.create('build.adverseevent.base.InvolvePeopleSet', {});
        // me.reportinfo = Ext.create('build.adverseevent.base.ReportPeopleSet', {});
        // me.eventinfo = Ext.create('build.adverseevent.base.Report4EventSet', {});
        // me.signinfo = Ext.create('build.adverseevent.base.SignInfoSet', {});
        // me.noteinfo = Ext.create('build.adverseevent.base.NotesSet', {});

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
            buttonAlign: 'center',
            buttons: [me.saveBtn],
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
            name: 'id',
            hidden: true
        });
        me.npa1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '导管类型',
            name: 'npa1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['A', '1'], ['B', '2'], ['C', '3'], ['D', '4']
                ]
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.npb1 = Ext.create('build.ux.DateTimeField', {
            name: '',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '置管时间',
        });
        me.npb2 = Ext.create('build.ux.DateTimeField', {
            name: '',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            fieldLabel: '发生时间',
        });


        me.npc1 = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '',
            width: '95%',
            name: 'happened'
        });

        me.npd1 = Ext.create('Ext.form.CheckboxGroup', {
            fieldLabel: '',
            columns: 4,
            defaults: {
                margin: '0 5 0 0',
                name: 'visitresult'
            },
            items: [
                {boxLabel: '立即通知医生', inputValue: "1"},
                {boxLabel: '观察病情', inputValue: "2"},
                {boxLabel: '脱管部位处理', inputValue: "3"},
                {boxLabel: '重新置管', inputValue: "4"},
                {boxLabel: '记录病情', inputValue: "5"},
                {boxLabel: '用药', inputValue: "6"},
                {boxLabel: '其他', inputValue: "7"}
            ]
        });
        me.npe1 = Ext.create('Ext.form.CheckboxGroup', {
            fieldLabel: '',
            columns: 4,
            defaults: {
                margin: '0 5 0 0',
                name: 'visitresult'
            },
            items: [
                {boxLabel: '无', inputValue: "1"},
                {boxLabel: '出血', inputValue: "2"},
                {boxLabel: '气栓', inputValue: "3"},
                {boxLabel: '血栓', inputValue: "4"},
                {boxLabel: '窒息', inputValue: "5"},
                {boxLabel: '感染', inputValue: "6"},
                {boxLabel: '气胸', inputValue: "7"},
                {boxLabel: '其他', inputValue: "8"}
            ]
        });

        me.fdc1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '严重程度分级',
            name: 'fdc1',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['A', '1'], ['B', '2'], ['C', '3'], ['D', '4']
                ]
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