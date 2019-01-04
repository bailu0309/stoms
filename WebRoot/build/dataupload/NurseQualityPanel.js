/**
 * 护理质量国家数据上报
 */
Ext.define('build.dataupload.NurseQualityPanel', {
    extend: 'Ext.panel.Panel',
    callBack: null,
    hideSave: false,
    width: 1100,
    initComponent: function () {


        this.initData();
        Ext.apply(this, {
            layout: 'border',
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
        me.wpoint = '<p style="color: white">·</p>';
        me.setDefault = {
            allowBlank: false,
            beforeLabelTextTpl: redTpl,
            allowDecimals: false,
            columnWidth: .33,
            labelWidth: 220,
            labelAlign: 'right',
            width: '95%',
            keyNavEnabled: false,
            mouseWheelEnabled: false
        };

        me.set1 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">1.本季度医院基本信息数据</b>',
            layout: 'column',
            border: true,
            bodyStyle: 'padding:1px',
            collapsible: true,
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.a1, me.a2, me.a3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.a4, me.a5, me.a6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.a7, me.a8, me.a9]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.a10, me.a11, me.a12]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.a13]
            }]
        });
        me.set2 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">2.住院患者留置导管非计划拔管护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.b1, me.b2, me.b3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.b4, me.b5, me.b6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.b7, me.b8]
            }]
        });
        me.set3 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">3.住院患者导管相关性感染护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.c1, me.c2, me.c3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.c4]
            }]
        });
        me.set4 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">4.住院患者身体约束护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.d1]
            }]
        });
        me.set5 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">5.院内压疮发生情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.e1, me.e2]
            }]
        });
        me.set6 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">6.住院患者跌倒发生情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.f1, me.f2, me.f3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.f4, me.f5, me.f6]
            }]
        });
        me.set7 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">7.全院执业护士职称分布情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.g1, me.g2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.g3, me.g4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.g5, me.g6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.g7, me.g8]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.g9, me.g10]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [{xtype: 'label', html: me.wpoint}, me.g11]
            }]
        });
        me.set8 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">8.全院执业护士学历分布情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.h1, me.h2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.h3, me.h4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.h5, me.h6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.h7, me.h8]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.h9, me.h10]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [{xtype: 'label', html: me.wpoint}, me.h11]
            }]
        });
        me.set9 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">9.全院执业护士工作年限分布情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.i1, me.i2]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.i3, me.i4]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.i5, me.i6]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.i7, me.i8]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.i9, me.i10]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [{xtype: 'label', html: '<p style="color: white">·</p>'}, me.i11]
            }]
        });
        me.set10 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">10.职称离职情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.j1, me.j2, me.j3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.j4, me.j5, me.j6]
            }]
        });
        me.set11 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">11.学历离职情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.k1, me.k2, me.k3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.k4, me.k5, me.k6]
            }]
        });
        me.set12 = Ext.create('Ext.form.FieldSet', {
            title: '<b style="font-size:16px;color: #87CEEB;">12.工作年限离职情况护理质量数据</b>',
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
                defaults: me.setDefault,
                items: [me.l1, me.l2, me.l3]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: me.setDefault,
                items: [me.l4, me.l5, me.l6]
            }]
        });


        me.setTitle = Ext.create('Ext.form.FieldSet', {
            layout: 'column',
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            collapsible: false,
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                layout: 'form',
                labelWidth: 1,
                bodyStyle: 'padding:5px',
                baseCls: 'x-plain',
                border: false,
                html: '<div style="text-align: center;"><b style="font-size: 25px;">护理质量数据上报</b></div>'
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .25, labelWidth: 100, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.year, me.quarter, me.xm, me.phone]
            }]
        });

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

        me.formPanel = Ext.create('Ext.form.Panel', {
            frame: true,
            width: me.width - 30,
            region: 'center',
            autoHeight: true,
            autoScroll: true,
            border: false,
            layout: 'auto',
            fieldDefaults: {labelAlign: 'right', labelWidth: 150},
            buttonAlign: 'center',
            items: [me.setTitle, me.set1, me.set2, me.set3, me.set4, me.set5, me.set6, me.set7,
                me.set8, me.set9, me.set10, me.set11, me.set12]
        });

        me.viewPanel = new Ext.Panel({
            layout: {
                // align: 'middle',
                pack: 'center',
                type: 'hbox'
            },
            buttonAlign: 'center',
            buttons: [me.upBtn, '&emsp;&emsp;', me.saveBtn],
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
                url: globalCtx + '/NurseQualityController/queryNurseQuality.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    checkRepeat: function (callBack) {
        var me = this;
        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/NurseQualityController/checkRepeat.sdo',
            params: {
                fid: me.fid.getValue(),
                year: me.year.getValue(),
                quarter: me.quarter.getValue()
            },
            scope: this,
            success: function (resp) {
                var obj = Ext.util.JSON.decode(resp.responseText);
                if (obj.success == true) {
                    me.repeat = true;
                    Ext.Msg.alert("提示", "此季度的数据已经上报，请勿重复上报！");
                } else {
                    if (callBack) {
                        callBack();
                    }
                    me.saveBtn.setDisabled(false)
                    me.repeat = false;
                }
            },
            failure: function (response, opts) {
                this.exception();
            }
        });
    },
    countF: function () {
        var me = this;
      /*  if (me.f1.isValid() && me.f2.isValid() && me.f3.isValid() && me.f4.isValid()) {
            var v = me.convertZero(me.f1.getValue()) + me.convertZero(me.f2.getValue()) + me.convertZero(me.f3.getValue());
            me.f5.setValue(v);
            me.f6.setValue(me.convertZero(me.f4.getValue()) + v);
        } else {
            // App.getApplication().msg('提示', '请输入各项跌倒数，以便于计算总数！', 2000);
        }*/
    },
    countG: function () {
        var me = this;
        if (me.g1.isValid() && me.g2.isValid() && me.g3.isValid() && me.g4.isValid() && me.g5.isValid() &&
            me.g6.isValid() && me.g7.isValid() && me.g8.isValid() && me.g9.isValid() && me.g10.isValid()) {
            var v = me.convertZero(me.g2.getValue()) + me.convertZero(me.g4.getValue()) + me.convertZero(me.g6.getValue()) +
                me.convertZero(me.g8.getValue()) + me.convertZero(me.g10.getValue());
            me.g11.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项职称数，以便于计算总数！', 2000);
        }
    },
    countH: function () {
        var me = this;
        if (me.h1.isValid() && me.h2.isValid() && me.h3.isValid() && me.h4.isValid() && me.h5.isValid() &&
            me.h6.isValid() && me.h7.isValid() && me.h8.isValid() && me.h9.isValid() && me.h10.isValid()) {
            var v = me.convertZero(me.h2.getValue()) + me.convertZero(me.h4.getValue()) + me.convertZero(me.h6.getValue()) +
                me.convertZero(me.h8.getValue()) + me.convertZero(me.h10.getValue());
            me.h11.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项职称数，以便于计算总数！', 2000);
        }
    },
    countI: function () {
        var me = this;
        if (me.i1.isValid() && me.i2.isValid() && me.i3.isValid() && me.i4.isValid() && me.i5.isValid() &&
            me.i6.isValid() && me.i7.isValid() && me.i8.isValid() && me.i9.isValid() && me.i10.isValid()) {
            var v = me.convertZero(me.i2.getValue()) + me.convertZero(me.i4.getValue()) + me.convertZero(me.i6.getValue()) +
                me.convertZero(me.i8.getValue()) + me.convertZero(me.i10.getValue());
            me.i11.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项职称数，以便于计算总数！', 2000);
        }
    },
    countJ: function () {
        var me = this;
        if (me.j1.isValid() && me.j2.isValid() && me.j3.isValid() && me.j4.isValid() && me.j5.isValid()) {
            var v =
                me.convertZero(me.j1.getValue()) +
                me.convertZero(me.j2.getValue()) +
                me.convertZero(me.j3.getValue()) +
                me.convertZero(me.j4.getValue()) +
                me.convertZero(me.j5.getValue());
            me.j6.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项跌倒数，以便于计算总数！', 2000);
        }
    },
    countK: function () {
        var me = this;
        if (me.k1.isValid() && me.k2.isValid() && me.k3.isValid() && me.k4.isValid() && me.k5.isValid()) {
            var v =
                me.convertZero(me.k1.getValue()) +
                me.convertZero(me.k2.getValue()) +
                me.convertZero(me.k3.getValue()) +
                me.convertZero(me.k4.getValue()) +
                me.convertZero(me.k5.getValue());
            me.k6.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项跌倒数，以便于计算总数！', 2000);
        }
    },
    countL: function () {
        var me = this;
        if (me.l1.isValid() && me.l2.isValid() && me.l3.isValid() && me.l4.isValid() && me.l5.isValid()) {
            var v =
                me.convertZero(me.l1.getValue()) +
                me.convertZero(me.l2.getValue()) +
                me.convertZero(me.l3.getValue()) +
                me.convertZero(me.l4.getValue()) +
                me.convertZero(me.l5.getValue());
            me.l6.setValue(v);
        } else {
            // App.getApplication().msg('提示', '请输入各项跌倒数，以便于计算总数！', 2000);
        }
    },
    initPartsInfo: function () {
        var me = this;
        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true,
            labelWidth: 60,
            width: 160
        });

        me.year = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '年度',
            allowBlank: false,
            name: 'year',
            beforeLabelTextTpl: redTpl,
            queryMode: 'local',
            editable: false,
            store: new Ext.data.ArrayStore({
                fields: ['id', 'name'],
                data: []
            }),
            value: getLastQuarter(1),
            valueField: 'name',
            displayField: 'id',
            triggerAction: 'all',
            autoSelect: true,
            listeners: {
                beforerender: function () {
                    var newyear = Ext.Date.format(new Date(), 'Y');//这是为了取现在的年份数
                    var yearlist = [];
                    for (var i = newyear - 2; i <= newyear; i++) {
                        yearlist.push([i, i]);
                    }
                    this.store.loadData(yearlist);
                },
                select: function (combo, record, index) {
                    if (!Ext.isEmpty(me.quarter.getValue())) {
                        me.checkRepeat();
                    }
                }
            }
        });
        me.quarter = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '季度',
            allowBlank: false,
            beforeLabelTextTpl: redTpl,
            name: 'quarter',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            value: getLastQuarter(2),
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['一季度', '1'], ['二季度', '2'], ['三季度', '3'], ['四季度', '4']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                    if (!Ext.isEmpty(me.year.getValue())) {
                        me.checkRepeat();
                    }
                }
            }
        });

        me.xm = Ext.create('Ext.form.field.Text', {
            fieldLabel: '填报负责人',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'xm',
            width: '100%'
        });
        me.phone = Ext.create('Ext.form.field.Text', {
            name: 'phone',
            allowBlank: false,
            beforeLabelTextTpl: redTpl,
            fieldLabel: '联系电话',
            regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|1\d{10})$/,
            regexText: "请输入051(6)-1234567(8)的固话号码，或者11位的手机号码",
        });

        me.a1 = Ext.create('Ext.form.field.Number', {
            name: 'a1',
            minValue: -1,
            fieldLabel: '实际开放床位',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a1.isValid()) {
                        me.a2.focus();
                    }
                }
            }
        });
        me.a2 = Ext.create('Ext.form.field.Number', {
            name: 'a2',
            minValue: -1,
            fieldLabel: '期初全院执业护士总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a2.isValid()) {
                        me.a3.focus();
                    }
                }
            }
        });
        me.a3 = Ext.create('Ext.form.field.Number', {
            name: 'a3',
            minValue: -1,
            fieldLabel: '期末全院执业护士总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a3.isValid()) {
                        me.a4.focus();
                    }
                }
            }
        });
        me.a4 = Ext.create('Ext.form.field.Number', {
            name: 'a4',
            minValue: -1,
            fieldLabel: '期初病区执业护士总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a4.isValid()) {
                        me.a5.focus();
                    }
                }
            }
        });
        me.a5 = Ext.create('Ext.form.field.Number', {
            name: 'a5',
            minValue: -1,
            fieldLabel: '住院患者实际占用总床日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a5.isValid()) {
                        me.a6.focus();
                    }
                }
            }
        });
        me.a6 = Ext.create('Ext.form.field.Number', {
            name: 'a6',
            minValue: -1,
            fieldLabel: '期末病区执业护士总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a6.isValid()) {
                        me.a7.focus();
                    }
                }
            }
        });
        me.a7 = Ext.create('Ext.form.field.Number', {
            name: 'a7',
            minValue: -1,
            fieldLabel: '期初在院患者数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a7.isValid()) {
                        me.a8.focus();
                    }
                }
            }
        });
        me.a8 = Ext.create('Ext.form.field.Number', {
            name: 'a8',
            minValue: -1,
            fieldLabel: '新入院患者总数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a8.isValid()) {
                        me.a9.focus();
                    }
                }
            }
        });
        me.a9 = Ext.create('Ext.form.field.Number', {
            name: 'a9',
            labelWidth: 230,
            minValue: -1,
            fieldLabel: '病区在岗执业护士实际上班小时数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a9.isValid()) {
                        me.a10.focus();
                    }
                }
            }
        });
        me.a10 = Ext.create('Ext.form.field.Number', {
            name: 'a10',
            minValue: -1,
            fieldLabel: '白班责任护士数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a10.isValid()) {
                        me.a11.focus();
                    }
                }
            }
        });
        me.a11 = Ext.create('Ext.form.field.Number', {
            name: 'a11',
            minValue: -1,
            fieldLabel: '白班收治患者数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a11.isValid()) {
                        me.a12.focus();
                    }
                }
            }
        });
        me.a12 = Ext.create('Ext.form.field.Number', {
            name: 'a12',
            minValue: -1,
            fieldLabel: '夜班责任护士数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a12.isValid()) {
                        me.a13.focus();
                    }
                }
            }
        });
        me.a13 = Ext.create('Ext.form.field.Number', {
            name: 'a13',
            minValue: -1,
            fieldLabel: '夜班收治患者数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a13.isValid()) {
                        me.b1.focus();
                    }
                }
            }
        });


        me.b1 = Ext.create('Ext.form.field.Number', {
            name: 'b1',
            minValue: -1,
            fieldLabel: '导尿管非计划拔管发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b1.isValid()) {
                        me.b2.focus();
                    }
                }
            }
        });
        me.b2 = Ext.create('Ext.form.field.Number', {
            name: 'b2',
            minValue: -1,
            fieldLabel: '导尿管留置总日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b2.isValid()) {
                        me.b3.focus();
                    }
                }
            }
        });
        me.b3 = Ext.create('Ext.form.field.Number', {
            name: 'b3',
            minValue: -1,
            labelWidth: 270,
            fieldLabel: '胃肠管（经口鼻）非计划拔管发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b3.isValid()) {
                        me.b4.focus();
                    }
                }
            }
        });
        me.b4 = Ext.create('Ext.form.field.Number', {
            name: 'b4',
            minValue: -1,
            fieldLabel: '胃肠管（经口鼻）留置总日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b4.isValid()) {
                        me.b5.focus();
                    }
                }
            }
        });
        me.b5 = Ext.create('Ext.form.field.Number', {
            name: 'b5',
            minValue: -1,
            fieldLabel: '中心导管非计划拔管发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b5.isValid()) {
                        me.b6.focus();
                    }
                }
            }
        });
        me.b6 = Ext.create('Ext.form.field.Number', {
            name: 'b6',
            minValue: -1,
            fieldLabel: '中心导管置管总日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b6.isValid()) {
                        me.b7.focus();
                    }
                }
            }
        });
        me.b7 = Ext.create('Ext.form.field.Number', {
            name: 'b7',
            minValue: -1,
            fieldLabel: '气管导管非计划拔管发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b7.isValid()) {
                        me.b8.focus();
                    }
                }
            }
        });
        me.b8 = Ext.create('Ext.form.field.Number', {
            name: 'b8',
            minValue: -1,
            fieldLabel: '气管导管留置总日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.b8.isValid()) {
                        me.c1.focus();
                    }
                }
            }
        });


        me.c1 = Ext.create('Ext.form.field.Number', {
            name: 'c1',
            minValue: -1,
            fieldLabel: 'VAP发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.c1.isValid()) {
                        me.c2.focus();
                    }
                }
            }
        });
        me.c2 = Ext.create('Ext.form.field.Number', {
            name: 'c2',
            minValue: -1,
            fieldLabel: 'CRBSI发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.c2.isValid()) {
                        me.c3.focus();
                    }
                }
            }
        });
        me.c3 = Ext.create('Ext.form.field.Number', {
            name: 'c3',
            minValue: -1,
            fieldLabel: 'CAUTI发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.c3.isValid()) {
                        me.c4.focus();
                    }
                }
            }
        });
        me.c4 = Ext.create('Ext.form.field.Number', {
            name: 'c4',
            minValue: -1,
            fieldLabel: '患者使用有创机械通气的总日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.c4.isValid()) {
                        me.d1.focus();
                    }
                }
            }
        });
        me.d1 = Ext.create('Ext.form.field.Number', {
            name: 'd1',
            minValue: -1,
            fieldLabel: '住院患者身体约束日数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.d1.isValid()) {
                        me.e1.focus();
                    }
                }
            }
        });
        me.e1 = Ext.create('Ext.form.field.Number', {
            name: 'e1',
            minValue: -1,
            fieldLabel: 'Ⅱ期及以上压疮新发生例数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.e1.isValid()) {
                        me.e2.focus();
                    }
                }
            }
        });
        me.e2 = Ext.create('Ext.form.field.Number', {
            name: 'e2',
            minValue: -1,
            fieldLabel: 'Ⅰ期压疮新发生例数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.e2.isValid()) {
                        me.f1.focus();
                    }
                }
            }
        });

        me.f1 = Ext.create('Ext.form.field.Number', {
            name: 'f1',
            minValue: -1,
            fieldLabel: '跌倒伤害严重度1级例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f1.isValid()) {
                        me.f2.focus();
                    }
                },
                blur: function () {
                    me.countF();
                }
            }
        });
        me.f2 = Ext.create('Ext.form.field.Number', {
            name: 'f2',
            minValue: -1,
            fieldLabel: '跌倒伤害严重度2级例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f2.isValid()) {
                        me.f3.focus();
                    }
                },
                blur: function () {
                    me.countF();
                }
            }
        });
        me.f3 = Ext.create('Ext.form.field.Number', {
            name: 'f3',
            minValue: -1,
            fieldLabel: '跌倒伤害严重度3级例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f3.isValid()) {
                        me.f4.focus();
                    }
                },
                blur: function () {
                    me.countF();
                }
            }
        });
        me.f4 = Ext.create('Ext.form.field.Number', {
            name: 'f4',
            minValue: -1,
            fieldLabel: '跌倒死亡例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f4.isValid()) {
                        me.f5.focus();
                    }
                },
                blur: function () {
                    me.countF();
                }
            }
        });
        me.f5 = Ext.create('Ext.form.field.Number', {
            name: 'f5',
            // readOnly: true,
            minValue: -1,
            fieldLabel: '跌倒发生例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f5.isValid()) {
                        me.f6.focus();
                    }
                },
                blur: function () {
                    me.countF();
                }
            }
        });
        me.f6 = Ext.create('Ext.form.field.Number', {
            name: 'f6',
            // readOnly: true,
            minValue: -1,
            fieldLabel: '跌倒伤害总例次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.f6.isValid()) {
                        me.g1.focus();
                    }
                }
            }
        });

        me.g1 = Ext.create('Ext.form.field.Number', {
            name: 'g1',
            minValue: -1,
            fieldLabel: '季初护士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g1.isValid()) {
                        me.g2.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g2 = Ext.create('Ext.form.field.Number', {
            name: 'g2',
            minValue: -1,
            fieldLabel: '季末护士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g2.isValid()) {
                        me.g3.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g3 = Ext.create('Ext.form.field.Number', {
            name: 'g3',
            minValue: -1,
            fieldLabel: '季初护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g3.isValid()) {
                        me.g4.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g4 = Ext.create('Ext.form.field.Number', {
            name: 'g4',
            minValue: -1,
            fieldLabel: '季末护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g4.isValid()) {
                        me.g5.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g5 = Ext.create('Ext.form.field.Number', {
            name: 'g5',
            minValue: -1,
            fieldLabel: '季初主管护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g5.isValid()) {
                        me.g6.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g6 = Ext.create('Ext.form.field.Number', {
            name: 'g6',
            minValue: -1,
            fieldLabel: '季末主管护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g6.isValid()) {
                        me.g7.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g7 = Ext.create('Ext.form.field.Number', {
            name: 'g7',
            minValue: -1,
            fieldLabel: '季初副主任护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g7.isValid()) {
                        me.g8.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g8 = Ext.create('Ext.form.field.Number', {
            name: 'g8',
            minValue: -1,
            fieldLabel: '季末副主任护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g8.isValid()) {
                        me.g9.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g9 = Ext.create('Ext.form.field.Number', {
            name: 'g9',
            minValue: -1,
            fieldLabel: '季初主任护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g9.isValid()) {
                        me.g10.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g10 = Ext.create('Ext.form.field.Number', {
            name: 'g10',
            minValue: -1,
            fieldLabel: '季末主任护师人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g10.isValid()) {
                        me.h1.focus();
                    }
                },
                blur: function () {
                    me.countG();
                }
            }
        });
        me.g11 = Ext.create('Ext.form.field.Number', {
            name: 'g11',
            readOnly: true,
            minValue: -1,
            fieldLabel: '各职称总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.g11.isValid()) {
                        me.h1.focus();
                    }
                }
            }
        });

        me.h1 = Ext.create('Ext.form.field.Number', {
            name: 'h1',
            minValue: -1,
            fieldLabel: '季初中专人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h1.isValid()) {
                        me.h2.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h2 = Ext.create('Ext.form.field.Number', {
            name: 'h2',
            minValue: -1,
            fieldLabel: '季末中专人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h2.isValid()) {
                        me.h3.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h3 = Ext.create('Ext.form.field.Number', {
            name: 'h3',
            minValue: -1,
            fieldLabel: '季初大专人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h3.isValid()) {
                        me.h4.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h4 = Ext.create('Ext.form.field.Number', {
            name: 'h4',
            minValue: -1,
            fieldLabel: '季末大专人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h4.isValid()) {
                        me.h5.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h5 = Ext.create('Ext.form.field.Number', {
            name: 'h5',
            minValue: -1,
            fieldLabel: '季初本科人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h5.isValid()) {
                        me.h6.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h6 = Ext.create('Ext.form.field.Number', {
            name: 'h6',
            minValue: -1,
            fieldLabel: '季末本科人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h6.isValid()) {
                        me.h7.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h7 = Ext.create('Ext.form.field.Number', {
            name: 'h7',
            minValue: -1,
            fieldLabel: '季初硕士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h7.isValid()) {
                        me.h8.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h8 = Ext.create('Ext.form.field.Number', {
            name: 'h8',
            minValue: -1,
            fieldLabel: '季末硕士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h8.isValid()) {
                        me.h9.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h9 = Ext.create('Ext.form.field.Number', {
            name: 'h9',
            minValue: -1,
            fieldLabel: '季初博士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h9.isValid()) {
                        me.h10.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h10 = Ext.create('Ext.form.field.Number', {
            name: 'h10',
            minValue: -1,
            fieldLabel: '季末博士人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h10.isValid()) {
                        me.i1.focus();
                    }
                },
                blur: function () {
                    me.countH();
                }
            }
        });
        me.h11 = Ext.create('Ext.form.field.Number', {
            name: 'h11',
            readOnly: true,
            minValue: -1,
            fieldLabel: '各学历总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.h11.isValid()) {
                        me.i1.focus();
                    }
                }
            }
        });


        me.i1 = Ext.create('Ext.form.field.Number', {
            name: 'i1',
            minValue: -1,
            fieldLabel: '季初＜1年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i1.isValid()) {
                        me.i2.focus();
                    }
                }
            }
        });
        me.i2 = Ext.create('Ext.form.field.Number', {
            name: 'i2',
            minValue: -1,
            fieldLabel: '季末＜1年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i2.isValid()) {
                        me.i3.focus();
                    }
                },
                blur: function () {
                    me.countI();
                }
            }
        });
        me.i3 = Ext.create('Ext.form.field.Number', {
            name: 'i3',
            minValue: -1,
            fieldLabel: '季初1≤y＜2年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i3.isValid()) {
                        me.i4.focus();
                    }
                }
            }
        });
        me.i4 = Ext.create('Ext.form.field.Number', {
            name: 'i4',
            minValue: -1,
            fieldLabel: '季末1≤y＜2年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i4.isValid()) {
                        me.i5.focus();
                    }
                },
                blur: function () {
                    me.countI();
                }
            }
        });
        me.i5 = Ext.create('Ext.form.field.Number', {
            name: 'i5',
            minValue: -1,
            fieldLabel: '季初2≤y＜5年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i5.isValid()) {
                        me.i6.focus();
                    }
                }
            }
        });
        me.i6 = Ext.create('Ext.form.field.Number', {
            name: 'i6',
            minValue: -1,
            fieldLabel: '季末2≤y＜5年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i6.isValid()) {
                        me.i7.focus();
                    }
                },
                blur: function () {
                    me.countI();
                }
            }
        });
        me.i7 = Ext.create('Ext.form.field.Number', {
            name: 'i7',
            minValue: -1,
            fieldLabel: '季初5≤y＜10年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i7.isValid()) {
                        me.i8.focus();
                    }
                }
            }
        });
        me.i8 = Ext.create('Ext.form.field.Number', {
            name: 'i8',
            minValue: -1,
            fieldLabel: '季末5≤y＜10年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i8.isValid()) {
                        me.i9.focus();
                    }
                },
                blur: function () {
                    me.countI();
                }
            }
        });
        me.i9 = Ext.create('Ext.form.field.Number', {
            name: 'i9',
            minValue: -1,
            fieldLabel: '季初≥10年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i9.isValid()) {
                        me.i10.focus();
                    }
                }
            }
        });
        me.i10 = Ext.create('Ext.form.field.Number', {
            name: 'i10',
            minValue: -1,
            fieldLabel: '季末≥10年资人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i10.isValid()) {
                        me.i11.focus();
                    }
                },
                blur: function () {
                    me.countI();
                }
            }
        });
        me.i11 = Ext.create('Ext.form.field.Number', {
            name: 'i11',
            readOnly: true,
            minValue: -1,
            fieldLabel: '各工作年限总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.i11.isValid()) {
                        me.j1.focus();
                    }
                }
            }
        });


        me.j1 = Ext.create('Ext.form.field.Number', {
            name: 'j1',
            minValue: -1,
            fieldLabel: '护士离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j1.isValid()) {
                        me.j2.focus();
                    }
                },
                blur: function () {
                    me.countJ();
                }
            }
        });
        me.j2 = Ext.create('Ext.form.field.Number', {
            name: 'j2',
            minValue: -1,
            fieldLabel: '护师离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j2.isValid()) {
                        me.j3.focus();
                    }
                },
                blur: function () {
                    me.countJ();
                }
            }
        });
        me.j3 = Ext.create('Ext.form.field.Number', {
            name: 'j3',
            minValue: -1,
            fieldLabel: '主管护师离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j3.isValid()) {
                        me.j4.focus();
                    }
                },
                blur: function () {
                    me.countJ();
                }
            }
        });
        me.j4 = Ext.create('Ext.form.field.Number', {
            name: 'j4',
            minValue: -1,
            fieldLabel: '副主任护师离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j4.isValid()) {
                        me.j5.focus();
                    }
                },
                blur: function () {
                    me.countJ();
                }
            }
        });
        me.j5 = Ext.create('Ext.form.field.Number', {
            name: 'j5',
            minValue: -1,
            fieldLabel: '主任护师离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j5.isValid()) {
                        me.k1.focus();
                    }
                },
                blur: function () {
                    me.countJ();
                }
            }
        });
        me.j6 = Ext.create('Ext.form.field.Number', {
            name: 'j6',
            readOnly: true,
            minValue: -1,
            fieldLabel: '离职总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.j6.isValid()) {
                        me.k1.focus();
                    }
                }
            }
        });

        me.k1 = Ext.create('Ext.form.field.Number', {
            name: 'k1',
            minValue: -1,
            fieldLabel: '中专离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k1.isValid()) {
                        me.k2.focus();
                    }
                },
                blur: function () {
                    me.countK();
                }
            }
        });
        me.k2 = Ext.create('Ext.form.field.Number', {
            name: 'k2',
            minValue: -1,
            fieldLabel: '大专离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k2.isValid()) {
                        me.k3.focus();
                    }
                },
                blur: function () {
                    me.countK();
                }
            }
        });
        me.k3 = Ext.create('Ext.form.field.Number', {
            name: 'k3',
            minValue: -1,
            fieldLabel: '本科离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k3.isValid()) {
                        me.k4.focus();
                    }
                },
                blur: function () {
                    me.countK();
                }
            }
        });
        me.k4 = Ext.create('Ext.form.field.Number', {
            name: 'k4',
            minValue: -1,
            fieldLabel: '硕士离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k4.isValid()) {
                        me.k5.focus();
                    }
                },
                blur: function () {
                    me.countK();
                }
            }
        });
        me.k5 = Ext.create('Ext.form.field.Number', {
            name: 'k5',
            minValue: -1,
            fieldLabel: '博士离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k5.isValid()) {
                        me.l1.focus();
                    }
                },
                blur: function () {
                    me.countK();
                }
            }
        });
        me.k6 = Ext.create('Ext.form.field.Number', {
            name: 'k6',
            readOnly: true,
            minValue: -1,
            fieldLabel: '离职总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.k6.isValid()) {
                        me.l1.focus();
                    }
                }
            }
        });


        me.l1 = Ext.create('Ext.form.field.Number', {
            name: 'l1',
            minValue: -1,
            fieldLabel: '＜1年资离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l1.isValid()) {
                        me.l2.focus();
                    }
                },
                blur: function () {
                    me.countL();
                }
            }
        });
        me.l2 = Ext.create('Ext.form.field.Number', {
            name: 'l2',
            minValue: -1,
            fieldLabel: '1≤y＜2年资离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l2.isValid()) {
                        me.l3.focus();
                    }
                },
                blur: function () {
                    me.countL();
                }
            }
        });
        me.l3 = Ext.create('Ext.form.field.Number', {
            name: 'l3',
            minValue: -1,
            fieldLabel: '2≤y＜5年资离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l3.isValid()) {
                        me.l4.focus();
                    }
                },
                blur: function () {
                    me.countL();
                }
            }
        });
        me.l4 = Ext.create('Ext.form.field.Number', {
            name: 'l4',
            minValue: -1,
            fieldLabel: '5≤y＜10年资离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l4.isValid()) {
                        me.l5.focus();
                    }
                },
                blur: function () {
                    me.countL();
                }
            }
        });
        me.l5 = Ext.create('Ext.form.field.Number', {
            name: 'l5',
            minValue: -1,
            fieldLabel: '≥10年资离职人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l5.isValid()) {
                        me.saveBtn.focus();
                    }
                },
                blur: function () {
                    me.countL();
                }
            }
        });
        me.l6 = Ext.create('Ext.form.field.Number', {
            name: 'l6',
            readOnly: true,
            minValue: -1,
            fieldLabel: '离职总人数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.l6.isValid()) {
                    }
                }
            }
        });
    },
    setData: function (id) {
        var me = this;
        this.formPanel.reset();
        this.store.load({
            params: {
                fid: id
            },
            callback: function (records) {
                me.saveBtn.setDisabled(false)
                if (records && records.length > 0) {
                    var data = records[0].data;
                    me.formPanel.reset();
                    var r = Ext.create('Model', data);
                    me.formPanel.getForm().loadRecord(r);

                    if (data['fst'] == 1 || roleId != '100046') {
                        me.setHideBtn();
                    } else {
                        me.setShowBtn();
                    }
                }
                me.formPanel.isValid();
            }
        });
    },
    setHideBtn: function () {
        var me = this;
        me.saveBtn.setHidden(true);
        me.saveBtn.setDisabled(true);

        me.upBtn.setDisabled(true);
        me.upBtn.setHidden(true);
    },
    setShowBtn: function () {
        var me = this;
        me.saveBtn.setHidden(false);
        me.saveBtn.setDisabled(false);

        me.upBtn.setHidden(false);
        me.upBtn.setDisabled(false);
    },
    loadData: function (id, name) {
        var me = this;
        if (!Ext.isEmpty(me.quarter.getValue()) && !Ext.isEmpty(me.year.getValue())) {
            var year = me.year.getValue();
            var quarter = me.quarter.getValue();
            // this.formPanel.reset();
            this.store.load({
                params: {
                    quarter: quarter,
                    year: year
                },
                callback: function (records) {


                    if (records && records.length > 0) {
                        var data = records[0].data;
                        me.formPanel.reset();
                        var r = Ext.create('Model', data);
                        me.formPanel.getForm().loadRecord(r);

                        if (data['fst'] == 1 || roleId != '100046') {
                            me.setHideBtn();
                        } else {
                            me.setShowBtn();
                        }
                    } else {
                        me.formPanel.reset();
                        me.quarter.setValue(quarter);
                        me.year.setValue(year);
                    }
                }
            });
            me.formPanel.isValid();
        }
    },
    upload: function () {
        var me = this;
        if (Ext.isEmpty(me.fid.getValue())) {
            Ext.Msg.alert("提示", "数据还未保存，无法上报！");
            return;
        }
        Ext.MessageBox.confirm('提示', '上报后将无法修改，确认上报？', function (btn) {
            if (btn != 'yes') {
                return;
            }
            Ext.Ajax.request({
                method: 'post',
                url: globalCtx + '/NurseQualityController/upLoadQuality.sdo',
                params: {
                    fid: me.fid.getValue()
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
    save: function () {
        var me = this;
        me.checkRepeat(function () {
            if (me.formPanel.isValid()) {
                Ext.MessageBox.confirm('提示', '确认保存？', function (btn) {
                    if (btn != 'yes') {
                        me.saveBtn.setDisabled(false);
                        return;
                    }
                    me.formPanel.getForm().submit({
                        url: globalCtx + '/NurseQualityController/saveNurseQuality.sdo',
                        method: 'POST',
                        submitEmptyText: false,
                        waitMsg: '正在保存,请稍候...',
                        timeout: 60000,
                        params: {
                            // contacts: me.contacts.getValue()
                        },
                        success: function (response, options) {
                            var obj = Ext.util.JSON.decode(options.response.responseText);
                            if (obj.success == true) {
                                me.fid.setValue(obj.info);
                                if (me.callBack) {
                                    me.callBack();
                                }
                                me.saveBtn.setDisabled(true)
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
            } else {
                App.getApplication().msg('提示', '红色星号为必填项，请填写完整数据后保存！', 2000);
            }
        });
    },
    convertZero: function (v) {
        if (v == -1) {
            return 0;
        } else {
            return v;
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});