Ext.define('build.basic.SystemLogWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.form.Panel'
    ],
    initComponent: function () {
        var me = this;
        this.initStore();
        this.initColumn();
        this.positions = [];
        me.SystemLogPanel = Ext.create('build.basic.SystemLogShowPanel', {
            width: '100%',
            height: 300,
            region: 'center',
            border: true
        });

        Ext.apply(this, {
            width: 400,
            height: 300,
            autoScroll: true,
            closeAction: 'hide',
            plain: true,
            shadow: true,
            resizable: true,
            border: true,
            items: [me.SystemLogPanel]
        });
        this.callParent();

    },
    initStore: function () {
        var me = this;
    },
    onRender: function (ct, position) {
        this.superclass.onRender.call(this, ct, position);
    },
    afterShow: function () {
        this.superclass.afterShow.call(this);
        this.on('move', function () {
            // this.positions.remove(this.pos);
            // this.task.cancel();
        }, this);
    },
    animShow: function () {
        this.pos = 1;
        // while (this.positions.indexOf(this.pos) > -1)
        //     this.pos++;
        this.positions.push(this.pos);
        this.setSize(250, 150);
        this.el.alignTo(document, "br-br", [-10, -10 - ((this.getSize().height + 10) * this.pos)]);
        this.el.slideIn('b', {
            duration: 2,
            callback: this.afterShow,
            scope: this
        });
    },
    animHide: function () {
        this.positions.remove(this.pos);
        this.el.ghost("b", {
            duration: 2,
            remove: true,
            scope: this,
            callback: this.destroy
        });
    },
    initColumn: function () {
        var me = this;
    },
    loadData: function () {
        this.SystemLogPanel.loadData();
    }
});