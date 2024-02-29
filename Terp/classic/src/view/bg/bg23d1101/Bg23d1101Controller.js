/**
 * Created by jiscraft on 2023-04-11.
 */
Ext.define('Terp.view.bg.bg23d1101.Bg23d1101Controller', {
    extend: 'Ext.app.ViewController', 
    alias: 'controller.bg23d1101',

    control: {
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.bg23d1101_headbutton = me.lookupReference('bg23d1101_headbutton');
        me.bg23d1101_searchform = me.lookupReference('bg23d1101_searchform');

        me.bg23d1101_pjbase = me.lookupReference('bg23d1101_pjbase');

        me.bg23d1101_grid1 = me.lookupReference('bg23d1101_grid1');
        me.bg23d1101_grid1_store = me.getViewModel().getStore('bg23d1101_grid1_store') ;
    },

    onSelect : function () {
        var me = this;
        me.bg23d1101_pjbase.getController().onLoadDataPjBase(me.bg23d1101_searchform.down('[name=cd_site]').getValue());
        me.onSelect_bg23d1101_grid1();
    },

    onSelect_bg23d1101_grid1 : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.bg23d1101_searchform.down('[name=cd_site]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.bg23d1101_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.bg23d1101_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('bg23d1101_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });      
    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.bg23d1101_grid1.setReadOnly(true);
            me.bg23d1101_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.bg23d1101_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
    
});