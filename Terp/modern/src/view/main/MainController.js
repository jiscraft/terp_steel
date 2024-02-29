/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Terp.view.eaList.EaList',
        'Terp.view.jcList.JcList',
        'Terp.view.wkOt.WkOt',
        'Terp.view.wkVac.WkVac'
    ],

    control: {
        'container[reference=main_login_form_card]': {
        },
        'container[reference=main_menu_card]': {
            activate: 'onActivate_MainMenuCard'
        }
    },



    init: function() {
        var me = this;
        me.view = me.getView();
        me.view.userInfo = null;

        me.splash_card = me.lookup('main_splash_card');
        me.login_form_card = me.lookup('main_login_form_card');
        me.login_form = me.lookup('main_login_form');
        me.main_menu_card = me.lookup('main_menu_card');

        me.main_menu_btns = [
            me.lookup('menu_btn_my'),
            me.lookup('menu_btn_apro'),
            me.lookup('menu_btn_rcv'),
            me.lookup('menu_btn_cc'),
            me.lookup('menu_btn_memo'),
            me.lookup('menu_btn_msg')
        ];

        Ext.defer(function() {
            me.setCardAnim('slide', 'top', 500);
            me.view.setActiveItem(me.login_form_card);
        },1000);
    },

    setCardAnim: function(type, direction, duration) {
        var me = this;
        me.view.getLayout().setAnimation({
            type: type,
            direction: direction,
            duration: duration
        });
    },

    onTap_LoginBtn: function(btn, e) {
        var me = this;
        var formValues = me.login_form.getValues();
        formValues.browser = Ext.browser.name;
        formValues.type = 'login';
        if (Ext.isEmpty(formValues.id_user)) {
            Ext.toast('사용자 아이디를 입력하세요!');
            return;
        }
        if (Ext.isEmpty(formValues.dc_pw)) {
            Ext.toast('비밀번호를 입력하세요!');
            return;
        }

        Ext.Ajax.request({
            url: '/ServerPage/login/UserAuthenticate.jsp',
            params: formValues,
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        me.onLoginSuccess(obj.data[0]);
                    }
                    else {
                        Ext.toast('사용자 정보가 존재하지 않습니다.');
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    onLoginSuccess: function(data) {
        var me = this;
        me.login_form.reset();
        me.login_form.getFields('id_user').setValue(data.id_user);
        me.view.userInfo = data;
        me.setCardAnim('slide', 'top', 500);
        me.lookup('logon_user_name').setHtml(data.nm_user);
        me.view.setActiveItem(me.main_menu_card);
    },

    onTap_LogoutBtn: function(btn, e) {
        var me = this;
        me.view.userInfo = null;
        me.setCardAnim('slide', 'bottom', 500);
        me.view.setActiveItem(me.login_form_card);
    },

    onTap_RefreshBtn: function(btn, e) {
        var me = this;
        me.getListCount();
    },

    onActivate_MainMenuCard: function(newCard, container, oldCard) {
        var me = this;
        me.getListCount();
    },

    getListCount: function(callback) {
        var me = this;
        for (var i = 0; i < me.main_menu_btns.length; i++) {
            me.main_menu_btns[i].setBadgeText('');
        }
        Ext.Ajax.request({
            url: '/ServerPage/gw/ea/ea_doc_count_mo.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.view.userInfo.id_user,
                    loginCdc: me.view.userInfo.cd_c,
                    cd_e_apro: me.view.userInfo.cd_e
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success && (obj.data.length > 0)) {
                    me.main_menu_btns[0].setBadgeText((obj.data[0].my > 0) ? obj.data[0].my.toString() : '');
                    me.main_menu_btns[1].setBadgeText((obj.data[0].apro > 0) ? obj.data[0].apro.toString() : '');
                    me.main_menu_btns[2].setBadgeText((obj.data[0].rcv > 0) ? obj.data[0].rcv.toString() : '');
                    me.main_menu_btns[3].setBadgeText((obj.data[0].cc > 0) ? obj.data[0].cc.toString() : '');
                    me.main_menu_btns[4].setBadgeText((obj.data[0].memo > 0) ? obj.data[0].memo.toString() : '');
                    me.main_menu_btns[5].setBadgeText((obj.data[0].msg > 0) ? obj.data[0].msg.toString() : '');
                }
                if (callback) callback({
                    my: obj.data[0].my,
                    apro: obj.data[0].apro,
                    cc: obj.data[0].cc,
                    rcv: obj.data[0].rcv,
                    memo: obj.data[0].memo,
                    msg: obj.data[0].msg
                });
            }
        });
    },

    onTap_MenuBtn: function(btn, e) {
        var me = this;
        var menuId = btn.reference.split('menu_btn_').join('');
        switch (menuId) {
            case 'jc':
                me.view.list_card_jc = me.view.add({
                    xtype: 'jclist',
                    reference: 'list_card_jc',
                    MainCtrl: me,
                    listeners: {
                        added: function (card, container, index) {
                            me.setCardAnim('slide', 'left', 500);
                            me.view.setActiveItem(card);
                        }
                    }
                });
                break;
            case 'vc':
                me.view.input_card_vc = me.view.add({
                    xtype: 'wkvac',
                    reference: 'input_card_vc',
                    MainCtrl: me,
                    listeners: {
                        added: function (card, container, index) {
                            me.setCardAnim('slide', 'left', 500);
                            me.view.setActiveItem(card);
                        }
                    }
                });
                break;
            case 'ot':
                me.view.input_card_ot = me.view.add({
                    xtype: 'wkot',
                    reference: 'input_card_ot',
                    MainCtrl: me,
                    listeners: {
                        added: function (card, container, index) {
                            me.setCardAnim('slide', 'left', 500);
                            me.view.setActiveItem(card);
                        }
                    }
                });
                break;
            default:
                me.getListCount(function (cntData) {
                    if (menuId === 'memo') {
                        me.addListView(btn);
                    }
                    else {
                        // if (cntData[menuId] === 0) {
                        //     Ext.toast('현재 조회할 데이터가 없습니다!');
                        // }
                        // else {
                            me.addListView(btn);
                        // }
                    }
                });
        }
    },

    addListView: function(btn) {
        var me = this;
        var menuId = btn.reference.split('menu_btn_').join('');
        var rkey = 'ea_list_card_' + menuId;
        me.view[rkey] = me.view.add({
            xtype: 'ealist',
            reference: rkey,
            MainCtrl: me,
            ListId: menuId,
            ListTitle: btn.getText(),
            listeners: {
                added: function (card, container, index) {
                    me.setCardAnim('slide', 'left', 500);
                    me.view.setActiveItem(card);
                }
            }
        });
    }

});
