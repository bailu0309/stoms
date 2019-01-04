Ext.define('build.audit.AuditFlowShowPanel', {
    extend: 'Ext.panel.Panel',
    title: '审核历史',
    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel',
        'build.util.selector.RoleSelectorWindow'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        this.initColumn();
        this.initBigParts();
        Ext.apply(this, {
            layout: 'border',
            items: [this.gridPanel]
        });
        this.callParent();
    },
    initBigParts: function () {
        var me = this;
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            forceFit: true,
            reserveScrollbar: true,
            // selModel: new Ext.selection.CheckboxModel({mode: 'SINGLE', allowDeselect: true}),//单选可反选
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns
        });
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AuditRecordController/queryAuditInfo.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '审核人', width: 180, dataIndex: 'audituname', renderer: qtipRenderers},
            {text: '审核时间', width: 110, dataIndex: 'audittime'},
            {text: '审核类型', width: 90, dataIndex: 'audittype', dicttype: 'audittype', renderer: dictionaryRenderer},
            {text: '审核状态', width: 90, dataIndex: 'state', renderer: auditStateRenderers},
            {text: '审核意见', width: 150, dataIndex: 'fcomment', renderer: breakRenderers}
        ]
    },
    search: function () {
        this.store.load();
    },
    reload: function (fid, callBack) {
        var me = this;
        if (!Ext.isEmpty(fid)) {
            me.store.load({
                params: {"miaid": fid},
                callback: function (records) {
                    if (callBack) {
                        callBack();
                    }
                }
            });
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});