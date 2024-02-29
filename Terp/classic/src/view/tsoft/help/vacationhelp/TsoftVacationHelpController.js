/**
 * Created by resh on 2016-08-21.
 */
Ext.define('Terp.view.tsoft.help.vacationhelp.TsoftVacationHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftvacationhelp',

    init: function(obj, params) {
        var me = this;
        me.openPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.tsoftvacationhelp_searchform = me.lookupReference('tsoftvacationhelp_searchform');
        me.tsoftvacationhelp_grid1 = me.lookupReference('tsoftvacationhelp_grid1');
        me.tsoftvacationhelp_grid1_store =  me.getViewModel().getStore('tsoftvacationhelp_grid1_store') ;
        //me.commonFn.setCommonCode(this.lookupReference('tsoftvacationhelp_searchform_wk020'), 'WK020');
    },


    onSelect : function(){
        var me = this;
        //var sendData = tsoftvacationhelp_searchform.makeSendData('help');
        var sendData ={};
        sendData.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendData.loginIduser = me.commonFn.getUserInfo().id_user;
        sendData.cd_e = me.commonFn.getUserInfo().cd_e;
        sendData.dt_fr = me.tsoftvacationhelp_searchform.getValues().dt_fr.split('-').join('');
        sendData.dt_to = me.tsoftvacationhelp_searchform.getValues().dt_to.split('-').join('');
        sendData.fg_wk020 = me.tsoftvacationhelp_searchform.getValues().fg_wk020;
        sendData.actiondata = 'help';

        var sendDataJson = [];
        sendDataJson.push(sendData);

        this.getViewModel().getStore('tsoftvacationhelp_grid1_store').load({
            params :{
                sendData : Ext.encode(sendDataJson)
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftvacationhelp_grid1_store').getProxy().getReader().rawData.msg);
        }else{
            if (records.length<1) {
                Terp.app.getController('TerpCommon').toastMessage('조회할 내용이 없습니다.','b');
            }
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }

});