Ext.define('build.institution.MedicalInstitutionApplyWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        me.panel = Ext.create('build.institution.MedicalInstitutionApplyPanel', {});
        Ext.apply(this, {
            title: '机构账户申请',
            width: 700,
            height: 400,
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
        me.panel.reset();
    }
});