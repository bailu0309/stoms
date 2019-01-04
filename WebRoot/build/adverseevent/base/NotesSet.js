/**
 * 备注说明
 */
Ext.define('build.adverseevent.base.NotesSet', {
    extend: 'Ext.form.FieldSet',
    width: 1200,
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">备注说明</b>',
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
                defaults: {columnWidth: 1, labelWidth: 170, labelAlign: 'right', width: '95%'},
                items: [me.notes]
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

        me.notes = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: '事件处理措施及患者预后',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'notes'
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});