/**
 * Created by Andrew on 20@0-10-18.
 */
Ext.define('Terp.view.tsoft.componentux.functionButton.erpMsgButton.TsoftErpMsgButton', {
    extend: 'Ext.Button',
    xtype: 'tsofterpmsgbutton',

    requires: [
        'Terp.view.tsoft.common.erpmsgwin.ErpMsgWindow'
    ],

    text : 'ERP 메시지',
    buttonParams :{},
    height : 24,
    width : 200 ,
    cls :'x-btn-default-small-custom',
    iconCls: 'far fa-comment',
    scale : 'small',
    iconAlign: 'left',

    setButtonParams : function(params){
        this.buttonParams = params;
        this.buttonParams.msgCount = 0;
        //console.log(this.buttonParams);
        this.getMsgCount(params);

    },

    getMsgCount : function(params){
        var me = this;

        if (params == null || params == undefined) {
            me.setText('ERP 메시지');
        }
        else {
            if (!Ext.isEmpty(me.buttonParams.btnText)) {
                me.setText(me.buttonParams.btnText);
            }
        }

        var sendDataJson = {
            actiondata: 'select',
            loginIduser: params.id_user,
            loginCdc: params.cd_c,
            fg_sy200: params.fg_sy200,
            no_erpkey: params.no_erpkey,
            ln_erpkey: params.ln_erpkey,
            cd_site: params.cd_site
        };
        var sendDataJsonEncode = Ext.encode([sendDataJson]);
        Ext.Ajax.request({
            url:'/ServerPage/sy/sy_erp_msg.jsp',
            method :'POST',
            params :{
                sendData : sendDataJsonEncode
            },
            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success){
                    me.buttonParams.msgCount = obj.data.length ;
                    if (Ext.isEmpty(me.buttonParams.btnText)) {
                        me.setText('ERP 메시지 ( ' + me.buttonParams.msgCount + ' 건 )');
                    }
                    else {
                        me.setText(me.buttonParams.btnText + ' ( ' + me.buttonParams.msgCount + ' 건 )');
                    }
                }
                else {
                    var errorMsg = obj.msg;
                    commonFn.errorHandling(errorMsg);
                }
            },
            fail : function(){
                commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
            }
        })
    },

    onErpMsgCallback : function(msgCount){
        if (msgCount) {
            if (Ext.isEmpty(me.buttonParams.btnText)) {
                me.setText('ERP 메시지 ( ' + me.buttonParams.msgCount + ' 건 )');
            }
            else {
                me.setText(me.buttonParams.btnText + ' ( ' + me.buttonParams.msgCount + ' 건 )');
            }
        }
        else {
            this.getMsgCount(this.buttonParams);
        }
    },

    listeners: {
        click: function(){
            var erpMsgWin = Ext.create('Terp.view.tsoft.common.erpmsgwin.ErpMsgWindow', {
                popupParamView: this,
                popupParamCallback: 'onErpMsgCallback',
                popupParams: this.buttonParams,
                autoShow: true
            });
        }
    }
});