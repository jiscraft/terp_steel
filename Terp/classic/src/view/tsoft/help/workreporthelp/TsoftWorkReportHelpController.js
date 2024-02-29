/**
 * Created by resh on 2016-07-04.
 */
Ext.define('Terp.view.tsoft.help.workreporthelp.TsoftWorkReportHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftworkreporthelp',

    init: function(obj , params ) {

        var dtWork = this.getView().down('[name=dt_work]');
        dtWork.setValue(Ext.Date.format(new Date(), 'Ym'));
        this.openPanel = obj;

        this.onSelect();

    } ,

    onSelect : function(){
        var me = this;
        var sendData = {};
        sendData.dt_work = this.getView().down('[name = dt_work]').getValue().replace('-','');
        sendData.loginCdc = Terp.app.getController('TerpCommon').getUserInfo().cd_c;
        sendData.loginIduser = Terp.app.getController('TerpCommon').getUserInfo().id_user;
        sendData.cd_e = Terp.app.getController('TerpCommon').getUserInfo().cd_e;
        sendData.actiondata = 'help';

        var sendDataJson = [];
        sendDataJson.push(sendData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        this.getViewModel().getStore('tsoftworkreporthelp_store').load({
            params :{
                sendData1 : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success = true ){
            if  ( records.length < 1 ){
                commonFn.toastMessage('조회할 내용이 없습니다.' ,'b');
            }

        }else{
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftworkreporthelp_store').getProxy().getReader().rawData.msg);
        }
    },

    onItemDbclickGrid : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});