/**
 * Created by jiscraft on 2023-10-06.
 */
Ext.define('Terp.view.mm.mm23j0601.Mm23j0601Contoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mm23j0601',



    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.mm23j0601_headbutton = me.lookupReference('mm23j0601_headbutton');
        me.mm23j0601_searchform = me.lookupReference('mm23j0601_searchform');

        me.mm23j0601_grid1 = me.lookupReference('mm23j0601_grid1');
        me.mm23j0601_grid1_store =  me.getViewModel().getStore('mm23j0601_grid1_store') ;
    

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        me.commonFn.setCommonCode(me.lookupReference('mm23j0601_fg_mm060') ,'MM060');
    },
    

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.mm23j0601_searchform.down('[name=cd_site]').getValue(),
            'cd_w':  me.mm23j0601_searchform.down('[name=cd_w]').getValue(),
            'fg_mm060':  me.mm23j0601_searchform.down('[name=fg_mm060]').getValue()
    
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.mm23j0601_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){

                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('me.mm23j0601_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },
    
});