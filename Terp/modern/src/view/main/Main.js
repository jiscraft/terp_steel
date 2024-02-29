/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    requires: [
        'Ext.field.Password',
        'Ext.field.Text',
        'Ext.form.Panel',
        'Ext.layout.Card',
        'Ext.layout.Center',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Terp.view.main.MainController',
        'Terp.view.main.MainModel'
    ],

    viewModel: {
        type: 'main'
    },
    controller: 'main',

    layout: 'card',

    items: [
        {
            xtype: 'container',
            reference: 'main_splash_card',
            layout: 'center',
            items: [
                {
                    xtype: 'image',
                    reference: 'main_splash_image',
                    src: 'res/images/logo.png',
                    width: '80%',
                    height: 70
                }
            ]
        },
        {
            xtype: 'container',
            reference: 'main_login_form_card',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'formpanel',
                    reference: 'main_login_form',
                    width: '80%',
                    layout: {
                        type: 'vbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'image',
                            src: 'res/images/logo.png',
                            width: '100%',
                            height: 60
                        },
                        {
                            xtype: 'textfield',
                            name: 'id_user',
                            value: '',
                            label: '사용자ID',
                            placeholder: '사용자ID',
                            allowBlank: false,
                            required: true,
                            errorTarget: 'qtip',
                            width: '100%'
                        },
                        {
                            xtype: 'passwordfield',
                            name: 'dc_pw',
                            value: '',
                            label: '비밀번호',
                            placeholder: '비밀번호',
                            allowBlank: false,
                            required: true,
                            errorTarget: 'qtip',
                            width: '100%'
                        },
                        {
                            xtype: 'button',
                            reference: 'login_btn',
                            text: '로그인',
                            iconCls: 'x-fas fa-sign-in-alt',
                            autoSize: true,
                            ui: 'action',
                            handler: 'onTap_LoginBtn',
                            style: {
                                'text-align': 'center',
                                'letter-spacing': '1.25px',
                                'font-size': '14px',
                                'margin': '50px auto'
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'go_to_desktop',
                            alignSelf: 'center',
                            text: '데스크탑 버전으로 보기',
                            handler: function () {
                                self.location.href = 'http://engsoft.kr/?classic';
                            },
                            style: {
                                'text-align': 'center'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            reference: 'main_menu_card',
            tbar: [
                {
                    xtype: 'container',
                    layout: 'center',
                    flex: 1,
                    items: [
                        {
                            xtype: 'image',
                            src: 'res/images/logo.png',
                            width: 200,
                            height: 50
                        }
                    ]
                }
            ],
            bbar: [
                {
                    xtype: 'component',
                    reference: 'logon_user_name',
                    html: '사용자명'
                },
                {
                    xtype: 'button',
                    reference: 'logout_btn',
                    text: '',
                    iconCls: 'x-fas fa-sign-out-alt',
                    iconAlign: 'right',
                    ui: 'decline',
                    handler: 'onTap_LogoutBtn'
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'button',
                    reference: 'refresh_btn',
                    text: '',
                    iconCls: 'x-fas fa-sync-alt',
                    handler: 'onTap_RefreshBtn'
                }
            ],
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    //flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_my',
                                    text: '진행문서',
                                    cls: 'modern-main-menu-btn my',
                                    iconCls: 'x-fas fa-folder',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_apro',
                                    text: '결제할 문서',
                                    cls: 'modern-main-menu-btn apro',
                                    iconCls: 'x-fas fa-clipboard-check',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_rcv',
                                    text: '완료문서',
                                    cls: 'modern-main-menu-btn rcv',
                                    iconCls: 'x-fas fa-clipboard',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    //flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_cc',
                                    text: '수신문서',
                                    cls: 'modern-main-menu-btn cc',
                                    iconCls: 'x-fas fa-closed-captioning',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },

                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_memo',
                                    text: '일정등록',
                                    cls: 'modern-main-menu-btn memo',
                                    iconCls: 'x-fas fa-clone',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_msg',
                                    hidden : true ,
                                    text: 'ERP메시지',
                                    cls: 'modern-main-menu-btn msg',
                                    iconCls: 'x-fas fa-envelope-open-text',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    //flex: 1,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_vc',
                                    text: '휴가신청',
                                    cls: 'modern-main-menu-btn vc',
                                    iconCls: 'x-fas fa-gas-pump',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_ot',
                                    text: '특근신청',
                                    cls: 'modern-main-menu-btn ot',
                                    iconCls: 'x-fas fa-clock',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'center',
                            //flex: 1,
                            width: 100,
                            height: 150,
                            hidden: false,
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'menu_btn_jc',
                                    text: '추가메뉴',
                                    cls: 'modern-main-menu-btn jc',
                                    iconCls: 'x-fas fa-file-invoice-dollar',
                                    iconAlign: 'top',
                                    badgeText: '',
                                    handler: 'onTap_MenuBtn'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});
