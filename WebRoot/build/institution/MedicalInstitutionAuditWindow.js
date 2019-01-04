Ext.define('build.institution.MedicalInstitutionAuditWindow', {
    extend: 'Ext.window.Window',
    auditType: 1,//1市级审核 2省级审核
    callBack: null,
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        me.panel = Ext.create('build.institution.MedicalInstitutionAuditPanel', {
            auditType: me.auditType,
            callBack: function () {
                me.callBack();
                me.hide();
            },
            autoHeight: true
        });
        Ext.apply(this, {
            title: '机构账户审核',
            width: 700,
            height: 630,
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
    hideBtn: function () {
        this.panel.hideBtn();
    },
    showBtn: function () {
        this.panel.showBtn();
    },
    loadData: function (fid) {
        var me = this;
        me.panel.loadData(fid);
    }
});