/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.help.contacthelp.TsoftContactHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftcontacthelp',
    contacthelp_store : '',
    contacthelp_grid : '',
    init: function(obj , params ) {
        var me = this;
        me.openPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');

        if (params != undefined   ) {
            this.getViewModel().set('p_cd_p',params.cd_p);
        }
        // contacthelp_store = me.getViewModel().getStore('contacthelp_store');
        // contacthelp_grid =me.lookupReference('contacthelp_grid');
        me.p_params = params;
        this.onSelect();
    } ,

    onSelect : function(){
        var me = this;
        // console.log(this.getViewModel().get('p_cd_p'));
        // console.log(this.p_params)
        var formData = this.getView().down('[name = tsoftsearchform_emp]');
        // formData.cd_p =  this.getViewModel().get('p_cd_p')
        // console.log(formData)
        var sendDataJsonEncode = formData.makeSendData('help',false);
        sendDataJsonEncode[0].cd_p=  this.getViewModel().get('p_cd_p');
        console.log(sendDataJsonEncode);
        this.getViewModel().getStore('contacthelp_store').load({
            params :{
                sendData :  Ext.encode(sendDataJsonEncode)
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('contacthelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    // onItemDbclickGrid1 : function(obj, selected){
    //     this.openPanel.callbackPopup(selected.data);
    //     this.view.close();
    //
    // },
    onSaveForm :  function() {
        var selected= [];
        console.log(contacthelp_store);
        var a_dc_name ='', a_no_contact = '';
        // for (let i = 0; i < contacthelp_store.data.items.length ; i++) {
        //     if (contacthelp_store.data.items[i].data.chk) {
        //         a_dc_name += contacthelp_store.data.items[i].data.dc_name;
        //         a_no_contact += contacthelp_store.data.items[i].data.no_contact;
        //          a_dc_name += ',';
        //          a_no_contact += ',';
        //     }
        //
        // }
        if(a_dc_name.length > 0 || a_no_contact.length> 0)
        {
            a_dc_name= a_dc_name.substring(0,a_dc_name.length-1);
            a_no_contact=    a_no_contact.substring(0,a_no_contact.length-1)

        }
        selected.a_dc_name = a_dc_name;
        selected.a_no_contact = a_no_contact;

        console.log(selected);
        this.openPanel.callbackPopup(selected);
        this.view.close();

    },
    onItemKeyPressGrid1 : function(obj, record, item, index, e, eOpts){

        if (e.getKey() == '13'){
            this.openPanel.callbackPopup(record.data);
            this.view.close();
        }

    }
});