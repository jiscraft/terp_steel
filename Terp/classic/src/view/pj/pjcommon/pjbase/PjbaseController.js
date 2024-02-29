/**
 * Created by jiscraft on 2022-11-10.
 */
Ext.define('Terp.view.pj.pjcommon.pjbase.PjbaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pjbase',


    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.pjbaseform_store =  me.getViewModel().getStore('pjbaseform_store') ;
        me.pjbaseform_head = me.lookupReference('pjbaseform_head');
        me.pjbaseform = me.lookupReference('pjbaseform');

        me.commonFn.setCommonCode(me.lookupReference('pjbase_fg_pj030') ,'PJ030');
        me.commonFn.setCommonCode(me.lookupReference('pjbase_fg_pj070') ,'PJ070');
        me.commonFn.setCommonCode(me.lookupReference('pjbase_fg_pj080') ,'PJ080');
    },


    onLoadDataPjBase: function(cdSite) {
        var me = this;
        me.pjbaseform.setReadOnly(true);

        if(cdSite =='' ){
            return
        }

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  cdSite
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pjbaseform_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        // me.pjbaseform_head.clearForm();
                        // me.getViewModel().set('pjbaseFormData', null);
                        me.getViewModel().set('pjbaseFormData', records[0].data);
                    }else{
                        me.pjbaseform_head.clearForm();
                        me.getViewModel().set('pjbaseFormData', null);
                        //헬프폼들에서 realValue에서 초기화 오류가 생김 폼데이타를 쓸땐는 리얼벨류바인딩을 안해주어야 함
                        //클리어폼을 한다음 처리하면 문제가 없슴
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pjbaseform_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
                me.onEditControlMode('select');
            },
            scope : me
        });

    },

    onEditControlMode : function(value){
        var me = this;

        if (value == 'select'){
            me.pjbaseform_head.setReadOnly(true);
            me.pjbaseform.setReadOnly(true);
            me.pjbaseform_head.blurForm();

            me.pjbaseform_head.down('[name=cd_p]').setReadOnly(true);
            me.pjbaseform_head.down('[name=cd_p_owner]').setReadOnly(true);
        }

    }

});