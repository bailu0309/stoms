Ext.define('build.institution.MedicalInstitutionStatisPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    requires: [
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        this.initColumn();

        me.ftype = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '统计方式',
            name: 'flevel',
            labelWidth: 60,
            width: 250,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            value: 1,
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [
                    ['所属质控中心统计', '1'], ['医院等级统计', '2'], ['医院类型统计', '3']
                ]
            }),
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {

                    me.gridPanel.getColumns()[1].setText(me.ftype.getRawValue());
                    if (me.ftype.getValue() == 1) {
                        me.gridPanel.getColumns()[1].renderer = null
                    } else if (me.ftype.getValue() == 2) {
                        me.gridPanel.getColumns()[1].renderer = me.getLevelGrade;
                    } else if (me.ftype.getValue() == 3) {
                        me.gridPanel.getColumns()[1].renderer = me.getHospType;
                    }

                    me.search(me.ftype.getValue());
                }
            }
        });

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.ftype, '-', {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: function () {
                    me.search();
                }
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'download',
                scope: this,
                handler: me.exportStatis
            }]
        });


        me.gridPanel = Ext.create('Ext.grid.Panel', {
            width: '40%',
            region: 'center',
            border: false,
            forceFit: true,
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.gridStore,
            columns: this.gridColumns,
            tbar: this.toolBar
        });

        me.charId = Ext.id();

        me.charPanel = Ext.create('Ext.panel.Panel', {
            width: 800,
            collapsible: true,
            region: 'east',
            border: true,
            dockedItems: [me.gridToolBar],
            html: '<div style="width: 780px;height: 100%" id="' + me.charId + '"></div>'
        });


        Ext.apply(this, {
            layout: 'border',
            border: true,
            items: [me.gridPanel, me.charPanel]
        });
        this.callParent();
    },
    initStore: function () {
        var me = this;

        me.gridStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AccountController/statisQccUsers.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var me = this;
        this.gridColumns = [
            new Ext.grid.RowNumberer({width: 40}),
            {text: '所属指控中心', align: 'center', width: 200, dataIndex: 'name'},
            {text: '数量', align: 'center', width: 100, dataIndex: 'n1'},
            {text: '占比（%）', align: 'center', width: 100, dataIndex: 's1'}
        ];
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
        this.search(1);
    },
    search: function (type) {
        var me = this;
        if (Ext.isEmpty(type)) {
            type = me.ftype.getValue();
        }
        var params = {
            type: type
        };
        Ext.apply(this.gridStore.proxy.extraParams, params);
        this.gridStore.loadPage(1);

        this.loadData(type);
    },
    getLevelGrade: function (v) {
        if (!Ext.isEmpty(v)) {
            var s1 = v.substring(0, 1);
            var s2 = v.substring(1, 2);
            var v1 = DICTIONARY['organization-level'][s1];
            var v2 = DICTIONARY['Agencies-grades'][s2];

            return v1 + v2;
        }
        return '总计';
    },
    getHospType: function (v) {
        if (!Ext.isEmpty(v)) {
            return DICTIONARY['A-hCategory'][v];
        }
        return '总计';
    },
    loadData: function (id, name) {
        var me = this;

        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/AccountController/statisQccUsersChar.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: {
                type: id
            },
            scope: this,
            success: function (resp) {
                var strResult = resp.responseText;
                var obj = Ext.util.JSON.decode(strResult);

                var names = [];

                for (var i = 0; i < obj[0].length; i++) {
                    if (id == 1) {
                        name = obj[0][i].name.substring(0, 2);
                        names.push([name]);
                    } else if (id == 2) {
                        names.push([me.getLevelGrade(obj[0][i].name)]);
                    } else if (id == 3) {
                        names.push([me.getHospType(obj[0][i].name)]);
                    }
                }

                var chart = echarts.init(document.getElementById(me.charId), 'walden');

                option = {
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // data: ['数量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            // dataZoom: {
                            //     yAxisIndex: 'none'
                            // },
                            // dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: names
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: {
                        name: '数量',
                        type: 'line',
                        data: obj[1],
                        itemStyle: {normal: {label: {show: true}}}
                    }
                };

                window.onresize = function () {
                    chart.resize();
                };
                chart.setOption(option);

            },
            failure: function (response, opts) {
                App.getApplication().msg('出错', '统计加载出错', 2000);
            }
        });
    },
    exportStatis: function () {

    }
});
