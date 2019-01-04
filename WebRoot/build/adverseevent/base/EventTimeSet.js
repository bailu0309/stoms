/**
 * 事件事件
 */
Ext.define('build.adverseevent.base.EventTimeSet', {
    extend: 'Ext.form.FieldSet',
    width: 1200,
    initComponent: function () {
        var me = this;
        this.initPartsInfo();
        Ext.apply(this, {
            title: '<b style="font-size: 15px;color: black;">事件时间</b>',
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
                items: [me.starttime, me.endtime]
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

        me.starttime = Ext.create('build.ux.DateTimeField', {
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            name: 'starttime',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            maxValue: getAfterDate(1),
            fieldLabel: '事件发生时间',
            listeners: {
                select: function (dateField, date) {
                    var eDate = me.endtime.getValue().valueOf();
                    if (eDate != "") {
                        var sDate = date.valueOf();
                        if ((eDate - sDate) <= 0) {
                            App.getApplication().msg('提示', '事件发生时间不能大于事件上报时间！', 2000);
                            me.starttime.setValue("");
                        }
                    }
                }
            }
        });
        me.endtime = Ext.create('build.ux.DateTimeField', {
            // beforeLabelTextTpl: redTpl,
            // allowBlank: false,
            name: 'endtime',
            format: 'Y-m-d H:i:s',
            submitFormat: 'Y-m-d H:i:s',
            maxValue: getAfterDate(1),
            fieldLabel: '事件上报时间',
            listeners: {
                select: function (dateField, date) {
                    var sDate = me.starttime.getValue().valueOf();
                    if (sDate != "") {
                        var eDate = date.valueOf();
                        if ((eDate - sDate) <= 0) {
                            App.getApplication().msg('提示', '事件上报时间不能小于事件发生时间！', 2000);
                            me.endtime.setValue("");
                        }
                    }
                }
            }

        });

    },
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});