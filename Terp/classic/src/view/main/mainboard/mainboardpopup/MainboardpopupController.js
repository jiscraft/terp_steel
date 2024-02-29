/**
 * Created by jiscr on 2022-01-24.
 */
Ext.define('Terp.view.main.mainboard.mainboardpopup.MainboardpopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainboardpopup',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.mainboardpopup_headbutton = me.lookupReference('mainboardpopup_headbutton');
        
        me.mainboardpopup_grid1 = me.lookupReference('mainboardpopup_grid1');
        me.mainboardpopup_grid1_store =  me.getViewModel().getStore('mainboardpopup_grid1_store') ;

        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        me.onSelect();
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('mainboardpopup_form1_fg_sm200') ,'SM200');
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'memp',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_e':  me.commonFn.getUserInfo('cd_e')
    
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.mainboardpopup_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.mainboardpopup_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('mainboardpopup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }        
            },
            scope : me
        });
    
    },
    
    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },
    
    onDelete : function(){
        var me = this;
        var gridRowindex = me.mainboardpopup_grid1.getGridRowIdx();
        var gridSelection = me.mainboardpopup_grid1.getGridSelection();
        me.mainboardpopup_grid1_store.remove(gridSelection);
        me.mainboardpopup_grid1.getSelectionModel().select(gridRowindex);
    },

    onInsert : function(gridSelection , gridRowindex){
        var me = this;
    
        var gridSelection_grid1 = me.mainboardpopup_grid1.getGridSelection();
    
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            dt_memo : me.commonFn.getTodayInfo() ,
            no_memo: me.commonFn.sqlNodocu('MM', me.commonFn.getUserInfo('cd_c'),me.commonFn.getTodayInfo()),
            fg_memo:'0' ,
            cd_e : me.commonFn.getUserInfo().cd_e,
            dc_memo  : ''
        };
    
        me.mainboardpopup_grid1.getPlugin('cellplugin').completeEdit();
    
    
        me.mainboardpopup_grid1_store.insert(0, insertData);
        me.mainboardpopup_grid1.getSelectionModel().select(0);
        me.mainboardpopup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 3
        });
    
    },
    
    onSave : function(){
        var me = this;
        me.mainboardpopup_grid1.getPlugin('cellplugin').completeEdit();
    
        var sendData = me.mainboardpopup_grid1.makeSendData();
    
        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/wk/wk_memo.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('일정등록 성공','t');
                me.onSelect();

            }
        });
    },
     
    
    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.mainboardpopup_grid1.setReadOnly(true);
            me.mainboardpopup_headbutton.down('[name = insertbutton]').hide();
            me.mainboardpopup_headbutton.down('[name = deletebutton]').hide();
            me.mainboardpopup_headbutton.down('[name = savebutton]').hide();
            me.mainboardpopup_headbutton.down('[name = printbutton]').hide();
            me.mainboardpopup_headbutton.down('[name = helpbutton]').hide();
            me.mainboardpopup_headbutton.down('[name = selectbutton]').show();
            me.mainboardpopup_headbutton.down('[name = modifybutton]').show();
            // me.mainboardpopup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }
        else if (value == 'modify') {
            me.mainboardpopup_grid1.setReadOnly(false);
            me.mainboardpopup_headbutton.down('[name = selectbutton]').hide();
            me.mainboardpopup_headbutton.down('[name = modifybutton]').hide();
            me.mainboardpopup_headbutton.down('[name = insertbutton]').show();
            me.mainboardpopup_headbutton.down('[name = deletebutton]').show();
            me.mainboardpopup_headbutton.down('[name = savebutton]').show();
            // me.mainboardpopup_grid1.setActiveButton({insert :'Y' , modify :'Y' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'Y'});
        }

    }
});