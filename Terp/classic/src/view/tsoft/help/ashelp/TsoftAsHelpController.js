/**
 * Created by asus on 2016-09-09.
 */
Ext.define('Terp.view.tsoft.help.ashelp.TsoftAsHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftashelp',

    init: function(obj, params) {
        var me = this;
        me.openPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.tsoftashelp_searchform = me.lookupReference('tsoftashelp_searchform');
        me.tsoftashelp_grid1 = me.lookupReference('tsoftashelp_grid1');
        me.tsoftashelp_grid1_store =  me.getViewModel().getStore('tsoftashelp_grid1_store') ;
    },


    onSelect : function(){
        var me = this;
        var sendData ={};
        sendData.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendData.loginIduser = me.commonFn.getUserInfo().id_user;
        sendData.dt_fr = me.tsoftashelp_searchform.getValues().dt_fr.split('-').join('');
        sendData.dt_to = me.tsoftashelp_searchform.getValues().dt_to.split('-').join('');
        sendData.cd_e_incharge = me.tsoftashelp_searchform.getValues().cd_e_incharge;
        sendData.cd_site = me.tsoftashelp_searchform.getValues().cd_site;
        sendData.search = me.tsoftashelp_searchform.getValues().search;
        sendData.actiondata = 'help';

        var sendDataJson = [];
        sendDataJson.push(sendData);

        this.getViewModel().getStore('tsoftashelp_grid1_store').load({
            params :{
                sendData : Ext.encode(sendDataJson)
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftashelp_grid1_store').getProxy().getReader().rawData.msg);
        }else{
            if (records.length<1) {
                Terp.app.getController('TerpCommon').toastMessage('조회할 내용이 없습니다.','t');
            }
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});