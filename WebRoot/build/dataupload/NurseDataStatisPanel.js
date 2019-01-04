Ext.define('build.dataupload.NurseDataStatisPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    initComponent: function () {
        var me = this;
        Ext.tip.QuickTipManager.init();
        this.initStore();
        this.initColumn();

        this.treePanel = Ext.create('Ext.tree.Panel', {
            title: '统计类别',
            collapsible: true,
            region: 'west',
            store: this.treeStore,
            autoScroll: true,  //如果超出范围带自动滚动条
            width: 300,
            split: true,
            border: false,    //显示tree side frame
            useArrows: true,
            rootVisible: false,  //是否显示根节点
            containerScroll: true,
            listeners: {
                'itemclick': function (node, event) {
                    me.typeid = event.data.id;
                    me.typename = event.data.text;
                    me.loadData(me.typeid, me.typename);
                    me.search();
                }
            }
        });

        me.qname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '关键字',
            labelWidth: 50,
            width: 140,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == e.ENTER) {

                    }
                }
            }
        });

        me.tjzq = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: '统计周期',
            labelWidth: 70,
            name: 'tjzq',
            width: 160,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            mode: 'local',
            triggerAction: 'all',
            value: '1',
            store: new Ext.data.ArrayStore({
                fields: ['name', 'value'],
                data: [['季度', '1'], ['年度', '2']]
            }),
            listeners: {
                select: function () {
                    me.search();
                }
            }
        });

        this.sdate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '统计时间',
            labelWidth: 70,
            width: 180,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: this.quaterStore,
            queryMode: 'remote',
            typeAhead: true,
            listeners: {}
        });
        this.edate = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '至',
            labelWidth: 20,
            width: 140,
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'value',
            store: this.quaterStore,
            queryMode: 'remote',
            typeAhead: true,
            listeners: {}
        });

        this.xzdq = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所属质控',
            hidden: !adminrole,
            editable: false,
            labelWidth: 70,
            width: 280,
            labelAlign: 'right',
            displayField: 'username',
            valueField: 'name',
            store: this.shiStore,
            queryMode: 'remote',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                    me.loadData(me.typeid, me.typename);
                    me.search();
                }
            }
        });


        me.gridToolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [me.sdate, me.edate, me.xzdq, {
                xtype: 'button',
                text: '查询',
                iconCls: 'search',
                scope: this,
                handler: function () {
                    me.loadData(me.typeid, me.typename);
                    me.search();

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

        me.charPanel = Ext.create('Ext.panel.Panel', {
            width: '100%',
            height: 400,
            region: 'north',
            border: true,
            dockedItems: [me.gridToolBar],
            html: '<div style="width: 100%;height: 100%;" id="ndspid"></div>'
        });

        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.gridStore,
            columns: this.gridColumns,
            listeners: {}
        });


        Ext.apply(this, {
            layout: 'border',
            border: true,
            items: [this.treePanel, {
                region: 'center',
                layout: 'border',
                items: [me.charPanel, me.gridPanel]
            }]
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
                url: globalCtx + '/NurseQualityController/nurseDataStatis.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            },
            groupField: 'name'
        });

        this.treeStore = Ext.create('Ext.data.TreeStore', {
            model: 'Model',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: globalCtx + '/NurseQualityController/queryNurseDataStatisTree.sdo'
            },
            folderSort: false
        });

        this.shiStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/basic/UserController/listAllQcc.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.quaterStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/NurseQualityController/queryQuaterNurseQuality.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.maxQuaterStore = Ext.create('Ext.data.JsonStore', {
            model: 'Model',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/NurseQualityController/queryMaxQuaterNurseQuality.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
    },
    initColumn: function () {
        var me = this;
        this.gridColumns = [
            new Ext.grid.RowNumberer({width: 40}),
            {text: '机构名称', align: 'center', width: 250, dataIndex: 'username'},
            {text: '季度', align: 'center', width: 100, dataIndex: 'ny'},
            {text: '全院床护比', align: 'center', width: 100, dataIndex: 'n1'},
            {text: '病区床护比', align: 'center', width: 100, dataIndex: 'n2'},
            {text: '白班护患比', align: 'center', width: 100, dataIndex: 'n3'},
            {text: '夜班护换比', align: 'center', width: 100, dataIndex: 'n4'},
            {text: '护理时数', align: 'center', width: 100, dataIndex: 'n5'},
            {text: '导尿管非<br/>计划拔管率', align: 'center', width: 100, dataIndex: 'n6'},
            {text: '胃管非计<br/>划拔管发<br/>生率', align: 'center', width: 100, dataIndex: 'n7'},
            {text: '中心导管<br/>非计划拔管<br/>发生率', align: 'center', width: 100, dataIndex: 'n8'},
            {text: '气管导管<br/>非计划拔管<br/>发生率', align: 'center', width: 100, dataIndex: 'n9'},
            {text: '呼吸机相<br/>关性肺炎<br/>发生率VAP', align: 'center', width: 100, dataIndex: 'n10'},
            {text: '中心导管<br/>相关血流<br/>感染发生<br/>率CRBSI', align: 'center', width: 100, dataIndex: 'n11'},
            {text: '导尿管相<br/>关性感染<br/>发生率', align: 'center', width: 100, dataIndex: 'n12'},
            {text: '院内压疮<br/>发生率', align: 'center', width: 100, dataIndex: 'n13'},
            {text: '二期及以<br/>上院内<br/>压疮发生率', align: 'center', width: 100, dataIndex: 'n14'},
            {text: '住院患者<br/>跌倒发生率', align: 'center', width: 100, dataIndex: 'n15'},
            {text: '住院患者<br/>跌倒伤害率', align: 'center', width: 100, dataIndex: 'n16'},
            {
                text: '跌倒伤害等级比例', columns: [
                {text: '一级伤害', align: 'center', width: 100, dataIndex: 'n171'},
                {text: '二级伤害', align: 'center', width: 100, dataIndex: 'n172'},
                {text: '三级伤害', align: 'center', width: 100, dataIndex: 'n173'},
                {text: '死亡', align: 'center', width: 100, dataIndex: 'n174'},
            ]
            },
            {
                text: '职称占比', columns: [
                {text: '护士', align: 'center', width: 100, dataIndex: 'n181'},
                {text: '护师', align: 'center', width: 100, dataIndex: 'n182'},
                {text: '主管护师', align: 'center', width: 100, dataIndex: 'n183'},
                {text: '副主任护师', align: 'center', width: 100, dataIndex: 'n184'},
                {text: '主任护师', align: 'center', width: 100, dataIndex: 'n185'},
            ]
            },
            {
                text: '学历占比', columns: [
                {text: '中专', align: 'center', width: 100, dataIndex: 'n191'},
                {text: '大专', align: 'center', width: 100, dataIndex: 'n192'},
                {text: '本科', align: 'center', width: 100, dataIndex: 'n193'},
                {text: '硕士', align: 'center', width: 100, dataIndex: 'n194'},
                {text: '博士', align: 'center', width: 100, dataIndex: 'n195'},
            ]
            },
            {
                text: '工作年限占比', columns: [
                {text: '＜1年', align: 'center', width: 100, dataIndex: 'n201'},
                {text: '1≤y＜2年', align: 'center', width: 100, dataIndex: 'n202'},
                {text: '2≤y＜5年', align: 'center', width: 100, dataIndex: 'n203'},
                {text: '5≤y＜10年', align: 'center', width: 100, dataIndex: 'n204'},
                {text: '≥10年', align: 'center', width: 100, dataIndex: 'n205'},
            ]
            },
            {
                text: '职称离职占比', columns: [
                {text: '护士', align: 'center', width: 100, dataIndex: 'n211'},
                {text: '护师', align: 'center', width: 100, dataIndex: 'n212'},
                {text: '主管护师', align: 'center', width: 100, dataIndex: 'n213'},
                {text: '副主任护师', align: 'center', width: 100, dataIndex: 'n214'},
                {text: '主任护师', align: 'center', width: 100, dataIndex: 'n215'},
            ]
            },
            {
                text: '学历离职占比', columns: [
                {text: '中专', align: 'center', width: 100, dataIndex: 'n221'},
                {text: '大专', align: 'center', width: 100, dataIndex: 'n222'},
                {text: '本科', align: 'center', width: 100, dataIndex: 'n223'},
                {text: '硕士', align: 'center', width: 100, dataIndex: 'n224'},
                {text: '博士', align: 'center', width: 100, dataIndex: 'n225'},
            ]
            }
        ];
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
        // this.loadData();
    },
    search: function () {
        var me = this;
        me.name = name;
        var type = '';
        var qccid = me.xzdq.getValue();

        var params = {
            // type: type,
            advertype: me.typeid,
            sdate: me.sdate.getValue(),
            edate: me.edate.getValue(),
            tjzq: me.tjzq.getValue(),
            name: me.xzdq.getValue()
        };
        Ext.apply(this.gridStore.proxy.extraParams, params);
        this.gridStore.loadPage(1);
    },
    dataFormatter: function (obj, names, times) {
        var pList = names;
        var temp;
        var max = 0;
        for (var j = 0; j < times.length; j++) {
            var year = times[j];
            temp = obj[year];
            for (var i = 0, l = temp.length; i < l; i++) {
                max = Math.max(max, temp[i]);
                obj[year][i] = {
                    name: pList[i],
                    value: temp[i]
                }
            }
            obj[year + 'max'] = Math.floor(max / 100) * 100;
        }
        return obj;
    },
    loadData: function (id, name) {
        var me = this;
        me.name = name;
        var subname = me.getFormulaName(id);
        var type = '';
        var qccid = me.xzdq.getValue();

        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/NurseQualityController/nurseDataStatisCharTime.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: {
                // type: type,
                advertype: me.typeid,
                sdate: me.sdate.getValue(),
                edate: me.edate.getValue(),
                tjzq: me.tjzq.getValue(),
                name: me.xzdq.getValue()
            },
            scope: this,
            success: function (resp) {
                var strResult = resp.responseText;
                var obj = Ext.util.JSON.decode(strResult);
                if (me.chart != null && me.chart != "" && me.chart != undefined) {
                    me.chart.dispose();
                }
                me.chart = echarts.init(document.getElementById("ndspid"), 'macarons');
                var legendData = [];
                if (me.typeid < 17) {
                    legendData = ['平均值'];
                } else if (me.typeid == 17) {
                    legendData = ['一级伤害', '二级伤害', '三级伤害', '死亡伤害'];
                } else if (me.typeid == 18 || me.typeid == 21) {
                    legendData = ['护士', '护师', '主管护师', '副主任护师', '主任护师'];
                } else if (me.typeid == 19 || me.typeid == 22) {
                    legendData = ['中专', '大专', '本科', '硕士', '博士'];
                } else if (me.typeid == 20) {
                    legendData = ['＜1年', '1≤y＜2年', '2≤y＜5年', '5≤y＜10年', '≥10年'];
                }

                var names = [];

                for (var i = 0; i < obj[1].length; i++) {
                    var name = obj[1][i]['value'];
                    if (!HOSPROLE && name && name.length > 3) {
                        name = name.substring(0, 3);
                    }
                    names.push(name);
                }

                var times = [];
                var timesshow = [];
                for (var i = 0; i < obj[0].length; i++) {
                    var time = obj[0][i]['value'];
                    var timeshow = obj[0][i]['value'] + "-01";  //2018-01-01
                    timesshow.push(timeshow);
                    times.push(time);
                }


                var dataMap = {};
                for (i = 0; i < legendData.length; i++) {
                    dataMap[i] = me.dataFormatter(obj[2 + i][0], names, times);
                }

                var series = [];

                for (var i = 0; i < legendData.length; i++) {
                    series.push({
                        'name': legendData[i],
                        'type': 'bar',
                        'data': dataMap[i][times[0]],
                        itemStyle: {
                            normal: {
                                label: {
                                    // show: true, //开启显示
                                    position: 'top', //在上方显示
                                    // textStyle: { //数值样式
                                    //     // color: 'black',
                                    //     fontSize: 6
                                    // }
                                }
                            }
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    })
                }

                var options = [{
                    title: {
                        'text': times[0] + '季度 ' + me.typename,
                        'subtext': subname
                    },
                    tooltip: {'trigger': 'axis'},
                    legend: {
                        x: 'right',
                        'data': legendData
                    },
                    toolbox: {
                        'show': true,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        'feature': {
                            'mark': {'show': true},
                            'dataView': {'show': true, 'readOnly': false},
                            'magicType': {'show': true, 'type': ['line', 'bar', 'stack', 'tiled']},
                            'restore': {'show': true},
                            'saveAsImage': {'show': true}
                        }
                    },
                    calculable: true,
                    grid: {'y': 80, 'y2': 100},
                    xAxis: [{
                        'type': 'category',
                        'axisLabel': {'interval': 0},
                        'data': names
                    }],
                    yAxis: [
                        {
                            'type': 'value'
                        }
                    ],
                    series: series
                }
                ];

                for (var i = 1; i < times.length; i++) {
                    var iseries = [];
                    for (var j = 0; j < legendData.length; j++) {
                        iseries.push({
                            data: dataMap[j][times[i]]
                        });
                    }
                    options.push({
                        title: {text: times[i] + '季度 ' + me.typename},
                        series: iseries
                    });
                }

                var option = {
                    timeline: {
                        data: timesshow,
                        label: {
                            formatter: function (value) {
                                var date = new Date(value);
                                var texts = [(date.getFullYear()), "0" + (date.getMonth() + 1)];

                                return texts.join('-');
                            }
                        },
                        // autoPlay: true,
                        playInterval: 1500
                    },
                    options: options
                };


                window.onresize = function () {
                    me.chart.resize();
                };
                // option = newline(option, 6, 'xAxis');
                me.chart.setOption(option);

            },
            failure: function (response, opts) {
                App.getApplication().msg('出错', '统计加载出错', 2000);
            }
        });

    },
    exportData: function () {
        var me = this;
        me.name = name;
        var type = '';
        var qccid = me.xzdq.getValue();

        var params = {
            // type: type,
            advertype: me.typeid,
            sdate: me.sdate.getValue(),
            edate: me.edate.getValue(),
            tjzq: me.tjzq.getValue(),
            name: me.xzdq.getValue()
        };

        var link = Utils.createURL(globalCtx + '/NurseQualityController/exportNurseQualityStatis.sdo', params);

        window.open(link);

    },
    getFormulaName: function (v) {
        var name = '';
        switch (v) {
            case '1':
                name = '=1：（同期执业护士人数(期末)/统计周期内实际开放床位数）';
                break;
            case '2':
                name = '=1：（病区同期执业护士人数(期末)/统计周期内实际开放床位数）';
                break;
            case '3':
                name = '=1：（同期白班次住院患者总数/统计周期内某班次责任护士总数）';
                break;
            case '4':
                name = '=1：（同期夜班次住院患者总数/统计周期内某班次责任护士总数）';
                break;
            case '5':
                name = '=同期内执业护士实际上班小时数/统计周期内实际占用床日数';
                break;
            case '6':
                name = '=（同期内导尿管非计划性拔管例次数/统计周期内该导管直管总日数）*1000‰';
                break;
            case '7':
                name = '=（同期内胃管非计划性拔管例次数/统计周期内该导管直管总日数）*1000‰';
                break;
            case '8':
                name = '=（同期内中心导管非计划性拔管例次数/统计周期内该导管直管总日数）*1000‰';
                break;
            case '9':
                name = '=（同期内气管导管非计划性拔管例次数/统计周期内该导管直管总日数）*1000‰';
                break;
            case '10':
                name = '=（同期呼吸机相关性肺炎感染例次数/统计周期内有创机械通气总日数）*1000‰（例/千机械通气日）';
                break;
            case '11':
                name = '=同期CRBSI例次数/统计周期内中心导管插管总日数*1000‰（例/千导管日）';
                break;
            case '12':
                name = '=（同期内CAUTI发生例次数/统计周期内该导管直管总日数）*1000‰';
                break;
            case '13':
                name = '=（同期住院患者中压疮新发病例数/统计周期内住院患者总数）*100%';
                break;
            case '14':
                name = '=（同期住院患者中二期及以上压疮新发病例数/统计周期内住院患者总数）*100%';
                break;
            case '15':
                name = '=（同期住院患者中发生跌倒例次数/统计周期内住院患者实际占用总床日数）*1000‰';
                break;
            case '16':
                name = '=（同期住院患者中发生跌倒伤害总例次数/统计周期内有记录患者跌倒例次数）*100‰';
                break;
            case '17':
                name = '=同期住院患者中发生跌倒伤害某等级患者例次数/统计周期内住院患者中发生跌倒伤害例次数*100%';
                break;
            case '18':
                name = '=（同期末各职称人数/统计周期内护士总人数）*100%';
                break;
            case '19':
                name = '=（同期末各学历人数/统计周期内护士总人数）*100%';
                break;
            case '20':
                name = '=（同期末各工作年限人数/统计周期内护士总人数）*100%';
                break;
            case '21':
                name = '=（同期末各职称离职总人数/统计周期内护士护士在职总人数+统计周期内护士离职人数）*100%';
                break;
            case '22':
                name = '=（同期末各学历离职总人数/统计周期内在职护士总人数+统计周期内离职护士总人数）*100%';
                break;
            case '23':
                name = '=（同期末各工作年年限离职总人数/统计周期内在职护士总人数+统计周期内离职护士总人数）*100%';
                break;
        }

        return name;

    }
})
;
