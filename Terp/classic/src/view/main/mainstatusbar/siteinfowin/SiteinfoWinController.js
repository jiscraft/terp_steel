/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.siteinfowin',

    control: {
        'tsoftsearchform[reference=siteinfowin_searchform]': {
            boxready: 'onBoxReady_siteinfowin_searchform'
        }
    },
    
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.siteinfowin_headbutton = me.lookupReference('siteinfowin_headbutton');
        me.siteinfowin_searchform = me.lookupReference('siteinfowin_searchform');

        me.siteinfowin_grid1 = me.lookupReference('siteinfowin_grid1');
        me.siteinfowin_grid1_store =  me.getViewModel().getStore('siteinfowin_grid1_store') ;
    },

    onBoxReady_siteinfowin_searchform : function () {
        var me = this;
        me.siteinfowin_grid1_store.clearFilter();
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_siteinfowin_grid1();
    },

    onSelect_siteinfowin_grid1 : function() {
        var me = this;
        var jsonData = {
            'actiondata': 'info',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.siteinfowin_grid1_store.removeAll();
        me.siteinfowin_grid1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.siteinfowin_grid1.getSelectionModel().select(0);
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('siteinfowin_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onDcFiler_SpecialKey_Enter : function (fld) {
        var me = this;
        var searchValuesFilter =   me.siteinfowin_searchform.down('[name=dc_filter]').getValue();
        me.siteinfowin_grid1_store.clearFilter();

        me.siteinfowin_grid1_store.filterBy(function(rec) {
            return (Ext.isEmpty(searchValuesFilter) ? true : (rec.get('nm_site').indexOf(searchValuesFilter) != -1));
        });
        me.siteinfowin_grid1.getSelectionModel().select(0);
    }
    
});