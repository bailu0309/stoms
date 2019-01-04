/**
 * 署名信息
 */
Ext.define('build.adverseevent.base.SignInfoSet', {
    extend: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">事件报告人署名信息</b>',
            width: 1200,
            layout: 'column',
            border: true,
            defaults: {bodyStyle: 'padding:1px', border: false},
            collapsible: true,
            columnWidth: 1,
            items: [{
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.reporthospname, me.reportdepartname]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.reportpeoplename, me.reportphone]
            }, {
                columnWidth: 1,
                border: false,
                layout: 'column',
                bodyStyle: 'padding:5px',
                defaults: {columnWidth: .5, labelWidth: 150, labelAlign: 'right', width: '95%'},
                items: [me.reportemail]
            }]
        });
        this.callParent();
    },
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    initMethod: function () {
    },
    onDestroy: function () {
        this.callParent();
    },
    initPartsInfo: function () {
        var me = this;
        me.reporthospname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '报送医院名称',
            name: 'qhname'
        });
        me.reportdepartname = Ext.create('Ext.form.field.Text', {
            fieldLabel: '报送主管部门名称',
            name: 'qdepartment'
        });
        me.reportpeoplename = Ext.create('Ext.form.field.Text', {
            fieldLabel: '报送人员姓名',
            name: 'qreportname '
        });
        me.reportphone = Ext.create('Ext.form.field.Text', {
            name: 'qrphone',
            fieldLabel: '联系电话',
            regex: /^[1-9]\d{10}$/,
            regexText: '请输入正确的联系电话'
        });
        me.reportemail = Ext.create('Ext.form.field.Text', {
            fieldLabel: '邮箱',
            vtype: 'email',
            name: 'qremail'
        });
    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});