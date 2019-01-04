Ext.define('build.adverseevent.statistics.PressureSoresStatisticsPanel', {
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
            items: [me.queryPanel,this.gridPanel ]
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
            labelAlign: 'right',
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
            xtype: 'monthfield',
            format: 'Y-m',
            name: 'sdate',
            fieldLabel: '上报时间',
            width: 200,
            labelAlign: 'right',
            listeners: {
                select: function (dateField, date) {
                    var eDate = me.edate.getValue().valueOf();
                    if (eDate != "") {
                        var sDate = date.valueOf();
                        if ((eDate - sDate) < 0) {
                            App.getApplication().msg('提示', '起始时间不能大于结束时间！', 2000);
                            me.starttime.setValue("");
                        }
                    }
                }
            }
        });
        this.edate = Ext.create('build.ux.Month', {
            xtype: 'monthfield',
            format: 'Y-m',
            name: 'edate',
            fieldLabel: '至',
            value: new Date(),
            width:200,
            labelAlign: 'right'
        });


        this.username = Ext.create('Ext.form.field.Text', {
            fieldLabel: '机构名称',
            hidden:HOSPROLE,
            name: 'username',
            labelAlign: 'right'
        });

        me.qccid = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '质控中心',
            labelAlign: 'right',
            name: 'qccid',
            editable: false,
            displayField: 'username',
            hidden: !PROROLE,
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
            }, {
                xtype: 'button',
                text: '导出',
                iconCls: 'down',
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
                defaults: {columnWidth: .49, labelWidth: 65, labelAlign: 'right', width: '100%'},
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
                    var fus;//压疮分期
                    var fnurseclass;//护士班次
                    var params;
                    var fsdate = e.get('NY')+"-01 00:00:00";
                    var fedate = e.get('NY')+"-31 23:59:59";
                    var nurseclass1 = ["2","6","10","14","18","22"];//白班
                    var nurseclass2 = ["3","7","11","15","19","23"];//夜班
                    var nurseclass3 = ["4","8","12","16","20","24"];//节假日
                    Array.prototype.contains = function (obj) {
                        var i = this.length;
                        while (i--) {
                            if (this[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    }

                    if(columnIndex > 1 && columnIndex < 6 ){
                        fus = "1";//可疑深部组织损伤
                    }else if(columnIndex > 5 && columnIndex < 10 ){
                        fus = "2";//Ⅰ期
                    }else if(columnIndex > 9 && columnIndex < 14 ){
                        fus = "3";//Ⅱ期
                    }else if(columnIndex > 13 && columnIndex < 18 ){
                        fus = "4";//Ⅲ期
                    }else if(columnIndex > 17 && columnIndex < 22 ){
                        fus = "5";//Ⅳ期
                    }else if(columnIndex > 21 && columnIndex < 26 ){
                        fus = "6";//不能分期
                    }

                    if(nurseclass1.contains(columnIndex+"")){
                        fnurseclass = "1";
                    }else if(nurseclass2.contains(columnIndex+"")){
                        fnurseclass = "2";
                    }else if(nurseclass3.contains(columnIndex+"")){
                        fnurseclass = "3"
                    }


                    if(e.get('NY') == "总计"){
                        if(me.sdate.getValue() == null || me.sdate.getValue() == ""){
                            fsdate = "";
                            fedate = "";
                        }else{
                            fsdate = me.sdate.getRawValue()+"-01 00:00:00";
                            fedate = me.edate.getRawValue()+"-31 23:59:59";
                        }
                    }

                    params = {
                        sdate : fsdate,
                        edate : fedate,
                        type : '1',//不良事件类型
                        nurseclass : fnurseclass,//白班、夜班、节假日
                        username : me.username.getValue(),
                        qccid : me.qccid.getValue(),
                        us : fus,//压疮分期
                        fst : '1'
                    };
                    me.adverseShowWin.setTitle(e.get('USERNAME'));
                    me.adverseShowWin.setQueryParams(params);
                    me.adverseShowWin.show();
                }
            }
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
            autoLoad: true,
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/PressureSoresController/statisPress.sdo',
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
            {
                text:"时间",
                dataIndex:'NY',
                align:"center",
                width:80
            },
            {
                text:"合计",
                dataIndex:"HJ",
                width:80,
                align:"center"
            },
            {
                text:"患者压疮",
                align:"center",
                columns:[{
                    text:"可疑深部组织损伤",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N01",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N02",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N03",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N0",
                        align:"center",
                        width:50
                    }]
                },{
                    text:"I期",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N11",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N12",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N13",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N1",
                        align:"center",
                        width:50
                    }]
                },{
                    text:"II期",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N21",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N22",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N23",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N2",
                        align:"center",
                        width:50
                    }]
                },{
                    text:"III期",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N31",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N32",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N33",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N3",
                        align:"center",
                        width:50
                    }]
                },{
                    text:"IV期",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N41",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N42",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N43",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N4",
                        align:"center",
                        width:50
                    }]
                },{
                    text:"不能分期",
                    align:"center",
                    columns:[{
                        text:"白班",
                        dataIndex:"N51",
                        align:"center",
                        width:50
                    },{
                        text:"夜班",
                        dataIndex:"N52",
                        align:"center",
                        width:50
                    },{
                        text:"节假日",
                        dataIndex:"N53",
                        align:"center",
                        width:70
                    },{
                        text:"总计",
                        dataIndex:"N5",
                        align:"center",
                        width:50
                    }]
                }]
            },{
                text:"机构名称",
                dataIndex:'USERNAME',
                align:"center",
                width:80,
                hidden:true
            }
        ]
    },
    search: function () {
        var me = this;
        me.store.currentPage = 1;

        var params = me.queryPanel.getForm().getValues();

        Ext.apply(this.store.proxy.extraParams, params);

        this.store.load();
    },
    exportStatis: function () {
        var me = this;
        var fdate = this.sdate.getRawValue();
        var fedate = this.edate.getRawValue();
        var username = me.username.getValue();
        var qccid = me.qccid.getValue();

        var link = globalCtx + '/PressureSoresController/exportPressStatis.sdo' + '?1=1';
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