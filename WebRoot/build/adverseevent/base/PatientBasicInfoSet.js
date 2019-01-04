Ext.define('build.adverseevent.base.PatientBasicInfoSet', {
    extend: 'Ext.form.FieldSet',
    width: 1200,
    initComponent: function () {
        var me = this;

        me.departStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/DepartController/queryDepart.sdo',
                timeout: 90000,
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">患者基本信息</b>',
            width: me.width,
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
                defaults: {columnWidth: .33, labelWidth: 120, labelAlign: 'right', width: '95%'},
                items: [me.fid, me.ptype, me.inhospno, me.nurseclass]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .33, labelWidth: 120, labelAlign: 'right', width: '95%'},
                items: [me.sex, {
                    border: false,
                    layout: 'column',
                    defaults: {labelWidth: 120, labelAlign: 'right', width: '95%'},
                    items: [me.age, me.labyear, me.agemonth, me.labmongh, me.ageday, me.labday]
                }, me.diseasename]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .33, labelWidth: 120, labelAlign: 'right', width: '95%'},
                items: [me.indepartment, me.admissiontime]
            }]
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

        me.fid = Ext.create('Ext.form.field.Text', {
            name: 'fid',
            hidden: true
        });

        me.ptype = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '患者类型',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'wptype',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['住院', '1'], ['门诊', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                }
            }
        });


        me.inhospno = Ext.create('Ext.form.field.Text', {
            fieldLabel: '住院/门诊号',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'wanumber'
        });

        me.inhospnums = Ext.create('Ext.form.field.Number', {
            name: 'wnumber',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            minValue: 0,
            allowDecimals: false,
            fieldLabel: '住院次数',
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER && me.a1.isValid()) {
                    }
                }
            }
        });
        // me.name = Ext.create('Ext.form.field.Text', {
        //     fieldLabel: '姓名',
        //     name: 'wname'
        // });

        me.sex = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '性别',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'wsex',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['男', '1'], ['女', '2'], ['不明', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true
        });

        me.age = Ext.create('Ext.form.field.Number', {
            fieldLabel: '年龄',
            columnWidth: 1,
            hideTrigger: true,
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            minValue: 0,
            maxValue: 150,
            allowDecimals: false,
            name: 'wage',
            listeners: {
                change: function (a) {
                    if (0 == a.value) {
                        me.age.columnWidth = 0.64;
                        me.agemonth.setHidden(false);
                        me.ageday.setHidden(false);

                        me.labyear.setHidden(false);
                        me.labmongh.setHidden(false);
                        me.labday.setHidden(false);
                    } else {
                        me.age.columnWidth = 1;
                        me.agemonth.setHidden(true);
                        me.ageday.setHidden(true);

                        me.agemonth.setValue();
                        me.ageday.setValue();

                        me.labyear.setHidden(true);
                        me.labmongh.setHidden(true);
                        me.labday.setHidden(true);
                    }
                }
            }
        });

        me.agemonth = Ext.create('Ext.form.field.Number', {
            fieldLabel: '月',
            hideLabel: true,
            hideTrigger: true,
            columnWidth: .15,
            hidden: true,
            minValue: 0,
            maxValue: 11,
            allowDecimals: false,
            name: 'wmonth'
        });
        me.ageday = Ext.create('Ext.form.field.Number', {
            fieldLabel: '天',
            hideLabel: true,
            hideTrigger: true,
            columnWidth: .15,
            hidden: true,
            minValue: 0,
            maxValue: 31,
            allowDecimals: false,
            name: 'wday'
        });
        me.labday = Ext.create('Ext.form.field.Display', {
            hidden: true,
            labelStyle: 'font-size:10px',
            fieldLabel: '天',
            labelSeparator: '',
            width: 20,
            labelWidth: 20
        });
        me.labmongh = Ext.create('Ext.form.field.Display', {
            labelStyle: 'font-size:10px',
            hidden: true,
            fieldLabel: '月',
            labelSeparator: '',
            width: 20,
            labelWidth: 20
        });
        me.labyear = Ext.create('Ext.form.field.Display', {
            hidden: true,
            labelStyle: 'font-size:10px',
            fieldLabel: '岁',
            labelSeparator: '',
            width: 20,
            labelWidth: 20
        });

        me.diseasename = Ext.create('Ext.form.field.Text', {
            fieldLabel: '疾病名称',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'wdname'
        });
        // me.doctorname = Ext.create('Ext.form.field.Text', {
        //     fieldLabel: '主治医生',
        //     name: 'wvstaff'
        // });
        // me.indepartment = Ext.create('Ext.form.field.Text', {
        //     fieldLabel: '入院/门诊科室',
        //     beforeLabelTextTpl: redTpl,
        //     allowBlank: false,
        //     name: 'waoffice'
        // });
        me.indepartment = Ext.create('Ext.form.field.ComboBox', {
            name: 'waoffice',
            fieldLabel: '入院/门诊科室',
            beforeLabelTextTpl: redTpl,
            anyMatch: true,
            matchFieldWidth: true,//此处要有
            allowBlank: false,
            typeAhead: true,
            triggerAction: 'all',
            store: me.departStore,
            queryMode: 'local',
            displayField: 'fdesc',
            valueField: 'foffn',
            listeners: {
                blur: function (a) {
                    if (a.rawValue == a.value) {
                        me.indepartment.reset();
                    }
                }
            }
        });

        this.admissiontime = Ext.create('Ext.form.field.Date', {
            fieldLabel: '入院/门诊时间',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            format: 'Y-m-d',
            maxValue: new Date(),
            name: 'wadate'
        });

        me.nurseclass = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '护士班次',
            allowBlank: false,
            beforeLabelTextTpl: redTpl,
            name: 'nurseclass',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['白班', '1'], ['夜班', '2'], ['节假日', '3']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {

                }
            }
        })
        // this.dischargetime = Ext.create('Ext.form.field.Date', {
        //     fieldLabel: '出院时间',
        //     format: 'Y-m-d',
        //     name: 'wldate'
        // });
        // me.bednum = Ext.create('Ext.form.field.Text', {
        //     fieldLabel: '床位号',
        //     name: 'wbedno'
        // });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});