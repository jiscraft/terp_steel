/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mihelp.TsoftMiHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftmihelp',

    init: function(obj , params ) {
        var me = this;
        this.openPanel = obj;
        var tsoftsearchform_mi = me.lookupReference('tsoftsearchform_mi');
        commonFn.setDataBindHelpBox(tsoftsearchform_mi, 'cd_e', Terp.app.getController('TerpCommon').getUserInfo().cd_e, Terp.app.getController('TerpCommon').getUserInfo().nm_e);

        this.commonFn = Terp.app.getController('TerpCommon');
        this.initselect();
    } ,
    initselect:function(){
        this.onSelect();
    },
    onSelect : function(){

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_mi]');

        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('mihelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            var errorMsg = this.getViewModel().getStore('mihelp_store').getProxy().getReader().rawData.msg;
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