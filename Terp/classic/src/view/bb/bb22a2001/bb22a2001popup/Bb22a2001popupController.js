/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bb22a2001popup',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.bb22a2001popup_headbutton = me.lookupReference('bb22a2001popup_headbutton');
        me.bb22a2001popup_functionform = me.lookupReference('bb22a2001popup_functionform');


        me.bb22a2001popup_form1 = me.lookupReference('bb22a2001popup_form1');
        me.bb22a2001popup_form1_store =  me.getViewModel().getStore('bb22a2001popup_form1_store') ;

        me.popupParam = me.getView().popupParams;
        me.btnAttachFiles = me.lookupReference('bb22a2001popup_functionform_btnAttachFiles');

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('bb22a2001popup_fg_wk020') ,'WK020');
        if ( me.popupParam.fg_window =='new' ){
            var insertData ={
                cd_c        : me.commonFn.getUserInfo().cd_c,
                cd_ntc      : me.popupParam.cd_ntc,
                cd_e        : me.commonFn.getUserInfo('cd_e'),
                nm_e        : me.commonFn.getUserInfo('nm_e'),
                dc_title    :'',
                dc_cont_sch :'',
                fg_target   :'1' ,
                fg_prior    : 'N',
                yn_cmt      :'N',
                cd_nct_p    :'',
                dc_remark   :'',
                id_row      : me.popupParam.id_row

            };

            me.bb22a2001popup_form1_store.insert(0, insertData);
            me.getViewModel().set('formData',me.bb22a2001popup_form1_store.data.items[0].data );
            me.setAttachFilesButton(me.getViewModel().getData().formData.id_row);
            me.onEditControlMode('new');

        }else{
            me.onSelect();
        }
    },

    onSelect : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_ntc':  me.popupParam.cd_ntc

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.bb22a2001popup_form1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formData',me.bb22a2001popup_form1_store.data.items[0].data );
                        me.onEditControlMode('select');
                        me.setAttachFilesButton(me.getViewModel().getData().formData.id_row);
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('bb22a2001popup_form1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },

    onModify : function(){
        var me = this;
        if ( me.getViewModel().data.formData.id_insert != me.commonFn.getUserInfo('id_user') ){
            me.commonFn.toastMessage('작성자만 수정 할 수 있슴니다','t');
            return;
        }
        me.onEditControlMode('modify');

    },


    onSave : function(){
        var me = this;

        var jsonData ={
            actiondata      : 's',
            loginIduser     : me.commonFn.getUserInfo('id_user'),
            loginCdc        : me.commonFn.getUserInfo().cd_c,
            cd_ntc          : me.getViewModel().getData().formData.cd_ntc,
            cd_e            : me.getViewModel().getData().formData.cd_e,
            dc_title        : me.getViewModel().getData().formData.dc_title,
            dc_cont_sch     : me.getViewModel().getData().formData.dc_cont_sch,
            fg_target       : me.getViewModel().getData().formData.fg_target,
            fg_prior        : me.getViewModel().getData().formData.fg_prior,
      //      yn_cmt          : me.getViewModel().getData().formData.yn_cmt,
            yn_up          : me.getViewModel().getData().formData.yn_up,
            dt_gs          : me.getViewModel().getData().formData.dt_gs,
            cd_nct_p        : me.getViewModel().getData().formData.cd_nct_p,
            dc_remark       : me.getViewModel().getData().formData.dc_remark,
            id_row          : me.getViewModel().getData().formData.id_row

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/bb/bb_ntc.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('공지사항 저장 성공','t');
                me.onEditControlMode('select');
            }
        });
    },


    onDelete : function(){
        var me = this;

        Ext.MessageBox.confirm('확인', '휴가 신청서를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_ntc':  me.getViewModel().getData().formData.cd_ntc
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/bb/bb_ntc.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('공지사항 삭제 성공','t');
                        me.view.close();
                    }
                });
            } else {

            }
        });


    },


    setAttachFilesButton: function(idRow) {
        var me = this;
        var buttonParams = {
            id_row_src: idRow,
            fg_sy210: '0901' ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '공지사항 첨부파일'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onEditControlMode : function(value){
        var me = this;
        console.log(me.popupParam);
        if (value == 'select'){
            setTimeout(function() {
                me.bb22a2001popup_form1.blurForm();
            }, 100);
            me.bb22a2001popup_form1.setReadOnly(true);
            me.bb22a2001popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
        }else if (value == 'new'){
            setTimeout(function() {
                me.bb22a2001popup_form1.blurForm();
            }, 100);
            me.bb22a2001popup_form1.setReadOnly(false);
            me.bb22a2001popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
        }else if (value == 'modify'){
            me.bb22a2001popup_form1.setReadOnly(false);
            me.bb22a2001popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
        }
        me.onSetReadOnly();
    },



    onSetReadOnly : function(){
        var me = this;
        me.bb22a2001popup_form1.down('[name=cd_ntc]').setReadOnly(true);
        me.bb22a2001popup_form1.down('[name=cd_e]').setReadOnly(true);
    }

});