/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0605.Sy21i0605Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0605',

    control: {
        'tsoftform[reference=sy21i0605_form1]': {
            boxready: 'onSy21i0605Form1_BoxReady'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0605_headbutton = me.lookupReference('sy21i0605_headbutton');
        me.sy21i0605_form1 = me.lookupReference('sy21i0605_form1');
        me.sy21i0605_form1_store = me.getViewModel().getStore('sy21i0605_form1_store');
    },

    onSy21i0605Form1_BoxReady: function() {
        var me = this;
        me.sy21i0605_form1.setReadOnly(true);
    },

    onSelect : function() {
        var me = this;
        var formData = {
            'loginIduser': me.commonFn.getUserInfo().id_user,
            'actiondata': 'select'
        };
        var sendDataJson = [];
        sendDataJson.push(formData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.sy21i0605_form1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: me.onSelectCallback,
            scope: me
        });
    },

    onSelectCallback: function(records, operation, success) {
        var me = this;
        if(success ){
            if  ( records.length < 1 ){
                me.sy21i0605_form1.clearForm();
            }
            else {
                //console.log(records);
                me.sy21i0605_form1.loadRecord(records[0]);
                //me.commonFn.setDataBindHelpBox(ma16b1701_form1, 'cd_p_parent', records[0].data.cd_p_parent, records[0].data.nm_p_parent);
                //me.commonFn.setDataBindHelpBox(ma16b1701_form1, 'cd_o_encharge', records[0].data.cd_o_encharge, records[0].data.nm_o_encharge);
                //me.commonFn.setDataBindHelpBox(ma16b1701_form1, 'cd_e_encharge', records[0].data.cd_e_encharge, records[0].data.nm_e_encharge);
                me.sy21i0605_form1.setReadOnly(true);
            }
        }
        else{
            Ext.Msg.alert('fail',me.getViewModel().getStore('me.sy21i0605_form1_store').getProxy().getReader().rawData.msg);

        }
    },

    onModify : function() {
        var me = this;
        me.sy21i0605_form1.setReadOnly(false);
        me.sy21i0605_headbutton.down('[name = savebutton]').setDisabled(false);
    },


    onSave : function() {
        var me = this;
        var sendDataJsonEncode = me.sy21i0605_form1.makeSendData('s');
        Ext.Ajax.request({
            url: '/ServerPage/sy/sy_config.jsp',
            params: {
                sendData: sendDataJsonEncode
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success) {
                    Terp.app.getController('TerpCommon').toastMessage('저장성공', 'b');
                    me.onSelect();
                    me.sy21i0605_form1.setReadOnly(true);
                    me.sy21i0605_headbutton.down('[name = savebutton]').setDisabled(true);
                }
                else {
                    Ext.Msg.alert('오류', obj.msg);
                }
            },
            fail: function() {
                Ext.Msg.alert('오류', '데이터 처리중 오류가 발생했습니다.');
            }
        });
    }

});