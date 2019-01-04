/**
 * Created by Administrator on 2015/9/7.
 */
Ext.define('build.util.selector.ComboBoxTree', {
    extend: "Ext.form.field.ComboBox",
    alias: 'build.util.selector.comboboxtree',
    requires: ["Ext.tree.Panel"],
    initComponent: function () {
        var self = this;
        self.myValue = '';
        self.myShowValue = '';
        Ext.apply(self, {
            fieldLabel: self.fieldLabel,
            labelWidth: self.labelWidth
        });
        self.callParent();
    },
    getValue: function () {
        var self = this;
        return self.myValue;
    },
    getShowValue: function () {
        var self = this;
        return self.myShowValue;
    },
    chd: function (node, check) {
        node.set('text', node.get('name'));
        if (node.isNode) {
            node.eachChild(function (child) {
                this.chd(child, false);
            }, this);
        }
    },
    createPicker: function () {
        var self = this;
        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: globalCtx + '/TaskController/listOrg.sdo'
            }
        });
        self.picker = Ext.create('Ext.tree.TreePanel', {
            height: 300,
            maxHeight: 300,
            autoScroll: true,
            floating: true,
            focusOnToFront: false,
            shadow: true,
            ownerCt: this.ownerCt,
            useArrows: true,
            store: store,
            rootVisible: false,
            listeners: {
                itemclick: function (node, checked) {
                    var selectName, selectValue;
                    if (checked.data.leaf == true) {
                        selectName = checked.data.name;
                        selectValue = checked.data.id;
                        self.setValue(selectValue);// 显示值
                        self.setRawValue(selectName);// 隐藏值
                        self.myValue = selectValue;
                        self.myShowValue = selectName;
                        self.picker.hide();
                    } else {
                        self.myValue = '';
                        self.myShowValue = '';
                    }
                },
                load: function () {
                    var node = self.picker.getRootNode();
                    self.picker.collapseAll();
                    self.chd(node, false);
                }
            }
        });
        return self.picker;
    },
    reLoad: function () {
        var store = this.getPicker().getStore();
        store.setProxy({
            type: 'ajax',
            url: globalCtx + '/TaskController/listOrg.sdo',
            extraParams: {
                name: 'test'
            }
        });
        store.load();
    },
    reset: function () {
        this.setValue('');// 显示值
        this.setRawValue('');// 隐藏值
    },
    displayField: 'name',
    editable: false,
    //queryMode: 'local',
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'x-form-trigger',
    valueField: 'id'
});
