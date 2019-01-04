/**
 * 预防措施
 */
Ext.define('build.adverseevent.base.PreventiveMeasureSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">您认为可以预防此类事件与错误再次发生的方法与措施</b>',
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
                items: [me.prevent]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 250, labelAlign: 'right', width: '95%'},
                items: [me.p1, me.p11, me.p2, me.p21, me.p3, me.p31, me.p4, me.p41, me.p5]
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

        me.prevent = Ext.create('Ext.form.RadioGroup', {
            columns: 3,
            name: 'gmeasure',
            defaults: {
                margin: '0 5 0 0',
                name: 'prevent'
            },
            items: [
                {boxLabel: '1-加强培训教育', inputValue: "1"},
                {boxLabel: '2-更新规章制度流程', inputValue: "2"},
                {boxLabel: '3-改变医院行政管理系统运行模式', inputValue: "3"},
                {boxLabel: '4-加强相互间的沟通', inputValue: "4"},
                {boxLabel: '5-其他可能因素', inputValue: "5"}
            ],
            listeners: {
                change: function (thiz, newValue, oldValue, eOpts) {
                    if (me.nowSelect) {
                        me.nowSelect.setHidden(true);
                        me.nowSelect.reset();
                        me.nowSelect1.setHidden(true);
                        me.nowSelect1.reset();
                    }
                    if (newValue.prevent == 1) {
                        me.nowSelect = me.p1;
                        me.nowSelect1 = me.p11;
                        me.p1.setHidden(false);
                        me.p11.setHidden(false);
                    } else if (newValue.prevent == 2) {
                        me.nowSelect = me.p2;
                        me.nowSelect1 = me.p21;
                        me.p2.setHidden(false);
                        me.p21.setHidden(false);
                    } else if (newValue.prevent == 3) {
                        me.nowSelect = me.p3;
                        me.nowSelect1 = me.p31;
                        me.p3.setHidden(false);
                        me.p31.setHidden(false);
                    } else if (newValue.prevent == 4) {
                        me.nowSelect = me.p4;
                        me.nowSelect1 = me.p41;
                        me.p41.setHidden(false);
                    } else if (newValue.prevent == 5) {
                        me.nowSelect = me.p5;
                        me.p5.setHidden(false);
                    }
                }
            }
        });

        me.p1 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '1-加强培训教育',
            hidden: true,
            name: 'gste',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-STE']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.p11 = Ext.create('Ext.form.field.Text', {
            name: 'gsteother',
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.p2 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '2-更新规章制度流程',
            hidden: true,
            name: 'gurap',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-URAP']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.p21 = Ext.create('Ext.form.field.Text', {
            name: 'gurapother',
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.p3 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '3-改变医院行政管理系统运行模式',
            hidden: true,
            name: 'gcha',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-CHA']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.p31 = Ext.create('Ext.form.field.Text', {
            name: 'gchaothr',
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.p4 = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '4-加强相互间的沟通',
            hidden: true,
            name: 'gscweo',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['G29-SCWEO']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.p41 = Ext.create('Ext.form.field.Text', {
            name: 'gscweoother',
            hidden: true,
            fieldLabel: '其他说明',
        });
        me.p5 = Ext.create('Ext.form.field.Text', {
            name: 'gother',
            hidden: true,
            fieldLabel: '5-其他可能因素',
        });

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});