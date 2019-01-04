Ext.define('build.ux.AddressSelectPanel', {
    extend: 'Ext.form.Panel',
    parentPanel: null,
    targetId: '',
    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'],
    initComponent: function () {
        var scope = this;
        Ext.define('TisDqbmEty', {
            extend: 'Ext.data.Model',
            idProperty: 'id'
        });

        this.shiStore = Ext.create('Ext.data.JsonStore', {
            model: 'TisDqbmEty',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AddressController/listCity.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.xqStore = Ext.create('Ext.data.JsonStore', {
            model: 'TisDqbmEty',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AddressController/listXq.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.xzjdStore = Ext.create('Ext.data.JsonStore', {
            model: 'TisDqbmEty',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AddressController/listXzjd.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });
        this.cjsStore = Ext.create('Ext.data.JsonStore', {
            model: 'TisDqbmEty',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                url: globalCtx + '/AddressController/listCjs.sdo',
                reader: {type: 'json', totalProperty: 'total', rootProperty: 'invdata'}
            }
        });

        this.shicomb = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '市',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            labelWidth: 100,
            width: 380,
            labelAlign: 'right',
            displayField: 'area_short',
            valueField: 'area_code',
            store: this.shiStore,
            queryMode: 'remote',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                    scope.cityvalue = combo.value.substring(0, 4);
                    scope.xqcomb.clearValue();
                    scope.xqStore.load({params: {"area_code": scope.cityvalue}});
                }
            }
        });

        this.xqcomb = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '县/区',
            beforeLabelTextTpl: redTpl,
            allowBlank: false,
            editable: false,
            labelWidth: 100,
            width: 380,
            labelAlign: 'right',
            displayField: 'area_short',
            valueField: 'area_code',
            store: this.xqStore,
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function (combo, record, index) {
                    scope.xqvalue = combo.value.substring(0, 6);
                    scope.xzjdStore.load({params: {"area_code": scope.xqvalue}});
                }
            }
        });

        this.xxdz = Ext.create('Ext.form.field.Text', {
            labelWidth: 100,
            width: 380,
            fieldLabel: '详细地址',
            labelAlign: 'right',
            disabled: false,
            enableKeyEvents: true,
            scope: this
        });

        Ext.apply(this, {
            frame: false,
            width: 900,
            border: false,
            region: 'center',
            labelAlign: 'right',
            bodyStyle: 'padding:1px',
            items: [this.shicomb, this.xqcomb, this.xxdz]
        });
        this.callParent();
    },
    show: function () {
        this.callParent();
    },
    getRawValue: function () {
        var hkdz = this.xqcomb.getSelectedRecord().get('area_full') + this.xxdz.getValue();
        return hkdz;
    },
    getValue: function () {
        var hkdz_bm = this.xqcomb.getValue();
        return hkdz_bm;
    }
});