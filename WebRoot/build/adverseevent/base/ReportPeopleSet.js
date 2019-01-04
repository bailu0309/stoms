/**
 * 报告人
 */
Ext.define('build.adverseevent.base.ReportPeopleSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">事件报告人服务岗位</b>',
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
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.reportpost, me.relationship]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.happened]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: 1, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.reason]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.phone, me.contactsemail]
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

        me.reportpost = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '事件报告人服务岗位',
            name: 'iservicep',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['I-serviceP']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.relationship = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '相互关系',
            name: 'iinterrelation',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['I-interrelation']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        me.happened = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '请您简单叙述事件或错误的经过',
            name: 'igoby'
        });
        me.reason = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '您认为发生本次事件或错误的可能原因',
            name: 'icause'
        });

        me.phone = Ext.create('Ext.form.field.Text', {
            name: 'isphone',
            fieldLabel: '联系电话',
            regex: /^[1-9]\d{10}$/,
            regexText: '请输入正确的联系电话'
        });

        me.contactsemail = Ext.create('Ext.form.field.Text', {
            fieldLabel: '邮箱',
            vtype: 'email',
            name: 'isemail'
        });

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});