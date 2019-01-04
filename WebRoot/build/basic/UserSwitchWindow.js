Ext.define('build.basic.UserSwitchWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        me.panel = Ext.create('build.basic.UserSwitchPanel', {});
        Ext.apply(this, {
            title: '选择用户',
            width: 600,
            height: 300,
            layout: 'fit',
            closeAction: 'hide',
            modal: true,
            resizable: false,
            maximizable: false,
            constrain: true,
            plain: true,
            border: false,
            items: [me.panel]
        });
        this.callParent();

    },
    initStore: function () {
        var me = this;
    },
    reloadDate: function () {
        var me = this;
        me.panel.gridPanelLoadData();
    }
});