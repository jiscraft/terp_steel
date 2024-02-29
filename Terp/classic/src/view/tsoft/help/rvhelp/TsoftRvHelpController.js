/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.rvhelp.TsoftRvHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftrvhelp',

    commonFn:'',
    init: function(obj , params ) {
        var me = this;

        this.openPanel = obj;
        commonFn = Terp.app.getController('TerpCommon');
        var tsoftsearchform_rv = me.lookupReference('tsoftsearchform_rv');
        // commonFn.setDataBindHelpBox(tsoftsearchform_rv ,'cd_e', commonFn.getUserInfo().cd_e, commonFn.getUserInfo().nm_e );
        this.lookupReference('f_fg_mtrl').setValue(this.view.popupMtrl);

        me.onSelect();
    } ,
    onSelect : function(){

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_rv]');

        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('rvhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            var errorMsg = this.getViewModel().getStore('rvhelp_store').getProxy().getReader().rawData.msg;
            Terp.app.getController('TerpCommon').errorHandling(errorMsg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        //console.log(selected);
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});