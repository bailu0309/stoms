Ext.define('build.adverseevent.statistics.DrugWrongStatisticsPanel', {

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
            items: [me.queryPanel,me.cPanel]
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


        this.sdate = Ext.create('build.ux.Month', {
            format: 'Y-m',
            name: 'sdate',
            fieldLabel: '上报时间',
            listeners: {
                select: function (dateField, date) {
                    var Edate = me.edate.getValue().valueOf();
                    if (Edate != "") {
                        var sdates = date.valueOf();
                        if ((sdates - Edate) > 0) {
                            App.getApplication().msg('提示', '开始时间不能大于结束时间！', 2000);
                            me.sdate.setValue("");
                        }
                    }
                }
            }
        });
        this.edate = Ext.create('build.ux.Month', {
            format: 'Y-m',
            name: 'edate',
            value:new Date(),
            fieldLabel: '至'
            // listeners: {
            //     select: function (dateField, date) {
            //         var Sdate = me.sdate.getValue().valueOf();
            //         if (Sdate != "") {
            //             var edates = date.valueOf();
            //             if ((edates - Sdate) < 0) {
            //                 App.getApplication().msg('提示', '开始时间不能大于结束时间！', 2000);
            //                 me.edate.setValue("");
            //             }
            //         }
            //     }
            // }
        });


        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构名称',
            hidden: HOSPROLE,
            name: 'username',
            labelAlign: 'right'
        });

        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '质控中心',
            name: 'qccid',
            hidden: !PROROLE,
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
                text: '导出',
                iconCls: 'download',
                scope: this,
                handler: me.exportStatis
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
                defaults: {columnWidth: .98, labelWidth: 65, labelAlign: 'right', width: '100%'},
                items: [me.ptype]
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
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                celldblclick: function (grid, rowIndex, columnIndex, e) {
                    var params;
                    var identification='';
                    var drugname='';
                    var drugdose='';
                    var drugconcentration='';
                    var drugtime='';
                    var drugroute='';
                    var drugeffect='';
                    var drugquality='';
                    var nurseclass='';
                    var sdate='';
                    var edate='';
                    if(e.get('NY')!="总计"){
                        sdate=e.get('NY')+"-01 00:00:00";
                        edate=e.get('NY')+"-31 23:59:59";
                    }else if(e.get('NY')=="总计"){
                        if(me.sdate.getValue()==null&&me.edate.getValue()==null){
                            sdate='';
                            edate='';
                        }else if(me.sdate.getValue()==null&&me.edate.getValue()!=null){
                            edate=me.edate.getRawValue()+"-31 23:59:59";
                        }else if(me.sdate.getValue()!=null&&me.edate.getValue()==null){
                            sdate=me.sdate.getRawValue()+"-01 00:00:00";
                        }else{
                            sdate=me.sdate.getRawValue()+"-01 00:00:00";
                            edate=me.edate.getRawValue()+"-31 23:59:59";
                        }
                    }

                    if (columnIndex >1 && columnIndex<6) {
                        identification ='1';
                    }
                    if (columnIndex >5 && columnIndex<10) {
                        drugname ='1';
                    }
                    if (columnIndex >9 && columnIndex<14) {
                        drugdose ='1';
                    }
                    if (columnIndex >13 && columnIndex<18) {
                        drugconcentration='1';
                    }
                    if (columnIndex >17 && columnIndex<22) {
                        drugtime ='1';
                    }
                    if (columnIndex >21 && columnIndex<26) {
                        drugroute ='1';
                    }
                    if (columnIndex >25 && columnIndex<30) {
                        drugeffect ='1';
                    }
                    if (columnIndex >29 && columnIndex<34) {
                        drugquality ='1';
                    }

                    if (columnIndex ==2 ||columnIndex ==6||columnIndex ==10||columnIndex ==14||columnIndex ==18||columnIndex ==22||columnIndex ==26||columnIndex ==30) {
                        nurseclass ='1';
                    }
                    if (columnIndex ==3 ||columnIndex ==7||columnIndex ==11||columnIndex ==15||columnIndex ==19||columnIndex ==23||columnIndex ==27||columnIndex ==31) {
                        nurseclass ='2';
                    }
                    if (columnIndex ==4 ||columnIndex ==8||columnIndex ==12||columnIndex ==16||columnIndex ==20||columnIndex ==24||columnIndex ==28||columnIndex ==32) {
                        nurseclass ='3';
                    }
                    params={
                        identification:identification,
                        drugname:drugname,
                        drugdose:drugdose,
                        drugconcentration:drugconcentration,
                        drugtime:drugtime,
                        drugroute:drugroute,
                        drugeffect:drugeffect,
                        drugquality:drugquality,
                        nurseclass:nurseclass,
                        fst:'1',
                        type:'5',
                        sdate:sdate,
                        edate:edate,
                        username:me.username.getValue(),
                        qccid:me.qccid.getValue(),
                        wptype:me.ptype.getValue()
                    };
                    //me.adverseShowWin.setTitle(e.get('USERNAME'));
                    me.adverseShowWin.setQueryParams(params);
                    me.adverseShowWin.show();

                }
            }
        });
        me.charId = Ext.id();

        me.charPanel = Ext.create('Ext.panel.Panel', {
            width: 610,
            height:300,
            collapsible: true,
            region: 'north',
            border: true,
            dockedItems: [me.gridToolBar],
            html: '<div style="width: 600px;height: 100%" id="' + me.charId + '"></div>'
        });
        me.cPanel = Ext.create('Ext.panel.Panel', {
            width: '100%',
            region: 'center',
            border: true,
            layout: 'border',
            items: [me.gridPanel,me.charPanel]
        });
        me.adverseShowWin = Ext.create('build.adverseevent.AdverseShowWindow', {
            width: 1200,
            height: 550,
            bodyPadding: 5,
            modal: true,
            frame: true,
            closeAction: 'hide'
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
                url: globalCtx + '/DrugWrongController/statisDrugWrong.sdo',
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
            {text: '时间', width: 90, dataIndex: 'NY', align: 'center'},
            {
                text: '合计',
                width: 80,
                align: 'center',
                dataIndex: 'HJ'
            },
            {
                text: '给药错误统计',
                columns: [{
                    text: '身份识别错误',
                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N01',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N02',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N03',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N0',
                        width: 63
                    }]
                }, {
                    text: '药品名称错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N11',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N12',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N13',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N1',
                        width: 63
                    }]
                }, {
                    text: '药品剂量错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N21',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N22',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        dataIndex: 'N23',
                        align: 'center',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        dataIndex: 'N2',
                        align: 'center',
                        width: 63
                    }]
                }, {
                    text: '药品浓度错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N31',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        dataIndex: 'N32',
                        align: 'center',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N33',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N3',
                        width: 63
                    }]
                }, {
                    text: '给药时间错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N41',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N42',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N43',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N4',
                        width: 63
                    }]
                }, {
                    text: '给药途径错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N51',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N52',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N53',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N5',
                        width: 63
                    }]
                }, {
                    text: '药品效期错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N61',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N62',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N63',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N6',
                        width: 63
                    }]
                }, {
                    text: '药品质量错误',

                    columns: [{
                        text: '白' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N71',
                        width: 63
                    }, {
                        text: '夜' + '<br/>' + '班',
                        align: 'center',
                        dataIndex: 'N72',
                        width: 63
                    }, {
                        text: '节' + '<br/>' + '假' + '<br/>' + '日',
                        align: 'center',
                        dataIndex: 'N73',
                        width: 63
                    }, {
                        text: '总' + '<br/>' + '计',
                        align: 'center',
                        dataIndex: 'N7',
                        width: 63
                    }]
                }]
            }
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        var params = me.queryPanel.getForm().getValues();

        Ext.apply(this.store.proxy.extraParams, params);
        this.store.load();
        me.loadChar();
    },
    loadChar: function () {
        var me = this;

        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/DrugWrongController/queryDrugWrongChar.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: {
                sdate: me.sdate.getRawValue(),
                edate: me.edate.getRawValue(),
                username: me.username.getValue(),
                qccid: me.qccid.getValue(),
                wptype:me.ptype.getValue()
            },
            scope: this,
            success: function (resp) {
                var strResult = resp.responseText;
                var obj = Ext.util.JSON.decode(strResult);

                var chart = echarts.init(document.getElementById(me.charId), 'macarons');

                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        padding: 10,
                        data: ['身份识别错误', '药品名称错误', '药品剂量错误', '药品浓度错误', '给药时间错误', '给药途径错误','药品效期错误','药品质量错误']
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: obj[0]
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '身份识别错误',
                        type: 'bar',
                        stack: '1',
                        barWidth: 50,
                        data: obj[1]
                    }, {
                        name: '药品名称错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[2]
                    }, {
                        name: '药品剂量错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[3]
                    }, {
                        name: '药品浓度错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[4]
                    }, {
                        name: '给药时间错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[5]
                    }, {
                        name: '给药途径错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[6]
                    }, {
                        name: '药品效期错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[7]
                    }, {
                        name: '药品质量错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[8]
                    }]
                };


                window.onresize = function () {
                    chart.resize();
                };
                option = newline(option, 6, 'xAxis');
                chart.setOption(option);

            },
            failure: function (response, opts) {
                App.getApplication().msg('出错', '统计加载出错', 2000);
            }
        });
    } ,exportStatis: function () {
        var me = this;
        var wptype = me.ptype.getValue();
        var fdate = this.sdate.getRawValue();
        var fedate = this.edate.getRawValue();
        var username = me.username.getValue();
        var qccid = me.qccid.getValue();

        var link = globalCtx + '/DrugWrongController/exportDrugWrongStatis.sdo' + '?1=1';
        if (!Ext.isEmpty(wptype)) {
            link += '&wptype=' + wptype;
        }
        if (!Ext.isEmpty(fdate)) {
            link += '&sdate=' + fdate;
        }
        if (!Ext.isEmpty(fedate)) {
            link += '&edate=' + fedate;
        }
        if (!Ext.isEmpty(username)) {
            link += '&username=' + username;
        }
        if (!Ext.isEmpty(qccid)) {
            link += '&qccid=' + qccid;
        }

        window.open(link);

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});