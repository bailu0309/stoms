Ext.define('build.adverseevent.statistics.NoPlanExtubationStatisticsPanel', {
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
            items: [me.queryPanel, this.gridPanel ]
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
            width: 200,
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
            hidden: !PROROLE,
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
                items: [
                    me.sdate, me.edate
                ]
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
                    var fftype;//非计划拔管种类
                    var ffylg;//引流管种类
                    var fnurseclass;//护士班次
                    var params;
                    var fsdate = e.get('NY')+"-01 00:00:00";
                    var fedate = e.get('NY')+"-31 23:59:59";
                    var nurseclass1 = ["2","6","10","14","18","22","26","31","35","39","43","47","51","55"];//白班
                    var nurseclass2 = ["3","7","11","15","19","23","27","32","36","40","44","48","52","56"];//夜班
                    var nurseclass3 = ["4","8","12","16","20","24","28","33","37","41","45","49","53","57"];//节假日

                    Array.prototype.contains = function (obj) {
                        var i = this.length;
                        while (i--) {
                            if (this[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    };

                    if(columnIndex > 1 && columnIndex <6){
                        fftype = "1";//非计划拔管类型
                    }else if(columnIndex > 5 && columnIndex <10){
                        fftype = "2";
                    }else if(columnIndex > 9 && columnIndex <14){
                        fftype = "3";
                        ffylg = "1";
                    }else if(columnIndex > 13 && columnIndex <18){
                        fftype = "3";
                        ffylg = "2";
                    }else if(columnIndex > 17 && columnIndex <22){
                        fftype = "3";
                        ffylg = "3";
                    }else if(columnIndex > 21 && columnIndex <26){
                        fftype = "3";
                        ffylg = "4";
                    }else if(columnIndex > 25 && columnIndex <30){
                        fftype = "3";
                        ffylg = "9";
                    }else if(columnIndex == 30){
                        fftype = "3";
                    }else if(columnIndex > 30 && columnIndex <35){
                        fftype = "5"
                    }else if(columnIndex > 34 && columnIndex <39){
                        fftype = "6"
                    }else if(columnIndex > 38 && columnIndex <43){
                        fftype = "7"
                    }else if(columnIndex > 42 && columnIndex <47){
                        fftype = "8"
                    }else if(columnIndex > 46 && columnIndex <51){
                        fftype = "9"
                    }else if(columnIndex > 50 && columnIndex <55){
                        fftype = "10"
                    }else if(columnIndex > 54 && columnIndex <59){
                        fftype = "99"
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
                        type : '4',//不良事件类型
                        nurseclass : fnurseclass,//白班、夜班、节假日
                        ftype : fftype,//非计划拔管类型
                        fylg : ffylg,//引流管类型
                        username : me.username.getValue(),
                        qccid : me.qccid.getValue(),
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
            // autoLoad: true,
            pageSize: 25,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/NpExtController/statisNpex.sdo',
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
                dataIndex:"NY",
                align:"center",
                width:100
            },
            {
                text:"合计",
                dataIndex:"HJ",
                width:80,
                align:"center"
            },
            {
                text:"插管患者非计划拔管",
                align:"center",
                columns:[{
                    text:"胃管（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N01",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N02",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N03",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N0",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"尿管(例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N11",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N12",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N13",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N1",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"引流管(例数)",
                    align:"center",
                    columns:[{
                        text:"胸管",
                        align:"center",
                        columns:[{
                            text:"白"+"<br/>"+"班",
                            dataIndex:"N211",
                            align:"center",
                            width:40
                        },{
                            text:"夜"+"<br/>"+"班",
                            dataIndex:"N212",
                            align:"center",
                            width:40
                        },{
                            text:"节"+"<br/>"+"假"+"<br/>"+"日",
                            dataIndex:"N213",
                            align:"center",
                            width:40
                        },{
                            text:"总"+"<br/>"+"计",
                            dataIndex:"N21",
                            align:"center",
                            width:40
                        }]
                    },{
                        text:"腹腔流管",
                        align:"center",
                        columns:[{
                            text:"白"+"<br/>"+"班",
                            dataIndex:"N221",
                            align:"center",
                            width:40
                        },{
                            text:"夜"+"<br/>"+"班",
                            dataIndex:"N222",
                            align:"center",
                            width:40
                        },{
                            text:"节"+"<br/>"+"假"+"<br/>"+"日",
                            dataIndex:"N223",
                            align:"center",
                            width:40
                        },{
                            text:"总"+"<br/>"+"计",
                            dataIndex:"N22",
                            align:"center",
                            width:40
                        }]
                    },{
                        text:"盆腔引流管",
                        align:"center",
                        columns:[{
                            text:"白"+"<br/>"+"班",
                            dataIndex:"N231",
                            align:"center",
                            width:40
                        },{
                            text:"夜"+"<br/>"+"班",
                            dataIndex:"N232",
                            align:"center",
                            width:40
                        },{
                            text:"节"+"<br/>"+"假"+"<br/>"+"日",
                            dataIndex:"N233",
                            align:"center",
                            width:40
                        },{
                            text:"总"+"<br/>"+"计",
                            dataIndex:"N23",
                            align:"center",
                            width:40
                        }]
                    },{
                        text:"伤口引流管",
                        align:"center",
                        columns:[{
                            text:"白"+"<br/>"+"班",
                            dataIndex:"N241",
                            align:"center",
                            width:40
                        },{
                            text:"夜"+"<br/>"+"班",
                            dataIndex:"N242",
                            align:"center",
                            width:40
                        },{
                            text:"节"+"<br/>"+"假"+"<br/>"+"日",
                            dataIndex:"N243",
                            align:"center",
                            width:40
                        },{
                            text:"总"+"<br/>"+"计",
                            dataIndex:"N24",
                            align:"center",
                            width:40
                        }]
                    },{
                        text:"其他",
                        align:"center",
                        columns:[{
                            text:"白"+"<br/>"+"班",
                            dataIndex:"N251",
                            align:"center",
                            width:40
                        },{
                            text:"夜"+"<br/>"+"班",
                            dataIndex:"N252",
                            align:"center",
                            width:40
                        },{
                            text:"节"+"<br/>"+"假"+"<br/>"+"日",
                            dataIndex:"N253",
                            align:"center",
                            width:40
                        },{
                            text:"总"+"<br/>"+"计",
                            dataIndex:"N25",
                            align:"center",
                            width:40
                        }]
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N33",
                        align:"center",
                        width:40
                    }
                    ]
                },{
                    text:"CVC（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N41",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N42",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N43",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N4",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"PICC（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N51",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N52",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N53",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N5",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"透析管路（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N61",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N62",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N63",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N6",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"气管插管（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N71",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N72",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N73",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N7",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"动脉置管（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N81",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N82",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N83",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N8",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"造瘘管（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N91",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N92",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N93",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N9",
                        align:"center",
                        width:40
                    }]
                },{
                    text:"其他（例数）",
                    align:"center",
                    columns:[{
                        text:"白"+"<br/>"+"班",
                        dataIndex:"N991",
                        align:"center",
                        width:40
                    },{
                        text:"夜"+"<br/>"+"班",
                        dataIndex:"N992",
                        align:"center",
                        width:40
                    },{
                        text:"节"+"<br/>"+"假"+"<br/>"+"日",
                        dataIndex:"N993",
                        align:"center",
                        width:40
                    },{
                        text:"总"+"<br/>"+"计",
                        dataIndex:"N99",
                        align:"center",
                        width:40
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

        var link = globalCtx + '/NpExtController/exportnpExtStatis.sdo' + '?1=1';
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