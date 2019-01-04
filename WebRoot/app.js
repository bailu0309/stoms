var mainTab;
var qufg;
Ext.application({
    name: 'App',
    navView: null,
    msgCt: null,//定义消息弹出窗
    launch: function () {
        Ext.Ajax.timeout = 600000;//请求超时时间改为600秒
        this.cookies = Ext.create('Ext.state.CookieProvider', {
            expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)) //30 days
        });
        Ext.state.Manager.setProvider(this.cookies);
        this.themeCookie = this.cookies.get("themes");
        qufg = this.fg = this.cookies.get("themes");
        this.themeCookie = !this.themeCookie || this.themeCookie == '' ? 'crisp' : 'crisp';//获取用户主题
        this.loadView();//预加载界面
        Ext.getBody().mask('正在加载用户信息...');
        this.loadUserData();//加载用户信息和菜单

    },
    loadView: function () {
        this.mainToolBar = Ext.create('Ext.toolbar.Toolbar', {
            layout: 'hbox',
            autoScroll: true,
            baseCls: 'topnav'
        });
        var v = 0;
        var hideMain = false;
        mainTab = this.mainTab = Ext.create('App.main.MainTab', {
            region: 'center',
            activeTab: v,
            hideMain: hideMain,
            defaults: {
                bodyPadding: 1,
                autoScroll: true
            }
        });
        //加载顶部
        this.topPanel = Ext.create('App.main.TopPanel', {
            region: 'north'
        });
        //加载底部
        this.southPanel = Ext.create('App.main.BottomPanel', {
            region: 'south'
        });
        //外层panel
        this.mainPanels = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'border',
            tbar: this.mainToolBar,
            items: [this.mainTab, this.southPanel]
        });
        //从cookie主题
        var themeCombo = Ext.ComponentQuery.query('combo', this.southPanel)[0];
        if (qufg == undefined) {
            themeCombo.setValue('fgxlcd');
        } else {
            themeCombo.setValue(qufg);
        }
        this.setActiveStyleSheet(this.themeCookie);
        themeCombo.on('select', function (combo) {
            this.setActiveStyleSheet(combo.getValue());
            this.cookies.set("themes", combo.getValue());
            window.location.href = 'main.jsp';
        }, this);
        //加载左侧栏
        this.nv = Ext.create('App.main.NavigationPanel', {
            region: 'west',
            hidden: (qufg == "fgxlcd" || qufg == undefined),
            listeners: {
                scope: this,
                menuClick: function (d) {
                    var tabItem = mainTab.getComponent(d.id);
                    if (tabItem) {
                        mainTab.setActiveTab(tabItem);
                    } else {
                        if (d.jsClassFile != undefined && d.jsClassFile != "") {
                            var p = Ext.create('Ext.panel.Panel', {
                                id: d.id,
                                icon: d.icon,
                                title: d.menuName,
                                closable: true,
                                closeAction: 'hide',
                                border: false,
                                layout: 'fit',
                                itmes: [],
                                listeners: {
                                    'beforeclose': function () {
                                        //防止硬关闭
                                        Ext.getCmp(mainId).remove(p, false);
                                        return false;
                                    }
                                }
                            });
                            mainTab.add(p).show();
                            p.updateLayout();
                            p.mask('正在加载[' + d.menuName + ']模块信息...');
                            Ext.require(d.jsClassFile, function () {
                                var s = Ext.create(d.jsClassFile);
                                p.add(s);
                                p.updateLayout();
                                p.unmask();
                            }, this);
                        } else if (d.actionPath != undefined && d.actionPath != "") {
                            var p = Ext.create('Ext.panel.Panel', {
                                id: d.id,
                                icon: d.icon,
                                title: d.menuName,
                                closable: true,
                                closeAction: 'hide',
                                html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + d.actionPath + '"></iframe>',
                                border: false,
                                listeners: {
                                    'beforeclose': function () {
                                        //防止硬关闭
                                        Ext.getCmp(mainId).remove(p, false);
                                        return false;
                                    }
                                }
                            });
                            mainTab.add(p).show();
                            p.updateLayout();
                        }
                    }
                }
            }
        })
    },
    loadUserData: function () {
        var box = Ext.ComponentQuery.query('box', this.topPanel)[1];
        box.update('<div class="app_time" > <span id="liveclock" >' +
            Ext.Date.format(new Date(), 'Y-m-d H:i:s l') +
            '</span></div><span class="app_time" ><a href="javascript:xgmm()" style="color:white;text-decoration:none;">' + userName + '</a>,欢迎您！</span>');
        this.setMenu();//加载菜单
    },
    setMenu: function () {
        if (status != '0') {
            Ext.Ajax.request({
                url: globalCtx + '/basic/LoginController/getUserTbar.sdo?userId=' + userId,
                scope: this,
                success: function (response) {
                    Ext.getBody().unmask();
                    setInterval(this.setTime, 1000);//开启时钟
                    var menuData = response.responseText.split('$');
                    for (var i = 0; i < menuData.length; i++) {
                        if (!Ext.isEmpty(menuData[i])) {
                            this.mainToolBar.add(Ext.JSON.decode(menuData[i]));
                        }
                    }
                    //showMain("build.order.OrderPanel", "289", "images/menu/nav01.png", "体检预约");
                }
            });
        }

        Ext.Ajax.request({
            url: globalCtx + '/basic/LoginController/getUserTree.sdo?userId=' + userId,
            scope: this,
            success: function (response) {
                Ext.getBody().unmask();
                setInterval(this.setTime, 1000);//开启时钟
                var menuData = Ext.JSON.decode(response.responseText);
                if (menuData.result == 'error') {
                    window.location.href = 'login.jsp';
                    return;
                }
                if (status != '0') {
                    this.nv.removeNV();
                    this.nv.createNV(menuData);
                }
                this.navView = Ext.create('Ext.container.Viewport', {
                    layout: 'border',
                    items: [this.topPanel, this.nv, this.mainPanels]
                });
            }
        });

    },
    setTime: function () {
        var date = Ext.Date.format(new Date(), 'Y-m-d H:i:s l');
        document.getElementById('liveclock').innerHTML = date;
    },
    setActiveStyleSheet: function (title) {
        this.setDocumentTheme(document, title);
        var iframes = Ext.query('iframe');
        for (var i = 0; i < iframes.length; i++) {
            this.setDocumentTheme(iframes[i].contentWindow.document, title);
        }
    },
    /**
     * 刷新documnet主题
     * @param {} doc documnet对象
     * @param {} themeTitle CSS的title
     */
    setDocumentTheme: function (doc, themeTitle) {
        var i, a, links = doc.getElementsByTagName("link"), len = links.length;
        for (i = 0; i < len; i++) {
            a = links[i];
            if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
                a.disabled = true;
                if (a.getAttribute("title") == themeTitle) a.disabled = false;
            }
        }
    },
    collapse: function () {
        this.topPanel.hide();
        this.nv.collapse();
    },
    expand: function () {
        this.topPanel.show();
        this.nv.expand();
    },
    msg: function (title, format, delay) {
        this.msgCt = Ext.dom.Helper.insertFirst(document.body, {id: 'msg-div'}, true)
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.dom.Helper.append(this.msgCt, this.createBox(title, s), true);
        m.hide();
        m.slideIn('t', {duration: 200}).ghost("b", {delay: delay == undefined ? 2000 : delay, remove: true});
    },
    createBox: function (t, s) {
        return '<div class="msg ' + Ext.baseCSSPrefix + 'border-box"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },
    init: function () {
        //防止按backspace回退
        // Ext.create('Ext.util.KeyNav', Ext.getBody(), {
        //     ignoreInputFields: true,//忽略里面的filed的 事件响应 不阻止
        //     'backspace': {
        //         fn: function (e) {
        //             e.stopEvent()
        //         }
        //     }
        // });
        new Ext.util.KeyNav({
            target: Ext.getBody(),
            ignoreInputFields: true,
            'backspace': {
                fn: function (e) {
                    e.stopEvent()
                }
            }
        });
    }
});

/**
 * 定义顶部面板
 */
Ext.define('App.main.TopPanel', {
    extend: 'Ext.toolbar.Toolbar',
    border: false,
    style: 'margin-top:-1px;margin-left:-28px;',
    baseCls: 'navbg',
    height: 52,
    items: [{
        xtype: 'box',
        html: '<div id="changeClass" ><img src="images/login/logonqc.png"  height="52" border="0" id="left1"/></div>'
    }, '->', {
        xtype: 'box',
        html: ''
    }, {
        iconAlign: 'left',
        iconCls: 'app_logout',
        xtype: 'button',
        text: '退出',
        scope: this,
        handler: function () {
            Ext.MessageBox.confirm('提示', "确定退出登录？", function (btn) {
                if (btn != 'yes') {
                    return;
                }
                Ext.Ajax.request({
                    url: globalCtx + '/basic/LoginController/logout.sdo',
                    scope: this,
                    success: function (response) {
                        window.location.href = 'login.jsp';
                    }
                });
            });
        }
    }]
});

/**
 * 定义底部面板
 */
Ext.define('App.main.BottomPanel', {
    extend: 'Ext.panel.Panel',
    border: true,
    layout: 'column',
    height: 25,
    scope: this,
    defaults: {
        border: false,
        anchor: '100%',
        xtype: 'panel'
    },
    items: [{
        columnWidth: .65,
        html: '<div class="app_version">护理质控平台 V1.1.5</div> ' +
        '<a class="app_version" href="#" title="查看系统更新日志" onclick="NQC.showSystem()">更新日志</a>'
    }, {
        width: 300,
        html: ''
    }, {
        columnWidth: .1,
        html: '&nbsp;'
    }, {
        xtype: 'toolbar',
        style: 'margin-top:-6px;float:right;',
        items: []
    }, {
        style: 'float:right;',
        width: 85,
        items: [{
            xtype: 'toolbar',
            style: 'margin-top:-6px;margin-left:-8px;',
            items: [{
                text: '全屏操作',
                id: 'qpczxsyc',
                xtype: 'button',
                width: 90,
                iconCls: 'fullscreen',
                handler: function (btn) {
                    //如果是下来菜单
                    if (qufg == "fgxlcd" || qufg == undefined) {
                        if (App.getApplication().topPanel.hidden) {
                            App.getApplication().topPanel.show();
                            btn.setText('全屏操作');
                            btn.setIconCls('fullscreen');
                        } else {
                            App.getApplication().topPanel.hide();
                            btn.setText('退出全屏');
                            btn.setIconCls('fullscreen_exit');
                        }
                    } else {
                        if (App.getApplication().nv.collapsed) {
                            App.getApplication().expand();
                            btn.setText('全屏操作');
                            btn.setIconCls('fullscreen');
                        } else {
                            App.getApplication().collapse();
                            btn.setText('退出全屏');
                            btn.setIconCls('fullscreen_exit');
                        }
                    }
                }
            }]
        }]
    }, {
        style: 'float:right;',
        width: 160,
        items: [{
            xtype: 'combo',
            fieldLabel: '菜单风格',
            labelWidth: 60,
            displayField: 'name',
            valueField: 'value',
            scope: this,
            editable: false,
            width: 155,
            labelStyle: 'cursor:move;',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: [{
                    value: 'fgxlcd',
                    name: '下拉菜单'
                }/*, {
                    value: 'fgsfq',
                    name: '手风琴'
                }*/]
            })
        }]
    }]
});

/**
 * 定义导航面板
 */
Ext.define('App.main.NavigationPanel', {
    extend: 'Ext.panel.Panel',
    border: false,
    width: 200,
    layout: 'accordion',
    title: '导航',
    split: true,
    collapsible: true,
    requires: ['build.util.MenuView'],
    removeNV: function () {
        this.removeAll();
    },
    createNV: function (menuData) {
        if (menuData == null || menuData == "" || menuData == undefined) {
            return;
        }
        for (var i = 0; i < menuData.length; i++) {
            this.add(Ext.create('build.util.MenuView', {
                title: '<div class="app_small_img" ><img  src = "' + menuData[i].openIcon + '"></img>' + menuData[i].menuName + '</div>',
                parentPanel: this,
                store: Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true,
                        children: menuData[i].children
                    }
                })
            }))
        }
    },
    onTreeClick: function (record) {
        this.fireEvent('menuClick', record.data);
    },
    initComponent: function () {
        this.items = [];

        this.callParent();
    }
});

var mainId = Ext.id();

/**
 * 定义主面板
 */
Ext.define('App.main.MainTab', {
    extend: 'Ext.tab.Panel',
    id: mainId,
    hideMain: false,
    requires: ['Ext.ux.TabReorderer', 'Ext.ux.TabCloseMenu', 'Ext.grid.*', 'Ext.menu.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'],
    border: false,
    plugins: ['tabreorderer', Ext.create('Ext.ux.TabCloseMenu', {
        closeTabText: '关闭当前页',
        closeOthersTabsText: '关闭其他页',
        closeAllTabsText: '关闭所有页'
    })],
    layout: 'hbox',
    defaults: {
        bodyPadding: 2,
        autoScroll: true,
        closable: true,
        border: false
    },
    initComponent: function () {
        var me = this;
        loadData();
        var its, its2;
        if (roleId == '100046') {
            if (status == '0') {
                its = [Ext.create('build.institution.MedicalInstitutionApplyPanel', {title: '机构信息'})];
            } else {
                its = [Ext.create('build.adverseevent.PressureSoresPanel', {title: '压疮事件上报'})];
            }
        } else if (roleId == '100047') {
            its = [Ext.create('build.audit.CityAuditPanel', {title: '市级质控审核'})];
        } else if (roleId == '100048') {
            its = [Ext.create('build.audit.ProvAuditPanel', {title: '省级质控审核'})];
        }
        // this.miwin = Ext.create('build.institution.MedicalInstitutionApplyWindow', {});
        // this.miwin.show();
        Ext.apply(this, {
            layout: 'column',
            frame: false,
            border: false,
            defaults: {split: true},
            items: its
        });

        if (epwd == 1) {
            xgmm();
        }

        this.callParent();


    }

});

