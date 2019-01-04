/**
 * 涉及药品和器材
 */
Ext.define('build.adverseevent.base.InvolveDrugSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">涉及药品及器材的名称(可选项)</b>',
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
                items: [me.commonname, me.tradename]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.company]
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
        me.commonname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '通用名称（选填）',
            name: 'ecname'
        });
        me.tradename = Ext.create('Ext.form.field.Text', {
            fieldLabel: '商品名称（选填）',
            name: 'epname'
        });
        me.company = Ext.create('Ext.form.field.Text', {
            fieldLabel: '生产厂商（选填）',
            name: 'emr'
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});