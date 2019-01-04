Ext.define('build.audit.CityAuditPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        this.initColumn();
        this.initBigParts();
        Ext.apply(this, {
            layout: 'border',
            border: true,
            items: [this.gridPanel, me.auditFlowPanel]
        });

        me.search();
        this.callParent();
    },
    initEvents: function () {
    },
    initMethod: function () {
    },
    initBigParts: function () {
        var me = this;

        me.name = Ext.create('Ext.form.field.Text', {
                fieldLabel: '关键字',
                labelAlign: 'right',
                labelWidth: 60
            }
        );
        me.citystate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '市级审核状态',
            editable: false,
            labelWidth: 100,
            width: 200,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['全部', ''], ['未审', '0'], ['通过', '1'], ['未过', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.provstate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '省级审核状态',
            editable: false,
            labelWidth: 100,
            width: 200,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['全部', ''], ['未审', '0'], ['通过', '1'], ['未过', '2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.name, me.citystate, me.provstate, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: this.search
            }, {
                xtype: 'button',
                text: '查看',
                iconCls: 'preview',
                scope: this,
                handler: this.showinfo
            }, {
                xtype: 'button',
                text: '审核',
                iconCls: 'audit',
                scope: this,
                handler: this.audit
            }]
        });
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            // forceFit: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            tbar: this.toolBar,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.fid = record.get('fid');
                    me.auditFlowPanel.reload(me.fid);
                    me.auditFlowPanel.expand();
                }
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: this.store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        me.auditWin = Ext.create('build.institution.MedicalInstitutionAuditWindow', {
            callBack: function () {
                me.search();
            }
        });
        me.auditFlowPanel = Ext.create('build.audit.AuditFlowShowPanel', {
            region: 'east',
            border: true,
            width: 610,
            collapsed: true,
            collapsible: true,
            listeners: {
                beforeexpand: function () {
                    var r = me.gridPanel.getSelectionModel().getSelection();
                    if (r.length === 1) {
                        me.fid = r[0].get('fid');
                        me.auditFlowPanel.reload(me.fid);
                    }
                }
            }
        });
    },
    initStore: function () {
        this.store = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            // autoLoad: true,
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AccountController/queryCityMedicalInstitutionApply.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '组织机构代码', width: 120, dataIndex: 'orgcode'},
            {text: '医疗机构名称', width: 270, dataIndex: 'name', renderer: qtipRenderers},
            {
                text: '医院级别',
                width: 100,
                dataIndex: 'flevel',
                dicttype: 'organization-level',
                renderer: dictionaryRenderer
            },
            {text: '医院等次', width: 100, dataIndex: 'fgrade', dicttype: 'Agencies-grades', renderer: dictionaryRenderer},
            {text: '申请时间', width: 120, dataIndex: 'ftime'},
            {text: '联系人', width: 80, dataIndex: 'contacts'},
            {text: '联系电话', width: 120, dataIndex: 'contactsphone'},
            {text: '联系邮箱', width: 150, dataIndex: 'contactsemail'},
            {text: '市级审核', width: 80, dataIndex: 'citystate', renderer: auditStateRenderers},
            {text: '市级意见', width: 150, dataIndex: 'citycomment'},
            {text: '省级审核', width: 80, dataIndex: 'provstate', renderer: auditStateRenderers},
            {text: '省级意见', width: 150, dataIndex: 'provcomment'}
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;
        this.store.load({
            params: {
                name: me.name.getValue(),
                citystate: me.citystate.getValue(),
                provstate: me.provstate.getValue()
            }
        });
    },
    audit: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length === 1) {
            if (r[0].get('citystate') == '0') {
                me.auditWin.loadData(r[0].get('fid'));
                me.auditWin.show();
                me.auditWin.showBtn();
            } else {
                App.getApplication().msg('提示', '已审核完成，无法重复审核！', 2000);
            }
        }
    },
    showinfo: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length === 1) {
            me.auditWin.loadData(r[0].get('fid'));
            me.auditWin.show();
            me.auditWin.hideBtn();
        }
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});