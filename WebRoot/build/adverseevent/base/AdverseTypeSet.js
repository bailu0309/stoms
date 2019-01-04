/**
 * 类别情况
 */
Ext.define('build.adverseevent.base.AdverseTypeSet', {
    extend: 'Ext.form.FieldSet',
    width: 1200,
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">所报告不良事件的类别及情况</b>',
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
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.problemdimensions, me.problemlevel]
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

        me.problemdimensions = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '严重程度',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            name: 'cooseverity',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['C-ooSeverity']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                    var v = record.get('value');
                    if (v == 1) {
                        me.problemlevel.setValue(4);
                    } else if (v == 2 || v == 3 || v == 4) {
                        me.problemlevel.setValue(3);
                    } else if (v == 5 || v == 6 || v == 7 || v == 8) {
                        me.problemlevel.setValue(2);
                    } else if (v == 9) {
                        me.problemlevel.setValue(1);
                    } else if (v == 99) {
                        me.problemlevel.setValue(99);
                    }
                }
            }
        });
        me.problemlevel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '事件等级',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            readOnly: true,
            name: 'ceventlevel',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['C-event_Level']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});