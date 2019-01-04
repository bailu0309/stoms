/**
 * 当事人
 */
Ext.define('build.adverseevent.base.InvolvePeopleSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">事件当事人情况</b>',
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
                items: [me.post, me.professor]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.worklife]
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

        me.post = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '岗位',
            name: 'hjobstc',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['H-jobsTC']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.professor = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '职称',
            name: 'htitles',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['H-titleS']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.worklife = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '工作年限',
            name: 'hcareerc',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_COMBO['H-careerC']
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