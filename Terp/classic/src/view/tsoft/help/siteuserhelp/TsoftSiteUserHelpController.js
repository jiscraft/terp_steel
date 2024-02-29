/**
 * Created by jiscr on 2021-03-22.
 */
Ext.define('Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftsiteuserhelp',

    h_fg_sm200_store : '',
    init: function(obj , params ) {
        var me = this;
        me.openPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');
        //me.commonFn.setCommonCode(this.lookupReference('h_fg_sm200') ,'SM200');
        // h_fg_sm200_store = me.lookupReference('h_fg_sm200');
        // console.log(params);
        // console.log(obj)
        if(obj.yn_mf != undefined)
        {
            this.getViewModel().set('yn_mf',obj.yn_mf);
            this.onSelect();

        }else
        {
            this.onSelect();

        }
        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);
            this.getViewModel().set('yn_mf',params.yn_mf);
            //this.getViewModel().set('realValue',params.cd_o);
            //this.getViewModel().set('displayValue',params.nm_o);
            //this.getViewModel().set('cdovalue',params.nm_o);
        }

    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_site]');
        //console.log(formData);
        var jsonData = {
            'actiondata': 'help',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'p_search' : formData.down('[name=p_search]').value ,
            'fg_sm200' : formData.down('[name=fg_sm200]').value,
            'yn_mf' : me.openPanel.yn_mf
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);



        //var formData = this.getView().down('[name = tsoftsearchform_site]');

        // 20160812 bkoh
        if (me.getView().CheckSectorCode) formData.getForm().findField('cd_sector').setValue(me.getView().SectorCode);

        //var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('sitehelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('sitehelp_store').getProxy().getReader().rawData.msg);
        }else{
            this.getView().down('[name=p_search]').focus();
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        // console.log(selected.data);
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    },

    onItemKeyPressGrid1 : function(obj, record, item, index, e, eOpts){

        if (e.getKey() == '13'){
            // console.log(record.data);
            this.openPanel.callbackPopup(record.data);
            this.view.close();
        }

    }

});