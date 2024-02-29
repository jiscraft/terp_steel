/**
 * Created by asus on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftcostcenterhelp',

    control: {
        'tsoftsearchform[name=tsoftsearchform_costcenter]': {
            boxready: 'onBoxReady_costcenter_searchform'
        }
    },

    init: function(obj , params ) {
        var me = this;
        me.obj = obj;
        me.openPanel = obj.config.popupParamThisView;
        me.commonFn = Terp.app.getController('TerpCommon');

        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);
            //this.getViewModel().set('realValue',params.cd_o);
            //this.getViewModel().set('displayValue',params.nm_o);
            //this.getViewModel().set('cdovalue',params.nm_o);
        }
        this.onSelect();
    } ,

    onBoxReady_costcenter_searchform: function(f) {
        var me = this;
        var cfg = me.obj.config;
        if (cfg.helpInitParams != undefined) {
            if (cfg.helpInitParams.helpInitParam_h_search != undefined) {
                var helpInitParam_h_search = cfg.helpInitParams.helpInitParam_h_search;
                f.down('[name=p_search]').setValue(helpInitParam_h_search);
                if (cfg.helpInitParams.autoSearch) {
                    this.onSelect();
                }
            }
        }
    },

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_costcenter]');
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('costcenterhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('costcenterhelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        var me = this;
        me.openPanel.callbackPopup(selected.data);
        me.view.close();

    }
});