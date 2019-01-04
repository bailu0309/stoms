Ext.define('build.statistics.diedaozhuichuangShowtjPanel', {
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
            defaults: {split: true},
            items: [me.queryPanel,this.gridPanel]
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
            //width:160,
            displayField: 'name',
            //labelWidth:60,
            //labelAlign:'right',
            //valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: DICT_QUERY['patienttype']
            }),
            queryMode: 'local',
            typeAhead: true
        });


        // me.atype = Ext.create('Ext.form.ComboBox', {
        //     fieldLabel: '事件类型',
        //     name: 'type',
        //     displayField: 'name',
        //     valueField: 'value',
        //     store: new Ext.data.ArrayStore({
        //         fields: ['name', 'value'],
        //         data: DICT_QUERY['adversetype']
        //     }),
        //     queryMode: 'local',
        //     typeAhead: true
        // });

        // me.problemlevel = Ext.create('Ext.form.ComboBox', {
        //     fieldLabel: '事件等级',
        //     name: 'ceventlevel',
        //     displayField: 'name',
        //     valueField: 'value',
        //     listConfig: {
        //         minWidth: 200
        //     },
        //     store: new Ext.data.ArrayStore({
        //         fields: ['name', 'value'],
        //         data: DICT_QUERY['C-event_Level']
        //     }),
        //     queryMode: 'local',
        //     typeAhead: true,
        //     listeners: {
        //         select: function (combo, record, index) {
        //         }
        //     }
        // });

        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            //labelWidth:100,
            //width:200,
            //labelAlign:'right',
            name: 'sdate',
            fieldLabel: '上报时间'
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
           // labelWidth:20,
           // width:120,
            //labelAlign:'right',
            name: 'edate',
            fieldLabel: '至'
        });


        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构名称',
            //labelWidth:100,
            //width:300,
            //labelAlign:'right',
            name: 'username',
            labelAlign: 'right'
        });

        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '质控中心',
            name: 'qccid',
            editable: false,
            //labelWidth:100,
            //width:285,
            //labelAlign:'right',
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
            fieldLabel: '发生是由',
            name: 'fst',
           // labelAlign:'right',
            //labelWidth:100,
            //width:200,
            editable: false,
            displayField: 'name',
            valueField: 'value',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['全部', '-1'], ['病人因素', '0'], ['环境因素', '1'],['服用药物因素','2']
                ]
            }),
            queryMode: 'local',
            typeAhead: true
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: ['->',{
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
            },{
                xtype:'button',
                text:'导出'
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
                items: [me.ptype, me.fst]
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
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.username]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                hidden: !PROROLE,
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.qccid]
            }]
        });

        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            //dockedItems: [this.toolBar],
            //selModel: new Ext.selection.CheckboxModel({mode: 'MULTI', allowDeselect: true}),//单选可反选
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                rowdblclick: function (ths, record, element, rowIndex, e, eOpts) {
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
            //{text: '组织机构代码', width: 120, dataIndex: 'name', hidden: false},
            {text: '&nbsp;&nbsp;&nbsp;时间', width: 80, dataIndex: 'username'},
            {
                text: '跌倒例数',
                width: 80,
                dataIndex: 'type'

            }, {
                text: '跌倒造成的伤害程度',
                //width: 1270,
                //dataIndex: 'wptype',
                dicttype: 'patienttype',
                //renderer: dictionaryRenderer,
                columns:[{
                    text: '&nbsp;'+'<br/>'+'无伤害'+'<br/>'+'&nbsp;',

                    columns:[{
                        text: '白班',
                        width: 63
                    },{
                        text: '节假日',
                        width: 65
                    },{
                        text: '夜班',
                        width: 63
                    },{
                        text: '总计',
                        width: 63
                    }]
                },{
                    text: '严重度1级'+'<br/>'+'<br/>'+'(轻度)',

                    columns:[{
                        text: '白班',
                        width: 63
                    },{
                        text: '节假日',
                        width: 65
                    },{
                        text: '夜班',
                        width: 63
                    },{
                        text: '总计',
                        width: 63
                    }]
                },{
                    text: '严重度2级'+'<br/>'+'<br/>'+'(中度)',

                    columns:[{
                        text: '白班',
                        width: 63
                    },{
                        text: '节假日',
                        width: 65
                    },{
                        text: '夜班',
                        width: 63
                    },{
                        text: '总计',
                        width: 63
                    }]
                },{
                    text: '严重度3级'+'<br/>'+'<br/>'+'(重度)',

                    columns:[{
                        text: '白班',
                        width: 63
                    },{
                        text: '节假日',
                        width: 65
                    },{
                        text: '夜班',
                        width: 63
                    },{
                        text: '总计',
                        width: 63
                    }]
                },{
                    text: '&nbsp;'+'<br/>'+'死亡'+'<br />'+'&nbsp;',

                    columns:[{
                        text: '白班',
                        width: 63
                    },{
                        text: '节假日',
                        width: 65
                    },{
                        text: '夜班',
                        width: 63
                    },{
                        text: '总计',
                        width: 63
                    }]
                }]
            }, {
                text: '&nbsp;&nbsp;&nbsp;合计',
                width: 80,
                dataIndex: 'nurseclass',
                dicttype: 'nurseclass'
            }
            // {
            //     text: '事件等级',
            //     width: 200,
            //     dataIndex: 'ceventlevel',
            //     dicttype: 'C-event_Level',
            //     renderer: dictionaryRenderer
            // },
            // {text: '上报时间', width: 180, dataIndex: 'createtime'},
            // {text: '上报人', width: 150, dataIndex: 'contactsemail', hidden: true},
            // {
            //     text: '上报状态', width: 100, dataIndex: 'fst',
            //     renderer: function (v) {
            //         if (v == 1) {
            //             return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/shtg.png title='已上报'> 已上报</img>";
            //         } else {
            //             return "<img style='vertical-align: middle' src=" + globalCtx + "/images/icons/unaudit.png title='未上报'> 未上报</img>";
            //         }
            //     }
            // }
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        //var params = me.queryPanel.getForm().getValues();

        //Ext.apply(this.store.proxy.extraParams, params);

        this.store.load();
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});