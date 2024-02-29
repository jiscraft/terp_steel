/**
 * Created by jiscr on 2022-03-03.
 */
Ext.define('Terp.view.main.mainmail.MainmailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainmail',

    requires: [
        'Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup'
    ],
    control: {
        'mainmail': {
            boxready: 'onMainMail_BoxReady'
        },
        'tsoftgrid[reference=mainmail_gridboard]': {
            rowdblclick: 'onRowdblclick_mainmail_gridboard'
        },
        'tsoftgrid[reference=mainmail_gridmail]': {
            boxready: 'onMainHome_mail_grid_BoxReady',
            itemdblclick: 'onMainHome_mail_grid_ItemDblClick'
        }
    },
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.mainmail_gridboard = me.lookupReference('mainmail_gridboard');
        me.mainmail_gridboard_store =  me.getViewModel().getStore('mainmail_gridboard_store') ;

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        // console.log(obj);
        var insertData ={
            cd_e: me.commonFn.getUserInfo('cd_e'),
            nm_e :me.commonFn.getUserInfo('nm_e')
        };

        me.onSelect_mainmail_gridboard( me.commonFn.getUserInfo('cd_c') ,  me.commonFn.getUserInfo('cd_e'));

    },

    onSelect_mainmail_gridboard : function(cdC ,  cdE){
        var me = this;
        var jsonData = {
            'actiondata': 'mainboardm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc':cdC

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.mainmail_gridboard_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.mainmail_gridboard.getSelectionModel().select(0);
                    }
                    // me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mainmail_gridboard_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onRowdblclick_mainmail_gridboard : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var paramjsonData = {
            'cd_ntc': record.data.cd_ntc,
            'fg_window':'edit'
        };


        var pop = Ext.create('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            popupRight : Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.bb.bb22a2001.Bb22a2001').getData() ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onSelect_mainmail_gridboard( me.commonFn.getUserInfo('cd_c') ,  me.commonFn.getUserInfo('cd_e'));
        });

    },

    onMainMail_BoxReady : function(){
        var me = this;
        me.getMainBoardMore();
    },


    onMainHome_mail_grid_BoxReady: function(grid) {
        var me = this;
        me.view.mailGrid = grid;

        var mailAddr = [];
        var isValidMail = !Ext.isEmpty(me.commonFn.getUserInfo().dc_companymail);
        if (isValidMail) {
            mailAddr = me.commonFn.getUserInfo().dc_companymail.split("@");
            isValidMail = !Ext.isEmpty(mailAddr[0]);
        }

        if (isValidMail) {
            Ext.Ajax.request({
                url: '/res/mailplug/api_call.jsp',
                method: 'POST',
                params: {
                    tp: 'mail_list',
                    id: mailAddr[0]
                },
                success: function(res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    //console.log(obj);
                    if (obj.success && obj.data[0].hasOwnProperty('mail_list')) {
                        console.log(obj.data[0].mail_list);
                        me.view.mailGrid.getStore().add(obj.data[0].mail_list);
                        me.view.mailGrid.getView().refresh()
                    }
                    else {
                        if (obj.hasOwnProperty('msg')) {
                            me.commonFn.toastMessage(decodeURIComponent(obj.msg), 't');
                        }
                    }
                },
                fail: function() {
                    me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
                }
            });
        }

    },

    onMainHome_mail_grid_ItemDblClick: function(item , record , item , index , e , eOpts ) {
        var me = this;
        console.log(record);
        if (Ext.isEmpty(record.get('return_url'))) {
            me.commonFn.toastMessage('수신메일 URL이 지정되지 않았습니다!', 'b');
            return;
        }

        var mailAddr = [];
        var isValidMail = !Ext.isEmpty(me.commonFn.getUserInfo().dc_companymail);
        if (isValidMail) {
            mailAddr = me.commonFn.getUserInfo().dc_companymail.split("@");
            isValidMail = !Ext.isEmpty(mailAddr[0]);
        }
        if (isValidMail) {
            Ext.Ajax.request({
                url: '/res/mailplug/api_call.jsp',
                method: 'POST',
                params: {
                    tp: 'token_sso',
                    id: mailAddr[0]
                },
                success: function(res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    console.log(obj);
                    if (obj.success) {
                        window.open('https://mail.airtecheng.co.kr/lw_api/token_sso/'+ obj.token + '?return_url='+record.get('return_url'), 'MAIL', '');
                    }
                    else {
                        if (obj.hasOwnProperty('msg')) {
                            me.commonFn.toastMessage(decodeURIComponent(obj.msg), 't');
                        }
                    }
                },
                fail: function() {
                    me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
                }
            });
        }
    },

    onRowdblclick_mainboard_grid3 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;

        var paramjsonData = {
            'cd_ntc': record.data.cd_ntc,
            'fg_window':'edit'
        };


        var pop = Ext.create('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            var dtFr = me.getViewModel().getData().headFormData.dt_fr ;
            var dtTo = me.getViewModel().getData().headFormData.dt_to ;
            me.onSelect_grid3( me.commonFn.getUserInfo('cd_c') , dtFr , dtTo , me.commonFn.getUserInfo('cd_e'));
        });

    },

    getMainBoardMore : function(){
        var me = this;
        var mailAddr = [];
        console.log(me.commonFn.getUserInfo());
        var isValidMail = !Ext.isEmpty(me.commonFn.getUserInfo() );
        if (isValidMail) {
            mailAddr = me.commonFn.getUserInfo().dc_companymail.split("@");
            isValidMail = !Ext.isEmpty(mailAddr[0]);
        }
        if (isValidMail) {
            Ext.Ajax.request({
                url: '/res/mailplug/api_call.jsp',
                method: 'POST',
                params: {
                    tp: 'mail_cnt',
                    id: mailAddr[0]
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    //console.log(obj);
                    if (obj.success && obj.data[0].hasOwnProperty('mail_cnt')) {
                        Ext.select('u.home-ea-cnt-btn.home-mail-more').setHtml(obj.data[0].mail_cnt+'');
                    }
                    else {
                        if (obj.hasOwnProperty('msg')) {
                            me.commonFn.toastMessage(decodeURIComponent(obj.msg), 't');
                        }
                    }
                },
                fail: function () {
                    me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다", 't');
                }
            });
            Ext.select('.home-mail-more').each(function(item) {
                Ext.get(item).on('click', function(e, t) {
                    Ext.Ajax.request({
                        url: '/res/mailplug/api_call.jsp',
                        method: 'POST',
                        params: {
                            tp: 'token_sso',
                            id: mailAddr[0]
                        },
                        success: function(res) {
                            var obj = Ext.JSON.decode(res.responseText);
                            console.log(obj);
                            if (obj.success) {
                                window.open('http://mail.airtecheng.co.kr/lw_api/token_sso/'+ obj.token + '?return_url=/webmail/lists', 'MAIL', '');
                            }
                            else {
                                if (obj.hasOwnProperty('msg')) {
                                    me.commonFn.toastMessage(decodeURIComponent(obj.msg), 't');
                                }
                            }
                        },
                        fail: function() {
                            me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
                        }
                    });
                });
            });
        }

        Ext.select('.home-mail-more').each(function(item) {
            Ext.get(item).on('click', function(e, t) {
                Ext.Ajax.request({
                    url: '/res/mailplug/api_call.jsp',
                    method: 'POST',
                    params: {
                        tp: 'token_sso',
                        id: mailAddr[0]
                    },
                    success: function(res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        console.log(obj);
                        if (obj.success) {
                            window.open('http://mail.airtecheng.co.kr/lw_api/token_sso/'+ obj.token + '?return_url=/webmail/lists', 'MAIL', '');
                        }
                        else {
                            if (obj.hasOwnProperty('msg')) {
                                me.commonFn.toastMessage(decodeURIComponent(obj.msg), 't');
                            }
                        }
                    },
                    fail: function() {
                        me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
                    }
                });
            });
        });
        Ext.select('.board-more').each(function(item) {
            var me = this;
            Ext.get(item).on('click', function(e, t) {
                var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.bb.bb22a2001.Bb22a2001').getData();
                console.log(eaMenuData);
                if (!Ext.isEmpty(eaMenuData)) Terp.app.getController('TerpController').setMainBar(eaMenuData);
            });
        });
    }
});