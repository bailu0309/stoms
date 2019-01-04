Ext.override(Ext.form.CheckboxGroup, {//这个方法得名可以随便写,但是我用了循环复制,统一是setValue方法名,所以方便使用,要不然方法名不一样还得判断是不是CheckboxGroup控件在用定义的方法名赋值
    setValue: function (val) {  //多个选项值以逗号分隔的
        val = "," + val + ",";
        this.items.each(function (item) {
            if (val.indexOf("," + item.inputValue + ",") > -1) {
                item.setValue(true);
            } else {
                item.setValue(false);
            }
        });
    },
    clearValue: function () {  // 清空所有值
        this.items.each(function (item) {
            item.setValue(false);
        });
    }
});
Ext.override(Ext.form.RadioGroup, {
    setValue: function (v) {
        if (this.rendered)
            this.items.each(function (item) {
                item.setValue(item.inputValue === v);
            });
        else {
            for (var k in this.items) {
                if (this.items[k] && this.items[k].inputValue) {
                    this.items[k].checked = this.items[k].inputValue == v;
                }
            }
        }
    }
});

Ext.define('Model', {
    extend: 'Ext.data.Model',
    idProperty: 'fid'
});
blankXTemplate = Ext.create('Ext.XTemplate',
    '<tpl for=".">',
    '<div class="x-boundlist-item" style="height:20px">{name}</div>',
    '</tpl>'
);
redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

