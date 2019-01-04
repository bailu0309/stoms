/*
 * 菜单配置selector Window
 * */
Ext.define('build.util.selector.TodayFollowupWindow', {
    extend: 'Ext.window.Window',
    parentPanel: null,
    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'],
    value: null,//用于selector 的 getvalue
    nameValue: null,//用户selector 的getName
    initComponent: function () {
        var scope = this;
        Ext.define('followup', {
            extend: 'Ext.data.Model',
            idProperty: 'fid'
        });
        this.followupcolumns = [
            {text: 'ID', width: 10, dataIndex: 'fid', hidden: true},
            {text: '姓名', width: 80, dataIndex: 'fpatname'},
            {text: '联系电话', width: 100, dataIndex: 'dh'},
            {text: '主要诊断', width: 150, dataIndex: 'zyzd'},
            {text: '就诊医院', width: 200, dataIndex: 'username'},
            {text: '身份证号', width: 150, dataIndex: 'fidcd'},
            {
                text: '最后接触状态', width: 100, dataIndex: 'flastzt', renderer: function (v) {
                {
                    if (v == '0') return '存活';
                    else if (v == '1')  return '死亡';
                    else if (v == '2')  return '失访';
                    else if (v == '3')  return '未知';
                }
            }
            },
            {text: '随访人', width: 120, dataIndex: 'funame'},
            {text: '随访人机构', width: 120, dataIndex: 'forgname'},
            {text: '随访时间', width: 120, dataIndex: 'ffollowuptime', renderer: this.dateRenderers},
            {text: '病案号', width: 120, dataIndex: 'fbah'},
            {text: '任务编号', width: 120, dataIndex: 'ftaskid', hidden: true},
            {text: '组织机构', width: 120, dataIndex: 'fcocod', hidden: true}
        ];

        var d = new Date();
        var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        this.followupListStore = Ext.create('Ext.data.JsonStore', {
            model: 'followup',
            sorters: 'ffollowuptime',
            pageSize: 20,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                extraParams: {
                    "fdate": str+' 00:00:00',
                    "fedate": str+' 23:59:59'
                },
                url: globalCtx + '/FollowupController/queryFollowup.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        //主面板 数据面板
        this.gridPanelfollowup = Ext.create('Ext.grid.Panel', {
            region: 'center',
            width: 540,
            //autoScroll: true,
            columnLines: true,
            plain: true,
            header: false,
            border: false,
            closable: false,
            //draggable: false,
            frame: false,
            //resizable: false,
            split: true,
            dockedItems: [this.toolBar, this.toolBar3, this.toolBar2],
            //forceFit: true,
            selModel: new Ext.selection.CheckboxModel({
                mode: 'SINGLE', allowDeselect: true,
                listeners: {
                    selectionchange: function (selModel, selections) {
                        if (selections[0]) {
                            var rec = selections[0];
                        }
                    }
                }
            }),
            reserveScrollbar: true, //防止滚动条溢出
            //viewConfig: {stripeRows: true},
            store: this.followupListStore,
            columns: this.followupcolumns,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: this.followupListStore,
                displayInfo: true,
                displayMsg: '<div align="left">共{2}条, 显示{0} - {1}条 </div>',
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        Ext.apply(this, {
            title: '当日随访记录',
            width: 800,
            height: 600,
            layout: 'border',
            border: false,
            modal: true,
            frame: true,
            closeAction: 'hide',
            buttonAlign: 'center',
            tbar: [{
                text: '查看更多',
                scope: this,
                handler: function () {
                    this.hide();
                    showMain("build.flv.FollowupResultPanel", "240", "images/menu/nav01.png", "随访结果查询");
                }
            }],
            items: [this.gridPanelfollowup]
        });
        this.callParent();
    },
    show: function () {
        this.followupListStore.load({params: {"start": 0, "limit": 20}});
        this.callParent();
    }
});