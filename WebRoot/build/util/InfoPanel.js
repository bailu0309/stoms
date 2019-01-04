/*
 * 数据查询功能
 * */
var wd;
var hd;
Ext.define('build.util.InfoPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    layout: 'fit',
    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
    xtype: 'cell-editing',
    initComponent: function () {
        Ext.apply(this, {
            layout: 'border',
            defaults: {split: true}, //是否有分割线
            html: '模块正在开发中...'
        });
        this.callParent();
    },

    /*
     *  错误处理
     * */
    exception: function () {
        App.getApplication().msg('出错', '后端未正确返回数据', 2000);
    }
});
