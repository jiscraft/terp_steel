/**
 * Created by jiscr on 2021-10-12.
 */
Ext.define('Terp.view.ma.ma21j1201.Ma21j1201Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma21j1201',


    control: {
        'tsoftsearchform[reference=ma21j1201_searchform]': {
            boxready: 'onBoxReady_ma21j1201_searchform'
        },
        // 'tsoftgrid[reference=ma21j1201_grid1]': {
        //     rowdblclick: 'onRowDoubleClick_ma21j1201_grid1'
        // }
    },



    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma21j1201_headbutton = me.lookupReference('ma21j1201_headbutton');
        me.ma21j1201_searchform = me.lookupReference('ma21j1201_searchform');

        me.ma21j1201_grid1 = me.lookupReference('ma21j1201_grid1');
        me.ma21j1201_grid1_store =  me.getViewModel().getStore('ma21j1201_grid1_store') ;

        me.onInitValue();


    },


    onInitValue : function(){
        var me = this;

    },

    onBoxReady_ma21j1201_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'sel',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'dt_base':  me.ma21j1201_searchform.down('[name=dt_base]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.getBody().mask("Loading...");
        me.ma21j1201_grid1_store.load({
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
            Ext.getBody().unmask();
            me.ma21j1201_grid1.setReadOnly(true);
            if ( records.length > 0 ){
                me.ma21j1201_grid1.getSelectionModel().select(0);
            }


        } else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('ma21j1201_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }
    }


});