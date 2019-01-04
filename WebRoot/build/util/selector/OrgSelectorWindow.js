/*
 * 菜单配置selector Window
 * */
Ext.define('build.util.selector.OrgSelectorWindow', {
    extend: 'Ext.window.Window',
    parentPanel: null,
    type: 1,
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.data.TreeStore'],
    value: null,//用于selector 的 getvalue
    nameValue: null,//用户selector 的getName
    initComponent: function () {
        var scope = this;
        this.selectName = '';
        this.selectValue = '';
        this.orgStore = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: globalCtx + '/TaskController/listOrg.sdo',
                extraParams: {type: scope.type}
            }
        });
        //菜单树
        this.orgTree = Ext.create('Ext.tree.TreePanel', {
            store: this.orgStore,
            region: 'center',
            rootVisible: false,
            unStyled: true,
            reserveScrollbar: true,
            useArrows: true,
            border: false,
            scope: this,
            listeners: {
                scope: this,
                itemclick: function (node, checked) {
                    if (checked.data.leaf == true) {
                        scope.selectName = checked.data.name;
                        scope.selectValue = checked.data.id;
                    } else {
                        scope.selectName = '';
                        scope.selectValue = '';
                    }
                },
                load: function () {

                }
            }
        });
        Ext.apply(this, {
            title: '分配执行机构<font style="color: blue;font-size: 8px;">（注：重置用于清除原有执行机构）</font>',
            width: 330,
            height: 400,
            layout: 'border',
            border: false,
            modal: true,
            frame: true,
            closeAction: 'hide',
            buttonAlign: 'center',
            buttons: [{
                text: '确定',
                scope: this,
                iconCls: 'confirm',
                handler: this.configerOrg
            }, {
                text: '重置',
                scope: this,
                iconCls: 'cancel',
                handler: this.resetOrg
            }, {
                text: '取消',
                iconCls: 'cancel',
                scope: this,
                handler: this.cancel
            }],
            items: [this.orgTree]
        });
        this.callParent();
    },
    /*
     * 菜单selector界面全局事件初始化
     * */
    initEvents: function () {
        this.items.on('afterrender', this.initMethod(), this);
    },
    /*
     * 菜单selectorinit 方法
     * */
    initMethod: function () {
        this.setValue();
        //this.orgTree.expandAll();
    },
    expandAll: function () {
        this.orgTree.expandAll();
    },
    //private xfor orgTree checkchange event
    nodep: function (node) {
        var bnode = true;
        Ext.Array.each(node.childNodes, function (v) {
            if (!v.data.checked) {
                bnode = false;
                return;
            }
        });
        return bnode;
    },
    parentnode: function (node) {
        if (node.parentNode != null) {
            if (this.nodep(node.parentNode)) {
                node.parentNode.set('checked', true);
            } else {
                node.parentNode.set('checked', false);
            }
            this.parentnode(node.parentNode);
        }
    },
    chd: function (node, check) {
        node.set('text', node.get('name'));
        if (node.get('checked') == null) {
            //node.set('checked', false);
        } else {
            //node.set('checked', false);
        }
        if (node.isNode) {
            node.eachChild(function (child) {
                this.chd(child, false);
            }, this);
        }
    },
    //调用界面的方法返回选择的值
    configerOrg: function () {
        if (this.parentPanel == null) {
            Ext.Msg.alert("提示", "请将调用类的域传进来！");
        } else if (this.parentPanel.configerOrg == undefined) {
            Ext.Msg.alert("提示", "请实现调用类的configerOrg()方法！");
        } else {
            this.parentPanel.configerOrg(this.getValue(), this.getNames());
        }
        this.hide();
        this.reset();
    },
    //调用界面的方法返回选择的值
    resetOrg: function () {
        var me = this;
        Ext.MessageBox.confirm('提示', "重置将会清空原有的执行机构，是否继续执行？", function (btn) {
            if (btn != 'yes') {
                return;
            }
            if (me.parentPanel == null) {
                Ext.Msg.alert("提示", "请将调用类的域传进来！");
            } else if (me.parentPanel.configerOrg == undefined) {
                Ext.Msg.alert("提示", "请实现调用类的configerOrg()方法！");
            } else {
                me.parentPanel.configerOrg('', '');
            }
            me.hide();
            me.reset();
        });
    },
    getValue: function () {
        if (this.selectValue == '') {
            Ext.Msg.alert("提示", "请选择一个卫生机构！");
        }
        return this.selectValue;
    },
    getNames: function () {
        if (this.selectName == '') {
            Ext.Msg.alert("提示", "请选择一个卫生机构！");
        }
        return this.selectName;
    },
    setValue: function (value) {
        this.reset();
        if (value) {
            var ids = value.toString().split(",");
            var node = this.orgTree.getRootNode();
            for (var i = 0; i < ids.length; i++) {
                this.insetNode(node, ids[i]);
            }
        }
    },
    //private for setvalue
    insetNode: function (node, id) {
        if (node.get('id') == id) {
            node.set('checked', true);
            this.orgTree.fireEvent('checkchange', node, true);
            this.parentnode(node);
            node.parentNode.expand();
        }
        if (node.isNode) {
            node.eachChild(function (child) {
                this.insetNode(child, id);
            }, this);
        }
    },
    //private for getvalue
    featchNode: function (node) {
        if (node.get('checked') == true && node.get('id') != 'root') {
            this.value.push(node.get('id'))
        }
        if (node.isNode) {
            node.eachChild(function (child) {
                this.featchNode(child);
            }, this);
        }
    },
    //private for getname
    featchNodeName: function (node) {
        if (node.get('checked') == true) {
            this.nameValue.push(node.get('name'))
        }
        if (node.isNode) {
            node.eachChild(function (child) {
                this.featchNodeName(child);
            }, this);
        }
    },
    /*
     * 清空
     */
    reset: function () {
        var node = this.orgTree.getRootNode();
        if (node.childNodes && node.childNodes.length > 1) {
            this.orgTree.collapseAll();
        } else {
            this.orgTree.expandAll();
        }
        this.chd(node, false);
    },
    /*
     * 关闭本页
     */
    cancel: function () {
        this.reset();
        this.hide();
    }
});