Ext.define('build.adverseevent.AdverseShowPanel', {
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
        me.showType = 1;
        this.initStore();
        this.initColumn();
        this.initBigParts();
        Ext.apply(this, {
            layout: 'border',
            border: true,
            defaults: {split: true},
            items: [me.queryPanel, this.gridPanel, me.accidentPanel, me.pressPanel, me.falldownPanel, me.npExtPanel, me.drugWrongPanel]
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

        me.ptype = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '患者类型',
            name: 'wptype',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['patienttype']
            }),
            queryMode: 'local',
            typeAhead: true
        });
        me.nurseclass = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '护士班次',
            name: 'nurseclass',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['nurseclass']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        me.cooseverity = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '严重程度',
            name: 'cooseverity',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['C-ooSeverity']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {}
        });

        me.atype = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '事件类型',
            name: 'type',
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['adversetype']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {}
        });

        me.problemlevel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '事件等级',
            name: 'ceventlevel',
            displayField: 'name',
            valueField: 'value',
            listConfig: {
                minWidth: 200
            },
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['C-event_Level']
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });

        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'sdate',
            fieldLabel: '上报时间'
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'edate',
            fieldLabel: '至'
        });
        this.startdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'startdate',
            fieldLabel: '发生时间'
        });
        this.enddate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'enddate',
            fieldLabel: '至'
        });

        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构名称',
            name: 'username',
            labelAlign: 'right'
        });

        this.name = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构编码',
            hidden: true,
            name: 'name',
            labelAlign: 'right'
        });

        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '质控中心',
            name: 'qccid',
            editable: false,
            displayField: 'username',
            valueField: 'name',
            store: me.qccStore,
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                }
            }
        });
        me.fst = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '上报状态',
            name: 'fst',
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['全部', ''], ['已上报', '1'], ['未上报', '0']
                ]
            }),
            queryMode: 'local',
            typeAhead: true
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: ['->', {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: function () {
                    me.search();
                }
            }, {
                xtype: 'button',
                text: '清空',
                iconCls: 'cancel',
                scope: this,
                handler: function () {
                    me.queryPanel.getForm().reset();
                }
            }, {
                xtype: 'button',
                text: '上报',
                hidden: !HOSPROLE,
                iconCls: 'up',
                scope: this,
                handler: function () {
                    me.upload();
                }
            }, {
                xtype: 'button',
                text: '删除',
                hidden: !HOSPROLE,
                iconCls: 'delete',
                scope: this,
                handler: function () {
                    me.del();
                    // me.upload();
                }
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'excel',
                scope: this,
                handler: function () {
                    me.exportData();
                }
            }]
        });

        me.queryPanel = Ext.create('Ext.form.Panel', {
            frame: false,
            border: false,
            collapsible: true,
            dockedItems: [this.toolBar],
            title: '查询条件',
            layout: 'column',
            region: 'west',
            width: 360,
            defaults: {bodyStyle: 'padding:2px', border: false},
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .49, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.ptype, me.nurseclass]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.atype]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.cooseverity]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.problemlevel]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .49, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.sdate, me.edate]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .49, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.startdate, me.enddate]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.username, me.name]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                hidden: !PROROLE,
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.qccid]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                hidden: !HOSPROLE,
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.fst]
            }]
        });
        me.spanel = null;
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            selModel: new Ext.selection.CheckboxModel({mode: 'MULTI', allowDeselect: true}),//单选可反选
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
                    me.fid = record.get('fid');
                    me.type = record.get('type');


                    if (me.spanel) {
                        me.spanel.setHidden(true);
                        me.spanel.hide();
                    }
                    if (me.type == '1') {
                        me.spanel = me.pressPanel;
                    } else if (me.type == '2') {
                        me.spanel = me.falldownPanel;
                    } else if (me.type == '3') {
                        me.spanel = me.accidentPanel;
                    } else if (me.type == '4') {
                        me.spanel = me.npExtPanel;
                    } else if (me.type == '5') {
                        me.spanel = me.drugWrongPanel;
                    }
                    me.spanel.setHidden(false);
                    me.spanel.loadData(me.fid, me.type);
                    me.spanel.expand(false);

                    if (me.showType == 2) {
                        me.adverShowWin = Ext.create('Ext.window.Window', {
                            title: '',
                            header: false,
                            width: 1020,
                            height: 700,
                            bodyPadding: 5,
                            modal: true,
                            frame: true,
                            closeAction: 'hide',
                            items: [me.spanel],
                            buttonAlign: 'center',
                            buttons: [{
                                text: '关闭',
                                scope: this,
                                iconCls: 'cancel',
                                handler: function () {
                                    me.adverShowWin.hide();
                                }
                            }]

                        });
                        me.adverShowWin.show();
                    }
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


        me.pressPanel = Ext.create('build.adverseevent.PressureSoresPanel', {
            height: 700,
            region: 'east',
            hideSave: true,
            hidden: true,
            title: '压疮事件',
            border: true,
            width: 1000,
            collapsed: true,
            collapsible: true,
            callBack: function () {
                me.store.reload();
            }
        });

        me.falldownPanel = Ext.create('build.adverseevent.FallDownBedPanel', {
            height: 700,
            region: 'east',
            hidden: true,
            title: '跌倒/坠床事件',
            border: true,
            width: 1000,
            collapsed: true,
            collapsible: true,
            callBack: function () {
                me.store.reload();
            }
        });


        me.accidentPanel = Ext.create('build.adverseevent.SecurityAccidentPanel', {
            height: 700,
            region: 'east',
            hidden: true,
            title: '安全管理及意外伤害事件',
            border: true,
            width: 1000,
            collapsed: true,
            collapsible: true,
            callBack: function () {
                me.store.reload();
            }
        });

        me.npExtPanel = Ext.create('build.adverseevent.NoPlanExtubationPanel', {
            height: 700,
            region: 'east',
            title: '非计划拔管事件',
            hidden: true,
            border: true,
            width: 1000,
            collapsed: true,
            collapsible: true,
            callBack: function () {
                me.store.reload();
            }
        });
        me.drugWrongPanel = Ext.create('build.adverseevent.DrugWrongPanel', {
            height: 700,
            region: 'east',
            title: '给药错误事件',
            hidden: true,
            border: true,
            width: 1000,
            collapsed: true,
            collapsible: true,
            callBack: function () {
                me.store.reload();
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
                url: globalCtx + '/AdverBaseController/queryAdverBase.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.qccStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/listQcc.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        this.columns = [
            {text: '组织机构代码', width: 120, dataIndex: 'name', hidden: true},
            {text: '医疗机构名称', width: 200, dataIndex: 'username', renderer: qtipRenderers},
            {
                text: '不良事件类型',
                width: 160,
                dataIndex: 'type',
                dicttype: 'adversetype',
                renderer: dictionaryRenderer
            }, {
                text: '上报状态', width: 100, dataIndex: 'fst',
                renderer: function (v) {
                    if (v == 1) {
                        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shtg.png title='已上报'> 已上报</img>";
                    } else {
                        return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/unaudit.png title='未上报'> 未上报</img>";
                    }
                }
            }, {
                text: '患者类型',
                width: 80,
                dataIndex: 'wptype',
                dicttype: 'patienttype',
                renderer: dictionaryRenderer
            }, {
                text: '护士班次',
                width: 80,
                dataIndex: 'nurseclass',
                dicttype: 'nurseclass',
                renderer: dictionaryRenderer
            }, {
                text: '严重程度',
                width: 200,
                dataIndex: 'cooseverity',
                dicttype: 'C-ooSeverity',
                renderer: qtipDictionaryRenderer
            }, {
                text: '事件等级',
                width: 200,
                dataIndex: 'ceventlevel',
                dicttype: 'C-event_Level',
                renderer: qtipDictionaryRenderer
            },
            {text: '上报时间', width: 180, dataIndex: 'createtime'},
            {text: '发生时间', width: 180, dataIndex: 'starttime'},
            {text: '上报人', width: 150, dataIndex: 'contactsemail', hidden: true}
        ]
    },
    upload: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length > 0) {
            var flag = false;
            var fids = '';
            Ext.Array.forEach(r, function (data) {
                if (data.get('fst') == '1') {
                    flag = true;
                }
                fids += data.get('fid') + ",";
            });
            if (flag) {
                Ext.Msg.alert("提示", "选择的数据中包含已上报数据，请重新选择后上报！");
                return;
            }
            fids = fids.substring(0, fids.length - 1);
            Ext.MessageBox.confirm('提示', '确定上报所选数据？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    method: 'post',
                    url: globalCtx + '/AdverBaseController/upLoadAdverBase.sdo',
                    params: {fid: fids},
                    waitTitle: '请稍等片刻',
                    waitMsg: '正在上报...',
                    scope: this,
                    success: function (resp) {
                        var obj = Ext.util.JSON.decode(resp.responseText);
                        if (obj.success == true) {
                            App.getApplication().msg('提示', '上报成功!');
                        } else {
                            Ext.Msg.alert("提示", "错误信息:" + obj.info);
                        }
                        me.search();
                    },
                    failure: function (response, opts) {
                        this.exception();
                    }
                });
            });
        } else {
            App.getApplication().msg('提示', '请选择一条数据进行上报！', 2000);
        }
    },
    del: function () {
        var me = this;
        var r = me.gridPanel.getSelectionModel().getSelection();
        if (r.length > 0) {
            var flag = false;
            var fids = '';
            Ext.Array.forEach(r, function (data) {
                if (data.get('fst') == '1') {
                    flag = true;
                }
                fids += data.get('fid') + ",";
            });
            if (flag) {
                Ext.Msg.alert("提示", "选择的数据中包含已上报数据，无法删除！");
                return;
            }
            fids = fids.substring(0, fids.length - 1);
            Ext.MessageBox.confirm('提示', '删除数据后将无法恢复，是否删除所选数据？', function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    method: 'post',
                    url: globalCtx + '/AdverBaseController/delAdverBase.sdo',
                    params: {fid: fids},
                    waitTitle: '请稍等片刻',
                    waitMsg: '正在删除...',
                    scope: this,
                    success: function (resp) {
                        var obj = Ext.util.JSON.decode(resp.responseText);
                        if (obj.success == true) {
                            App.getApplication().msg('提示', '删除成功!');
                        } else {
                            Ext.Msg.alert("提示", "错误信息:" + obj.info);
                        }
                        me.search();
                    },
                    failure: function (response, opts) {
                        this.exception();
                    }
                });
            });
        } else {
            App.getApplication().msg('提示', '请选择一条数据进行删除！', 2000);
        }
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        var params = me.queryPanel.getForm().getValues();

        Ext.apply(this.store.proxy.extraParams, params);

        this.store.load();
    },
    loadData: function (sdate, edate, orgcode, type, qccid) {
        var me = this;
        me.sdate.setValue(sdate);
        me.edate.setValue(edate);
        me.atype.setValue(type);
        me.name.setValue(orgcode);
        me.qccid.setValue(qccid);
        me.fst.setValue(1);
        me.showType = 2;
        me.queryPanel.setHidden(true);
        if (me.spanel) {
            me.spanel.setTitle();
        }
        me.search();
    },
    /**
     *    params = {
            sdate: '',//上报开始时间
            edate: '',//上报结束时间
            atype: '',//不良事件类型
            name: '',//医院编码
            qccid: '',//质控中心
            us: '',
            sr: '',
            dsm1ai: '',
            ftype: '',
            fylg: '',
            identification: '',
            drugname: '',
            drugdose: '',
            drugconcentration: '',
            drugtime: '',
            drugroute: '',
            drugeffect: '',
            drugquality: '',
            fst: '1'
        };
     */
    setQueryParams: function (params) {
        var me = this;

        me.showType = 2;
        me.queryPanel.setHidden(true);
        if (me.spanel) {
            me.spanel.setTitle();
        }
        me.store.currentPage = 1;
        Ext.apply(this.store.proxy.extraParams, params);
        this.store.load();
    },
    exportData: function () {
        var me = this;
        var params = me.queryPanel.getForm().getValues();

        var link = Utils.createURL(globalCtx + '/ExportController/exportAdverse.sdo' + '?1=1', params);

        window.open(link);

    },

    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});