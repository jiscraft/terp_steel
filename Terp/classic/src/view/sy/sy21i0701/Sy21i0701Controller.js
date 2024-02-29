/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0701.Sy21i0701Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0701',
    requires: [
        'Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocal'
    ],

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0701_headbutton = me.lookupReference('sy21i0701_headbutton');
        me.sy21i0701_searchform = me.lookupReference('sy21i0701_searchForm');
        me.sy21i0701_functionform_partner = me.lookupReference('sy21i0701_functionform_partner');
        me.sy21i0701_functionform_employee = me.lookupReference('sy21i0701_functionform_employee');

        me.sy21i0701_grid1 = me.lookupReference('sy21i0701_grid1');
        me.sy21i0701_grid1_store =  me.getViewModel().getStore('sy21i0701_grid1_store') ;
        me.sy21i0701_grid1_sy030_store = me.getViewModel().getStore('sy21i0701_grid1_sy030_store');

        me.commonFn.setCommonCode(me.lookupReference('sy21i0701_functionform_partner_fg_sy030') ,'SY030');
        me.commonFn.setCommonCode(me.lookupReference('sy21i0701_functionform_employee_fg_sy030') ,'SY030');
    },

    onButtonClick : function(){
        var me = this;
        console.log('onbutton click child');
    },

    onSelect : function(){
        var me = this;
        var searchForm = me.lookupReference('sy21i0701_searchForm');

        if(searchForm.down('[name=cd_c]').getValue() =='' || searchForm.down('[name=cd_c]').getValue() == null){
            me.commonFn.toastMessage('회사를 선택하세요','w');
            return;
        }

        var formData = {
            'actiondata': 'm',
            'h_search': searchForm.down('tsoftuserhelpfield').getValue(),
            'h_yesno': searchForm.down('tsoftcomboboxyesno').getValue(),
            'h_fg_user': searchForm.down('tsoftcombobox[name=h_fg_user]').getValue(),
            'cd_c' : searchForm.down('[name=cd_c]').getValue()
        };
        //console.log(formData);
        var sendDataJson = [];
        sendDataJson.push(formData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sy21i0701_grid1_store.load({
            params :{
                //actionData :'m',
                sendData : sendDataJsonEncode

            },
            callback : me.onSelectCallback,
            scope : me
        })



    },

    onSelectCallback : function(records, operation , success){
        var me = this;
        //console.log(records );
        if(success != true ){
            Ext.Msg.alert('fail',me.getViewModel().getStore('grid1_store').getProxy().getReader().rawData.msg);
        }
        else{
            if (records.length < 1) {
                me.commonFn.toastMessage('조회할 내용이 없습니다.' ,'b');
            }
            me.sy21i0701_grid1.setReadOnly(true);
        }
    },

    onModify :function(){
        var me = this;
        me.sy21i0701_grid1.setReadOnly(false);
        me.sy21i0701_headbutton.down('[name = savebutton]').setDisabled(false);
    },

    onSave : function(){
        var me = this;
        var sendData = me.sy21i0701_grid1.makeSendData('s', '');

        Ext.Ajax.request({
            url :'/ServerPage/sy/sy_user.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    Terp.app.getController('TerpCommon').toastMessage('저장하였습니다.','b');
                    me.onSelect();
                }else{
                    Ext.Msg.alert("오류",obj.msg);
                }
            },
            fail : function(){
                Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
            }
        })
    },



    onDelete : function(){
        var me = this;
        var s = me.lookupReference('sy21i0701_grid1').getSelectionModel().getSelection()[0].data;

        Ext.Msg.show({
            title:'삭제 확인',
            message: '선택한 정보를 삭제하시겠습니까?<br><span style="color:red">직원일 경우 ID를 삭제하더라도 직원정보까지 삭제되지 않습니다</span><br>삭제보다는 사용중지를 하세요',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var sendDataJson = [];
                    s.actiondata = 'd';
                    sendDataJson.push(s);

                    var sendDataJsonEncode = Ext.encode(sendDataJson);

                    Ext.Ajax.request({
                        url :'/ServerPage/sy/sy_user.jsp' ,
                        params :{
                            actiondata :'d',
                            sendData : sendDataJsonEncode
                        },
                        success :function(res){
                            var obj = Ext.JSON.decode(res.responseText);
                            if(obj.success){
                                //me.getViewModel().getStore('grid1_store').remove(record);
                                me.onSelect();
                                Ext.Msg.alert("성공","성공적으로 삭제 했습니다");
                            }else{
                                Ext.Msg.alert("오류",obj.msg);
                            }
                        },
                        fail : function(){
                            Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
                        }
                    })
                }
            }
        });


    },


    onInsert : function(){
        var me = this;
        me.sy21i0701_grid1.setReadOnly(false);
        me.sy21i0701_headbutton.down('[name = savebutton]').setDisabled(false);
        var data ={
            id_user :'',
            dc_email :'',
            dc_mobile :'',
            dc_pw :'',
            yn_use : 'Y'
        };
        me.getViewModel().getStore('sy21i0701_grid1_store').add(data);
    },

    showResult:function(){
        me.showToast(Ext.String.format('You clicked the {0} button', btn));
    },

    onSignUpload : function(lastSel, callback){
        var me = this;
        var loginCdc = me.commonFn.getUserInfo().cd_c;
        var cdE = lastSel.get('cd_e');

        if(cdE == '' || cdE == null){
            Ext.Msg.alert('확인', '사원등록이 된 직원만 서명을 등록할 수 있습니다.');
            return;
        }
        //var returnData = me.commonFn.sqlSelect('sql' , "select count(*) cnt from ma_emp where cd_c = '"+  loginCdc + "' and cd_e = '"+ cd_e + "'" );
        //
        //if (returnData[0].cnt < 1 ){
        //    Terp.app.getController('TerpCommon').toastMessage('사원정보를 등록 저장한뒤 이미지를 업로드하세요','b');
        //    return;
        //}

        var pop = Ext.create('Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocal');
        pop.after = function(resJson) {
            lastSel.set('sign_url', resJson.fileItems[0].vpath+'/'+resJson.fileItems[0].fn);
            pop.close();
        };
        pop.show();
        pop.getController().init(this , 'sign' , cdE);
    },

    onPwInit : function(lastSel, callback){
        var me = this;
        var sendDataJson = {
            id_user: lastSel.get('id_user'),
            actiondata: 'init'
        };
        Ext.Ajax.request({
            url :'/ServerPage/sy/sy_user.jsp' ,
            method :'POST',
            params :{
                sendData : Ext.encode([sendDataJson])
            },
            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    Terp.app.getController('TerpCommon').toastMessage('비밀번호를 초기화하였습니다.','b');
                    me.onSelect();
                }
                else{
                    Ext.Msg.alert("오류",obj.msg);
                }
            },
            fail : function(){
                Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
            }
        });
    },
    onButtonClik_sy21i0701_functionform_employeesave : function(){
        var me = this;
        var validCheck = 0;
        if ( me.sy21i0701_functionform_employee.down('[name=id_user]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_employee.down('[name=nm_user]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_employee.down('[name=dc_pw]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_employee.down('[name=cd_e]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_employee.down('[name=fg_sy030]').getValue() == '') validCheck =  1;

        if ( validCheck > 0 ){
            me.commonFn.toastMessage('모든 항목을 입력후 등록하세요','w');
            return;
        }

        var jsonData = {
            'actiondata': 'employeesave',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'id_user':  me.sy21i0701_functionform_employee.down('[name=id_user]').getValue() ,
            'nm_user':  me.sy21i0701_functionform_employee.down('[name=nm_user]').getValue() ,
            'dc_pw':  me.sy21i0701_functionform_employee.down('[name=dc_pw]').getValue() ,
            'cd_e':  me.sy21i0701_functionform_employee.down('[name=cd_e]').getValue(),
            'fg_sy030':  me.sy21i0701_functionform_employee.down('[name=fg_sy030]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_user.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('직원사용자 저장 성공','t');
                me.sy21i0701_functionform_employee.down('[name=id_user]').setValue('');
                me.sy21i0701_functionform_employee.down('[name=nm_user]').setValue('');
                me.sy21i0701_functionform_employee.down('[name=dc_pw]').setValue('');
                me.sy21i0701_functionform_employee.down('[name=cd_e]').setValue('');
                me.sy21i0701_functionform_employee.down('[name=fg_sy030]').setValue('');
                me.onSelect();
            }
        });
    },

    onButtonClik_sy21i0701_functionform_partnersave : function(){
        var me = this;
        var validCheck = 0;
        if ( me.sy21i0701_functionform_partner.down('[name=id_user]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_partner.down('[name=nm_user]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_partner.down('[name=dc_pw]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_partner.down('[name=cd_e]').getValue() == '') validCheck =  1;
        if ( me.sy21i0701_functionform_partner.down('[name=fg_sy030]').getValue() == '') validCheck =  1;

        if ( validCheck > 0 ){
            me.commonFn.toastMessage('모든 항목을 입력후 등록하세요','w');
            return;
        }

        var jsonData = {
            'actiondata': 'partnersave',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'id_user':  me.sy21i0701_functionform_partner.down('[name=id_user]').getValue() ,
            'nm_user':  me.sy21i0701_functionform_partner.down('[name=nm_user]').getValue() ,
            'dc_pw':  me.sy21i0701_functionform_partner.down('[name=dc_pw]').getValue() ,
            'cd_p':  me.sy21i0701_functionform_partner.down('[name=cd_p]').getValue(),
            'fg_sy030':  me.sy21i0701_functionform_partner.down('[name=fg_sy030]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_user.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('협력업체 저장 성공','t');
                me.sy21i0701_functionform_partner.down('[name=id_user]').setValue('');
                me.sy21i0701_functionform_partner.down('[name=nm_user]').setValue('');
                me.sy21i0701_functionform_partner.down('[name=dc_pw]').setValue('');
                me.sy21i0701_functionform_partner.down('[name=cd_p]').setValue('');
                me.sy21i0701_functionform_partner.down('[name=fg_sy030]').setValue('');
                me.onSelect();
            }
        });
    }
});