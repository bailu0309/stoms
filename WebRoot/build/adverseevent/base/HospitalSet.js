/**
 * 医院信息
 */
Ext.define('build.adverseevent.base.HospitalSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">医院信息</b>',
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
                items: [me.hosptype, me.affiliation, me.hosplevel, me.ownership, me.province]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.hosplevel, me.ownership]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.province]
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

        me.hosptype = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院类型',
            name: 'ahcategory',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['A-hCategory']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.affiliation = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '隶属关系',
            name: 'amembership',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['A-membership']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.hosplevel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '医院等级',
            name: 'ahlevel',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['A-hLevel']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.ownership = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所有制',
            name: 'aownership',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['A-ownership']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.province = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '省别',
            name: 'aprovince',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['A-Province']
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