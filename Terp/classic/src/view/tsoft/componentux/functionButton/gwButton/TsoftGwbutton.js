/**
 * Created by jiscraft on 2016-09-23.
 */
Ext.define('Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwbutton', {
    extend: 'Ext.Button',
     xtype: 'tsoftgwbutton',

    requires: [
        'Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwButtonController'
    ],

    controller: 'tsoftgwbutton',

    text : '상신',
    buttonParams :{},
    //eaDocParams :{},
    height : 24,
    width : 125 ,
    cls :'x-btn-default-small-custom-gw',
    iconCls: 'fas fa-file-invoice',
    scale : 'small',
    iconAlign: 'left',

    setButtonParams : function(params){
        this.buttonParams = params;
        if (Ext.isEmpty(this.buttonParams.fg_ea001)) {
            this.buttonParams.fg_ea001 = '00';
        }
        if (Ext.isEmpty(this.buttonParams.cd_doc)) {
            this.buttonParams.cd_doc = '';
        }
        this.getGwStatus(params);
    },

    //setButtonEaDoc : function(eaDeocParam){
    //    console.log('setButtonEaDoc',eaDeocParam);
    //    this.eaDocParams = eaDeocParam;
    //    //this.getController().onGwStatusButtonClick();
    //},

    getGwStatus : function(params){
        var me = this;
        var jsonData = {
            actiondata: 'status',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
            id_row_erp: params.id_row_erp,
            fg_ea040: params.fg_ea040,
            dc_key1: params.dc_key1,
            dc_key2: params.dc_key2,
            dc_key3: params.dc_key3
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.Ajax.request({
            url :'/ServerPage/gw/ea/ea_doc_erp.jsp' ,
            method :'POST',
            params :{
                sendData : sendDataJsonEncode
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);

                if(obj.success){
                    me.buttonParams.cd_doc =  obj.data[0].cd_doc ;
                    me.buttonParams.fg_ea001 =  obj.data[0].gwStatusInfo ;

                    if (obj.data[0].gwStatusInfo == '00') {
                        me.setText('미상신');
                    }
                    else if (obj.data[0].gwStatusInfo == '10') {
                        me.setText('결재중');
                    }
                    else if (obj.data[0].gwStatusInfo == '20') {
                        me.setText('승인');
                    }
                    else if (obj.data[0].gwStatusInfo == '21') {
                        me.setText('승인');
                    }
                    else if (obj.data[0].gwStatusInfo == '22') {
                        me.setText('후결');
                    }
                    else if (obj.data[0].gwStatusInfo == '30') {
                        me.setText('부결');
                    }
                    else if (obj.data[0].gwStatusInfo == '40') {
                        me.setText('반려');
                    }
                    else if (obj.data[0].gwStatusInfo == '99') { //erp에서 상신취소한 문서는 미상신으로 처리한다..
                        me.setText('미상신');
                    }
                    else {
                        me.setText('미상신');
                    }
                }
                else {
                    var errorMsg = obj.msg;
                    Terp.app.getController('TerpCommon').errorHandling(errorMsg);
                }
            },
            fail: function(){
                Terp.app.getController('TerpCommon').toastMessage("데이타처리중 오류가 발생했습니다",'t');
            }
        });
    }

});