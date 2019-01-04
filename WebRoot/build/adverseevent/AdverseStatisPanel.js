Ext.define('build.adverseevent.AdverseStatisPanel', {
    extend: 'Ext.panel.Panel',
    hideBtn: false,
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
            items: [this.gridPanel, me.charPanel]
        });

        if (!me.hideBtn) {
            me.search();
        }
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
    },
    initBigParts: function () {
        var me = this;

        this.sdate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'sdate',
            labelWidth: 60,
            width: 160,
            fieldLabel: '上报时间'
        });
        this.edate = Ext.create('Ext.form.field.Date', {
            format: 'Y-m-d',
            name: 'edate',
            labelWidth: 20,
            width: 120,
            labelSeparator: '',
            fieldLabel: '~'
        });
        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构名称',
            labelAlign: 'right',
            labelWidth: 60,
            width: 160
        });
        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '所属质控中心',
            labelWidth: 90,
            labelAlign: 'right',
            width: 280,
            hidden: !PROROLE,
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

        this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            hidden: me.hideBtn,
            items: [me.sdate, me.edate, this.username, me.qccid, '-', {
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
                    me.sdate.reset();
                    me.edate.reset();
                    me.username.reset();
                    me.qccid.reset();
                }
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'download',
                scope: this,
                handler: me.exportStatis
            }]
        });


        this.gridPanel = Ext.create('Ext.grid.Panel', {
            mask: true,
            region: 'center',
            border: false,
            dockedItems: [this.toolBar],
            columnLines: true,
            reserveScrollbar: true,
            viewConfig: {stripeRows: true},
            store: this.store,
            columns: this.columns,
            listeners: {
                celldblclick: function (grid, rowIndex, columnIndex, e) {
                    var type = columnIndex - 2;
                    if (type > 5) {
                        type = '';
                    }
                    me.adverseShowWin.setTitle(e.get('username'));
                    me.adverseShowWin.loadData(me.starttime, me.endtime, e.get('name'), type, me.qccidval);
                    me.adverseShowWin.show();
                }
            }
        });

        me.charId = Ext.id();

        me.charPanel = Ext.create('Ext.panel.Panel', {
            width: 610,
            collapsible: true,
            region: 'east',
            border: true,
            dockedItems: [me.gridToolBar],
            html: '<div style="width: 600px;height: 100%" id="' + me.charId + '"></div>'
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
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AdverBaseController/queryAdverseStatis.sdo',
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
            new Ext.grid.RowNumberer({width: 40}),
            {text: '组织机构代码', width: 120, dataIndex: 'name', hidden: true},
            {text: '医疗机构名称', width: 250, dataIndex: 'username', renderer: qtipRenderers},
            {text: '压疮', width: 80, align: 'center', dataIndex: 'a'},
            {text: '跌倒/坠床', width: 100, align: 'center', dataIndex: 'b'},
            {text: '安全管理及意外伤害', width: 150, align: 'center', dataIndex: 'c'},
            {text: '非计划拔管', width: 100, align: 'center', dataIndex: 'd'},
            {text: '给药错误', width: 100, align: 'center', dataIndex: 'e'},
            {text: '合计', width: 80, align: 'center', dataIndex: 'tj'}
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        this.store.load({
            params: {
                sdate: me.sdate.getRawValue(),
                edate: me.edate.getRawValue(),
                username: me.username.getValue(),
                qccid: me.qccid.getValue()
            }
        });

        me.loadChar();
    },
    loadData: function (sdate, edate, qccid) {
        var me = this;
        me.starttime = sdate;
        me.endtime = edate;
        me.qccidval = qccid;
        me.store.currentPage = 1;

        this.store.load({
            params: {
                sdate: sdate,
                edate: edate,
                qccid: qccid
            }
        });

        me.charPanel.setHidden(true);
    },
    exportStatis: function () {
        var me = this;
        var fdate = this.sdate.getRawValue();
        var fedate = this.edate.getRawValue();
        var username = me.username.getValue();
        var qccid = me.qccid.getValue();

        var link = globalCtx + '/ExportController/exportAdverseStatis.sdo' + '?1=1';
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
    loadChar: function () {
        var me = this;

        Ext.Ajax.request({
            method: 'post',
            url: globalCtx + '/AdverBaseController/queryAdverseStatisChar.sdo',
            waitTitle: '请稍等片刻',
            waitMsg: '正在统计...',
            params: {
                sdate: me.sdate.getRawValue(),
                edate: me.edate.getRawValue(),
                username: me.username.getValue(),
                qccid: me.qccid.getValue()
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
                        data: ['压疮', '跌倒/坠床', '安全管理及意外伤害', '非计划拔管', '给药错误'],
                        formatter: function (name) {
                            console.log(name);
                            return name;
                            // if(name === 'A') {
                            //     return name + "："+"350(数值)";
                            // }
                        }


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
                        name: '压疮',
                        type: 'bar',
                        stack: '1',
                        barWidth: 50,
                        data: obj[1]
                    }, {
                        name: '跌倒/坠床',
                        type: 'bar',
                        stack: '1',
                        data: obj[2]
                    }, {
                        name: '安全管理及意外伤害',
                        type: 'bar',
                        stack: '1',
                        data: obj[3]
                    }, {
                        name: '非计划拔管',
                        type: 'bar',
                        stack: '1',
                        data: obj[4]
                    }, {
                        name: '给药错误',
                        type: 'bar',
                        stack: '1',
                        data: obj[5]
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
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});