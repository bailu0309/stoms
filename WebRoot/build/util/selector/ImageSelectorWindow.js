/*
 * 菜单图片选择selector
 * */
Ext.define('build.util.selector.ImageSelectorWindow', {
	extend: 'Ext.window.Window',
	title: '选择图片',
	border: false ,
	width:640,
	height:400,
	layout: 'fit',
	parentPanel : null,
	modal : true,
	frame : true,
	closeAction : 'hide',
	buttonAlign : 'center',
	initComponent: function() {
		Ext.util.CSS.swapStyleSheet('imagechoser','css/imageChooser.css');
		Ext.define('image', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.imageStore = new Ext.data.TreeStore({
                model: 'image',
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    url:globalCtx+'/basic/MenuController/searchPic.sdo',
                    reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
                },
                folderSort: true
        });
		this.imageView = Ext.create('Ext.view.View',{
			uses: 'Ext.data.Store',
			singleSelect: true,
			autoScroll: true,
			store:this.imageStore,
            cls: 'img-chooser-view',
            listeners: {
                scope: this,
              //  selectionchange: this.onIconSelect,
                itemdblclick: this.selectImage
            },
		    overItemCls: 'x-view-over',
		    itemSelector: 'div.thumb-wrap',
		    tpl: [
            '<tpl for=".">',
                '<div class="thumb-wrap app_thumb" >',
                    '<div class="thumb">',
                        '<img alt="{name}"  src="'+globalCtx+'/{url}" />',
                    '</div>',
                    '<span>{name}</span>',
                '</div>',
            '</tpl>'
   			 ]
		});
		
		Ext.apply(this, {
			items:[this.imageView]
		});
		
		this.callParent();
	},
	selectImage:function(){
		var sImage = this.imageView.selModel.getSelection()[0];
        if (sImage) {
	        if(this.parentPanel==null){
				Ext.Msg.alert("提示", "请将调用类的域传进来！");
			}else if(this.parentPanel.selectImage== undefined){
				Ext.Msg.alert("提示", "请实现调用类的selectImage()方法！");
			}else{
				this.parentPanel.selectImage(sImage.get('url'));
			}
            this.hide();
            this.reset();
        }
	},
	/*
	 * 根据传进来的值选择相应的图片
	 * 
	 * */
	setSelectimage:function(imgurl){
		var imgurl = imgurl.indexOf("32") == -1? 'images/menu/32/'+imgurl:imgurl;
		this.imageView.getStore().each(function(r){
			
			if(r.get('url') == imgurl){
				this.imageView.getSelectionModel().select(r);
				return;
			}
		},this)
	},
	reset:function(){
		this.imageView.getSelectionModel().deselectAll();
	}
});