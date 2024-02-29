/**
 * Created by jiscraft on 2017-06-29.
 */
Ext.define('Terp.view.tsoft.help.cardhelp.TsoftCardHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftcardhelp',

    init: function(obj) {
        var me =this;
        me.openPanel = obj;
        me.tsoftcardhelp_grid1 = this.lookupReference('tsoftcardhelp_grid1');
        me.tsoftcardhelp_grid1_store = this.getViewModel().getStore('tsoftcardhelp_grid1_store');

        this.onSelect();
    },

    onSelect : function(){
        var me = this;
        //var formData = this.lookupReference('searchForm').getValues();
        //console.log(formData);

        // var searchForm = this.getView().down('tsoftsearchform');
        // var formData = {
        //     'actiondata': 'sel',
        //     'h_search': searchForm.down('tsofttextfield').getValue()
        //
        // };
        //
        //
        // var sendDataJson = [];
        // sendDataJson.push(formData);
        // var sendDataJsonEncode = Ext.encode(sendDataJson);

        searchForm = me.lookupReference('searchForm');
        var sendDataJsonEncode = searchForm.makeSendData('sel');

        this.getViewModel().getStore('tsoftcardhelp_grid1_store').load({
            params :{
                sendData : sendDataJsonEncode

            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        //console.log(records );
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftcardhelp_grid1_store').getProxy().getReader().rawData.msg);
        }else{
            //this.onPageEditable(false);
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.popupParamThisView.callbackPopup(selected.data);
        this.view.close();
        //this.closeView();



    }
});