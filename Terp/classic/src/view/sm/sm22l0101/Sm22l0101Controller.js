/**
 * Created by jiscraft on 2022-12-01.
 */
Ext.define('Terp.view.sm.sm22l0101.Sm22l0101Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22l0101',

    requires: [
        'Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popup'
    ],

    control: {
        'tsoftsearchform[reference=sm22l0101_searchform]': {
            boxready: 'onBoxReady_sm22l0101_searchform'
        },
        'tsoftgrid[reference=sm22l0101_grid1]': {
            selectionchange: 'onSelectionchange_sm22l0101_grid1'
        },
        'tsoftgrid[reference=sm22l0101_grid2]': {
            itemdblclick: 'onItemdblclick_sm22l0101_grid2',
            selectionchange: 'onSelectionchange_sm22l0101_grid2'
        }
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
        me.sm22l0101_headbutton = me.lookupReference('sm22l0101_headbutton');
        me.sm22l0101_searchform = me.lookupReference('sm22l0101_searchform');

        me.sm22l0101_grid1 = me.lookupReference('sm22l0101_grid1');
        me.sm22l0101_grid1_store =  me.getViewModel().getStore('sm22l0101_grid1_store') ;

        me.sm22l0101_grid2 = me.lookupReference('sm22l0101_grid2');
        me.sm22l0101_grid2_store =  me.getViewModel().getStore('sm22l0101_grid2_store') ;

        me.sm22l0101_grid3 = me.lookupReference('sm22l0101_grid3');
        me.sm22l0101_grid3_store =  me.getViewModel().getStore('sm22l0101_grid3_store') ;
    },


    onBoxReady_sm22l0101_searchform : function(){
        var me = this;
        me.onSelect();
        me.onEditControlMode('init');
    },
    
    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'mcon',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site_sale':  me.sm22l0101_searchform.down('[name=cd_site_sale]').getValue(),
            'dt_fr':  me.sm22l0101_searchform.down('[name=dt_fr]').getValue(),
            'dt_to':  me.sm22l0101_searchform.down('[name=dt_to]').getValue()
    
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.sm22l0101_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        var focusKey = me.getView().config.windowReturnData;
                        if (Ext.isEmpty(focusKey) || focusKey == '') {
                            me.sm22l0101_grid1.getSelectionModel().select(0);
                            me.sm22l0101_grid1.getView().bufferedRenderer.scrollTo(0, true);
                        } else {
                            var row = me.sm22l0101_grid1_store.find('cd_p_con', focusKey);
                            me.sm22l0101_grid1.getSelectionModel().select(row);
                            me.sm22l0101_grid1.getView().bufferedRenderer.scrollTo(row, true);
                            //팝업에서 리턴이 돌아왔을 경우만 사용
                            me.getView().config.windowReturnData = '';
                        }
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22l0101_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },

    onSelectionchange_sm22l0101_grid1 : function(obj , selected , eOpt){
        var me = this;
        if ( selected.length == 0 ){
            return;
        }
        var jsonData = {
            'actiondata': 'mcondetail',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site_sale':  me.sm22l0101_searchform.down('[name=cd_site_sale]').getValue(),
            'cd_p_con':  selected[0].data.cd_p_con ,
            'dt_fr':  me.sm22l0101_searchform.down('[name=dt_fr]').getValue(),
            'dt_to':  me.sm22l0101_searchform.down('[name=dt_to]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sm22l0101_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.sm22l0101_grid2.getSelectionModel().select(0);
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22l0101_grid2_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },

    onSelectionchange_sm22l0101_grid2 : function(obj , selected , eOpt){
        var me = this;
        if ( selected.length == 0 ){
            return;
        }
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_er':  selected[0].data.no_er
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.sm22l0101_grid3_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.sm22l0101_grid3.getSelectionModel().select(0);
                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('sm22l0101_grid3_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },


    onInsert : function(){
        var me = this;
        var paramjsonData = {
            'record' : '' ,
            'no_er' : '',
            'fg_window':'new'
        };

        var pop = Ext.create('Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_sm22l0101();
        });
    },

    onItemdblclick_sm22l0101_grid2 : function(obj , record , tr , rowIndex , e , eOpts){
        var me = this;
        me.getView().config.windowReturnData = record.data.cd_p_con;
        var paramjsonData = {
            'record' : record ,
            'no_er' : record.data.no_er,
            'fg_window':'edit'
        };

        var pop = Ext.create('Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_sm22l0101();
        });
    },

    onPopupCallback_sm22l0101 : function(){
        var me = this;
        me.onSelect();
    },
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'init'){
            me.sm22l0101_grid1.setReadOnly(true);
            me.sm22l0101_grid2.setReadOnly(true);
            me.sm22l0101_headbutton.setActiveButton({modify :'N' ,insert :'Y' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.sm22l0101_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
            me.sm22l0101_grid2.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }

    }
});