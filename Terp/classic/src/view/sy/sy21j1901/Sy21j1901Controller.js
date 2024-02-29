/**
 * Created by jiscr on 2021-10-19.
 */
Ext.define('Terp.view.sy.sy21j1901.Sy21j1901Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21j1901',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21j1901_headbutton = me.lookupReference('sy21j1901_headbutton');
        me.sy21j1901_searchform = me.lookupReference('sy21j1901_searchform');

        me.sy21j1901_grid1 = me.lookupReference('sy21j1901_grid1');
        me.sy21j1901_grid1_store =  me.getViewModel().getStore('sy21j1901_grid1_store') ;

        me.onInitValue();


    },


    onInitValue : function(){
        var me = this;
    },


    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'dt' : me.sy21j1901_searchform.down('[name=dt]').getValue()

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        me.sy21j1901_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },

    onSelectCallback : function(records, operation , success) {
        var me = this;

        if (success == true) {

            me.sy21j1901_grid1.setReadOnly(true);
            if ( records.length > 0 ){
                me.sy21j1901_grid1.getSelectionModel().select(0);


            }

        } else {

            var errorMsg = this.getViewModel().getStore('sy21j1901_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }

    }
});