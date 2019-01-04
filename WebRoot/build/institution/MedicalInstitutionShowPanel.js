Ext.define('build.institution.MedicalInstitutionShowPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
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
        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                xtype: 'textfield',
                fieldLabel: '关键字',
                labelAlign: 'right',
                labelWidth: 60,
                name: 'name',
                listeners: {}
            }, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.search
            }, {
                xtype: 'button',
                text: '审核',
                iconCls: 'search',
                scope: this,
                handler: this.audit
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            forceFit: true,
            reserveScrollbar: true,
            selModel: new Ext.selection.CheckboxModel({mode: 'SINGLE', allowDeselect: true}),//单选可反选
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            tbar: this.toolBar,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: this.store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.auditWin = Ext.create('build.institution.MedicalInstitutionAuditWindow', {});

    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AccountController/queryMedicalInstitutionApply.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '医疗机构名称', width: 300, dataIndex: 'name', renderer: qtipRenderers},
            {text: '医院等级', width: 200, dataIndex: 'flevel', dicttype: 'organization-level', renderer: dictionaryRenderer},
            {text: '组织机构代码', width: 200, dataIndex: 'orgcode'},
            {text: '申请时间', width: 110, dataIndex: 'ftime'},
            {text: '联系人', width: 110, dataIndex: 'contacts'},
            {text: '联系电话', width: 110, dataIndex: 'contactsphone'},
            {text: '联系邮箱', width: 150, dataIndex: 'contactsemail'},
            {text: '市级审核', width: 150, dataIndex: 'citystate', renderer: auditStateRenderers},
            {text: '市级意见', width: 150, dataIndex: 'citycomment'},
            {text: '省级审核', width: 150, dataIndex: 'provstate', renderer: auditStateRenderers},
            {text: '省级意见', width: 150, dataIndex: 'provcomment'}
        ]
    },
    search: function () {
        this.store.load();
    },
    audit: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length === 1) {
            me.auditWin.loadData(r[0].get('fid'));
            me.auditWin.show();
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});