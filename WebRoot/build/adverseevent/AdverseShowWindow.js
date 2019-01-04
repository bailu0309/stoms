Ext.define('build.adverseevent.AdverseShowWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        me.panel = Ext.create('build.adverseevent.AdverseShowPanel', {
            width: 1180,
            height: 550,
            border: true
        });

        Ext.apply(this, {
            width: 1200,
            height: 600,
            autoScroll: true,
            closeAction: 'hide',
            plain: true,
            shadow: true,
            resizable: true,
            border: true,
            items: [me.panel]
        });
        this.callParent();

    },
    initStore: function () {
        var me = this;
    },
    onRender: function () {
        this.superclass.onRender.call(this);
    },
    loadData: function (sdate, edate, orgcode, type, qccid) {
        this.panel.loadData(sdate, edate, orgcode, type, qccid);
    },
    /**
     *    params = {
            sdate: '',//上报开始时间
            edate: '',//上报结束时间
            atype: '',//不良事件类型
            name: '',//医院编码
            qccid: '',//质控中心
            nurseclass:'',
            us: '',
            sr: '',
            dsm1ai: '',
            ftype: '',//导管类型
            fylg: '',//导管类型-引流管
            identification: '',//身份识别错误
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
        this.panel.setQueryParams(params)
    }
});