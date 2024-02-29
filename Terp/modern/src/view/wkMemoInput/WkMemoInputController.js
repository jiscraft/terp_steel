/**
 * Created by Andrew on 2021-12-20.
 */
Ext.define('Terp.view.wkMemoInput.WkMemoInputController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wkmemoinput',

    init: function() {
        var me = this;
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;
        me.ListCtrl = me.view.ListCtrl;
        me.ListView = me.ListCtrl.view;
    },

    onChange_dc_pfx: function(fld, nv, ov) {
        var me = this;
        var oldMemo = me.view.getFields('dc_memo').getValue();
        if (oldMemo.indexOf('[') === -1) {
            me.view.getFields('dc_memo').setValue(nv.concat(oldMemo));
        }
        else {
            me.view.getFields('dc_memo').setValue(nv.concat(oldMemo.substring(oldMemo.indexOf(']')+1)));
        }
    },

    onTap_BackBtn: function() {
        var me = this;
        me.MainCtrl.setCardAnim('slide', 'right', 500);
        me.MainView.setActiveItem(me.ListView);
        me.MainView.remove(me.view);
    },
    onPainted_fg_wk070: function(fld) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url:'/ServerPage/sy/sy_codel.jsp',
            params: {
                sendData: Ext.encode([{
                    actiondata: 'm',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    cd_codeh: 'WK070'
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        var codes = [];
                        Ext.Array.each(obj.data, function(item) {
                            codes.push({ name: item.nm_codel, value: item.cd_codel });
                        });
                        fld.getStore().add(codes);
                    }
                    else {
                        Ext.toast('휴가기간 데이터가 없습니다!');
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
    onTap_ApplyBtn: function() {
        var me = this;
        var dtMemo = Ext.Date.format(me.view.getFields('dt_memo').getValue(),'Ymd');
        var dcMemo = me.view.getFields('dc_memo').getValue().replaceAll('\r', '').replaceAll('\n', ' ');
        var fgMemo = me.view.getFields('fg_memo').getValue();

        if (Ext.isEmpty(dtMemo)) {
            Ext.toast('일자를 선택하세요.');
            return;
        }
        if (Ext.isEmpty(dcMemo)) {
            Ext.toast('메모내용을 입력하세요.');
            return;
        }

        var sendDataJson = {
            actiondata: 's',
            loginIduser: me.MainView.userInfo.id_user,
            loginCdc: me.MainView.userInfo.cd_c,
            cd_e: me.MainView.userInfo.cd_e,
            dt_memo: Ext.Date.format(me.view.getFields('dt_memo').getValue(),'Ymd'),
            dc_memo: me.view.getFields('dc_memo').getValue().replaceAll('\r', '').replaceAll('\n', ' '),
            fg_memo: fgMemo
        };
        Ext.Ajax.request({
            url: '/ServerPage/wk/wk_memo.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    me.ListView.listPage = 1;
                    me.ListCtrl.loadListData();
                    me.onTap_BackBtn();
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    }

});