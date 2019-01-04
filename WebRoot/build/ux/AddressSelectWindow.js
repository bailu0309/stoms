Ext.define('build.ux.AddressSelectWindow', {
    extend: 'Ext.window.Window',
    address: null,
    addresscode: null,
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        me.panel = Ext.create('build.ux.AddressSelectPanel', {});
        Ext.apply(this, {
            autoHeight: true,
            width: 400,
            title: '设置地址',
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide',
            items: [this.panel],
            buttonAlign: 'center',
            buttons: [{
                text: '保存',
                scope: this,
                iconCls: 'confirm',
                handler: function () {
                    me.address.setValue(me.panel.getRawValue());
                    me.addresscode.setValue(me.panel.getValue());
                    me.panel.reset();
                    me.close();
                }
            }, {
                text: '取消',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    me.panel.reset();
                    me.close();
                }
            }]
        });
        this.callParent();

    },
    initStore: function () {
        var me = this;
    },
    reloadDate: function () {
        var me = this;
        me.panel.reset();
    }
});