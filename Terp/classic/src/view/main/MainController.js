/**
 * Created by Andrew on 2021-08-12.
 */
Ext.define('Terp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.tab.Bar',
        'Ext.tab.Panel',
        'Ext.util.Base64',
        'Ext.util.Cookies',
        'Ext.ux.TabCloseMenu',
        'Terp.main.view.loginform.LoginForm',
        'Terp.view.main.leftmenu.LeftMenu',
        'Terp.view.main.mainboard.Mainboard',
        'Terp.view.main.mainstatusbar.MainStatusBar',
        'Terp.view.tsoft.componentbase.TsoftPanel'
    ],

    control: {
        'main': {
            boxready: 'onMain_BoxReady'
        },
        'tsoftpanel[reference=MainTop]': {
            boxready: 'onMainTop_BoxReady'
        },
        'tsoftpanel[reference=MainLeft]': {
            boxready: 'onMainLeft_BoxReady',
            login_success: 'onMainLoginForm_Login_Success',
            login_error: 'onMainLoginForm_Login_Error',
            login_fail: 'onMainLoginForm_Login_Fail'
        },
        'tsoftpanel[reference=MainBottom]': {
            boxready: 'onMainBottom_BoxReady',
            logout_success: 'onLogout_Success',
            logout_error: 'onLogout_Error',
            logout_fail: 'onLogout_Fail'
        },
        'tsoftpanel[reference=MainCenter]': {
            boxready: 'onMainCenter_BoxReady'
        }
    },

    init: function () {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.commonFn.clearCommonStore('BeforeLoginCompany');
        me.commonFn.loadCommonStore('BeforeLoginCompany', [{ actiondata: 'all' }]);

        me.view = me.getView();
        me.MainTop = me.lookupReference('MainTop');
        me.MainLeft = me.lookupReference('MainLeft');

        if (Ext.util.Cookies.get(window.UserConnectionManager.SITE_ID + 'AutoLogOff') === '1') {
            me.commonFn.toastMessage('세션 허용시간 동안 서버에 아무 요청이 없어서 자동으로 로그아웃 되었습니다!','t');
        }
        else if (Ext.util.Cookies.get(window.UserConnectionManager.SITE_ID + 'AutoLogOff') === '2') {
            me.commonFn.toastMessage('같은 아이디로 중복 접속 또는 시스템 업그레이드가 발생하여 자동 로그아웃 되었습니다!','t');
        }
        Ext.util.Cookies.clear(window.UserConnectionManager.SITE_ID + 'AutoLogOff');
        Ext.util.Cookies.clear(window.UserConnectionManager.SITE_ID + 'SS');

        if (window.UserConnectionManager.SessionChecking) {
            clearInterval(window.UserConnectionManager.SessionChecking);
        }
        if (window.UserConnectionManager.ErpMsgChecking) {
            clearInterval(window.UserConnectionManager.ErpMsgChecking);
        }

        me.IsLogon = (Ext.util.Cookies.get(window.UserConnectionManager.SITE_ID + 'LON') === '1');
        if (!me.IsLogon) {
            Ext.util.Cookies.set(window.UserConnectionManager.SITE_ID + 'LON', '0');
            window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'LU', '')
        }
        else {
            Ext.util.Cookies.set(window.UserConnectionManager.SITE_ID + 'LON', '1');
            var savedLoginUserData = window.localStorage.getItem(window.UserConnectionManager.SITE_ID + 'LU');
            me.LoginUserInfo = Ext.isEmpty(savedLoginUserData) ? {} : Ext.decode(decodeURIComponent(Ext.util.Base64.decode(savedLoginUserData)));
            me.getViewModel().set('loginUser', me.LoginUserInfo);

            window.UserConnectionManager.LogonUserId = me.LoginUserInfo.id_user;

            window.UserConnectionManager.SessionChecking = setTimeout(window.UserConnectionManager.SessionCheck, window.UserConnectionManager.SessionCheckingInterval);

            //window.UserConnectionManager.ErpMsgCheckingInterval = 10000;
            window.UserConnectionManager.ErpMsgChecking = setTimeout(window.UserConnectionManager.ErpMsgCheck, window.UserConnectionManager.ErpMsgCheckingInterval);
        }
    },

    onMain_BoxReady: function (c) {
        var me = this;
        me.addMainContentsViews();
    },

    addMainContentsViews: function() {
        var me = this;

        if (me.MainLeft) me.MainLeft.removeAll(true);
        if (me.MainCenter) {
            console.log(me.MainCenter);
            me.view.remove(me.MainCenter);
        }
        if (me.MainBottom) me.view.remove(me.MainBottom);

        me.IsLogon = (Ext.util.Cookies.get(window.UserConnectionManager.SITE_ID + 'LON') === '1');
        if (!me.IsLogon) {
            me.MainLeft.setTitle('ERP 로그인');
            me.MainLeft.setMaxWidth(200);
            me.MainLeft.setWidth(200);
            me.MainLeft.add(me.getMainLoginFormView());
            me.view.add(me.getMainHomeView());
            me.commonFn.clearCommonStores();
        }
        else {
            me.MainLeft.setTitle(me.commonFn.getUserInfo().nm_user);
            me.MainLeft.setMaxWidth(400);
            me.MainLeft.setWidth(230);
            me.MainLeft.add(me.getMainLeftMenuView());
            me.view.add(me.getMainTabPanelView());
            me.view.add(me.getMainBottomView());
            me.commonFn.loadCommonStores();
        }
    },
    getMainLoginFormView: function() {
        var me = this;
        me.MainLoginForm = Ext.create('Terp.main.view.loginform.LoginForm', {
            reference: 'MainLoginForm',
            header: false,
            cls: 'main-login-form',
            bodyPadding: '20 10'
        });
        return me.MainLoginForm;
    },
    getMainHomeView: function() {
        var me = this;
        me.MainCenter = Ext.create('Terp.view.tsoft.componentbase.TsoftPanel', {
            reference: 'MainCenter',
            region: 'center',
            cls: 'main-center',
            flex: 1,
            html: '<iframe id="frm_home" frameborder="0" scrolling="auto" width="100%" height="100%" src="http://engsoft.kr?bo_table=talent"></iframe>'
            // html :'이화면은 에어테크엔지니어링의 업무를 위한 화면 입니다'
            // html: '<iframe id="frm_home" frameborder="0" scrolling="auto" width="100%" height="100%" src="http://airtecheng.co.kr"></iframe>'
        });
        console.log(me.MainCenter);
        return me.MainCenter;
    },
    getMainLeftMenuView: function() {
        var me = this;
        me.MainLeftMenu = Ext.create('Terp.view.main.leftmenu.LeftMenu', {
            reference: 'MainLeftMenu',
            header: false,
            border: false,
            flex: 1,
            cls: 'main-left-menu'
        });
        return me.MainLeftMenu;
    },
    getMainTabPanelView: function() {
        var me = this;
        me.MainCenter = Ext.create('Ext.tab.Panel', {
            reference: 'MainCenter',
            region: 'center',
            cls: 'main-center',
            name: 'mainbar',
            flex: 1,
            tabBar: {
                xtype: 'tabbar',
                cls: 'main-tabbar',
                defaults: {
                    width : 150 ,
                    maxWidth: 200
                }
            },

            plugins: [
                {
                    ptype: 'tabclosemenu',
                    pluginId: 'maintabclosemenu',
                    closeTabText: '현재 탭 닫기',
                    closeOtherTabsText: '다른 탭 닫기',
                    closeAllTabsText: '모든 탭 닫기'
                }
            ],
            items: [

                {
                    xtype : 'mainboard',
                    title : 'Home',
                    iconCls: 'tsoft-home',
                    closable: false
                },

            ]
        });
        console.log(me.MainCenter);
        return me.MainCenter;
    },
    getMainBottomView: function() {
        var me = this;
        me.MainBottom = Ext.create('Terp.view.tsoft.componentbase.TsoftPanel', {
            reference: 'MainBottom',
            region: 'south',
            cls: 'main-bottom',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'mainstatusbar',
                    reference: 'MainStatusBar'
                }
            ]
        });
        return me.MainBottom;
    },

    onMainTop_BoxReady: function (p) {
        var me = this;
    },

    onMainLeft_BoxReady: function (p) {
        var me = this;
    },

    onMainLoginForm_Login_Success: function (data) {
        var me = this;
        var userName = data.nm_user;
        var dtPwChange = Ext.Date.format(Ext.Date.parse(data.dt_pwchange.substring(0,8),'Ymd'),'Y년 m월 d일');
        me.commonFn.toastMessage(Ext.String.format('환영합니다! {0}님!<br>&nbsp;<br>다음 비밀번호 변경일은 {1}입니다!', userName, dtPwChange), 't');
        me.getViewModel().set('loginUser', data);
        me.addMainContentsViews();
    },

    onMainLoginForm_Login_Error: function (data) {
        var me = this;
    },

    onMainLoginForm_Login_Fail: function (data) {
        var me = this;
    },

    onMainBottom_BoxReady: function (p) {
        var me = this;
    },
    onLogout_Success: function (data) {
        var me = this;
        me.getViewModel().set('loginUser', {});
        me.addMainContentsViews();
    },
    onLogout_Error: function (data) {
        var me = this;
    },
    onLogout_Fail: function (data) {
        var me = this;
    },

    onMainCenter_BoxReady: function (p) {
        var me = this;
    }

});