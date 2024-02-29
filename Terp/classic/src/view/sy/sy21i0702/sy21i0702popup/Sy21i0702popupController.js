/**
 * Created by jiscraft on 2022-11-03.
 */
Ext.define('Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0702popup',
    control: {
        'tsoftform[reference=sy21i0702popup_form1]': {
            boxready: 'onBoxReady_sy21i0702popup_form1'
        }
        /*
            rowdblclick (obj , record , tr , rowIndex , e , eOpts)
            selectionchange (obj , selected , eOpt)
            change (obj, newValue, oldValue, eOpts )
            reconfigure
            itemdblclick(obj , record , tr , rowIndex , e , eOpts)
            beforecellclick (obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
            boxready (obj, width, height, eOpts ) -- grid
        */
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.getViewModel().set('formData' , me.getView().popupParams.formData.data );
        me.formData = me.getViewModel().data.formData ;
        me.sy21i0702popup_form1 = me.lookupReference('sy21i0702popup_form1');
        me.commonFn.setCommonCode(me.lookupReference('sy21i0702popup_fg_sy030') ,'SY030');
    },

    onBoxReady_sy21i0702popup_form1 : function () {
        var me = this;

        if (me.formData.fg_perinfo == '0' ){
            me.sy21i0702popup_form1.down('[name=cd_p]').setReadOnly(true)   ;

        }else{
            me.sy21i0702popup_form1.down('[name=cd_e]').disable()   ;
        }
        //헬프코드를 이름(display name으로 보여주기 위해 처리함)
        me.sy21i0702popup_form1.blurForm();
    },

    onButtonClik_sy21i0702popup_functionform_apply : function () {
        var me = this;
        if ( me.getViewModel().data.formData.fg_status != '0'){
            me.commonFn.toastMessage('요청상태일때만 승인이 가능합니다','w');
            return;
        }
        if ( me.getViewModel().data.formData.fg_sy030 == '' || me.getViewModel().data.formData.fg_sy030 == undefined ){
            me.commonFn.toastMessage('권한코드를 선택해야 합니다','w');
            return;
        }
        if ( me.getViewModel().data.formData.fg_perinfo == '0' && me.getViewModel().data.formData.cd_e == ''){
            me.commonFn.toastMessage('직원일 경우는 사번을 입력해야 합니다','w');
            return;
        }
        if ( me.getViewModel().data.formData.fg_perinfo == '1' && me.getViewModel().data.formData.cd_p == ''){
            me.commonFn.toastMessage('협력업체일 경우는 협력업체코드를 입력해야 합니다','w');
            return;
        }
        var jsonData = {
            actiondata : '1',
            loginIduser : me.commonFn.getUserInfo().id_user,
            cd_c: me.commonFn.getUserInfo().cd_c,
            id_row_req: me.getViewModel().data.formData.id_row,
            fg_perinfo: me.getViewModel().data.formData.fg_perinfo,
            cd_e: me.getViewModel().data.formData.cd_e,
            nm_e: me.getViewModel().data.formData.nm_e,
            nm_e_eng: me.getViewModel().data.formData.nm_e_eng,
            cd_p: me.getViewModel().data.formData.cd_p,
            nm_user: me.getViewModel().data.formData.nm_user,
            id_user_req: me.getViewModel().data.formData.id_user_req ,
            dc_companymail: me.getViewModel().data.formData.dc_companymail ,
            dc_personalmail: me.getViewModel().data.formData.dc_personalmail,
            dc_hp: me.getViewModel().data.formData.dc_hp,
            dc_tel: me.getViewModel().data.formData.dc_tel,
            fg_sy030 : me.getViewModel().data.formData.fg_sy030

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_user_req_apply.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('사용자 승인처리 성공','t');
                me.view.close();
            }
        });

    }



});