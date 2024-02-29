/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.partnerinfowin',

    control: {
        'tsoftsearchform[reference=partnerinfowin_searchform]': {
            boxready: 'onBoxReady_partnerinfowin_searchform'
        },
        /*
            rowdblclick (obj , record , tr , rowIndex , e , eOpts)
            selectionchange (obj , selected , eOpt)
            change (obj, newValue, oldValue, eOpts )
            reconfigure 
            itemdblclick(obj , record , tr , rowIndex , e , eOpts)
            beforecellclick (obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
            boxready (obj, width, height, eOpts ) -- grid
        */
    },
    
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.partnerinfowin_headbutton = me.lookupReference('partnerinfowin_headbutton');
        me.partnerinfowin_searchform = me.lookupReference('partnerinfowin_searchform');

        me.partnerinfowin_grid1 = me.lookupReference('partnerinfowin_grid1');
        me.partnerinfowin_grid1_store =  me.getViewModel().getStore('partnerinfowin_grid1_store') ;
    },

    onBoxReady_partnerinfowin_searchform : function () {
        var me = this;
        me.partnerinfowin_grid1_store.clearFilter();
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_partnerinfowin_grid1();

    },

    onSelect_partnerinfowin_grid1 : function() {
        var me = this;
        var jsonData = {
            'actiondata': 'info',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.partnerinfowin_grid1_store.removeAll();
        me.partnerinfowin_grid1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.partnerinfowin_grid1.getSelectionModel().select(0);
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('partnerinfowin_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onDcFiler_SpecialKey_Enter : function (fld) {
        var me = this;
        var searchValuesFilter =   me.partnerinfowin_searchform.down('[name=dc_filter]').getValue();
        me.partnerinfowin_grid1_store.clearFilter();

        me.partnerinfowin_grid1_store.filterBy(function(rec) {
            return (Ext.isEmpty(searchValuesFilter) ? true : (rec.get('nm_p').indexOf(searchValuesFilter) != -1));
        });


        me.partnerinfowin_grid1.getSelectionModel().select(0);
    }
    
});