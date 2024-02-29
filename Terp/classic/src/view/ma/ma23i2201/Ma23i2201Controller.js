/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2201.Ma23i2201Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma23i2201',

    control: {
        'tsoftsearchform[reference=ma23i2201_searchform]': {
            boxready: 'onBoxReady_ma23i2201_searchform'
        },
        'tsoftgrid[reference=ma23i2201_grid1]': {
            selectionchange: 'onSelectionchanage_ma23i2201_grid1'
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
        me.ma23i2201_headbutton = me.lookupReference('ma23i2201_headbutton');
        me.ma23i2201_searchform = me.lookupReference('ma23i2201_searchform');
        
        me.ma23i2201_grid1 = me.lookupReference('ma23i2201_grid1');
        me.ma23i2201_grid1_store =  me.getViewModel().getStore('ma23i2201_grid1_store') ;
    
        me.ma23i2201_grid2 = me.lookupReference('ma23i2201_grid2');
        me.ma23i2201_grid2_store =  me.getViewModel().getStore('ma23i2201_grid2_store') ;
    
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('ma23i2201_form1_fg_sm200') ,'SM200');
    },
    
    onBoxReady_ma23i2201_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.ma23i2201_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.ma23i2201_grid1.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('ma23i2201_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelectionchanage_ma23i2201_grid1 : function(obj, selected, eOpts){
        var me = this ;
        if (selected.length == 0 || selected == undefined ){
            return;
        }
    
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_w': selected[0].data.cd_w
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
    
        me.ma23i2201_grid2_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.ma23i2201_grid2.getSelectionModel().select(0);
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('ma23i2201_grid2_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },
    
    onGridModify_ma23i2201_grid2 : function(){
        var me = this;
        me.onEditControlMode('edit');
    },

    onGridInsert_ma23i2201_grid2 : function(gridSelection , gridRowindex){
        var me = this;
    
        var gridSelection_grid1 = me.ma23i2201_grid1.getGridSelection();
    
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_w : gridSelection_grid1.data.cd_w

        };
    
        me.ma23i2201_grid2.getPlugin('cellplugin').completeEdit();
    
    
        me.ma23i2201_grid2_store.insert(0, insertData);
        me.ma23i2201_grid2.getSelectionModel().select(0);
        me.ma23i2201_grid2.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    
    },
    
    onGridSave_ma23i2201_grid2 : function(){
        var me = this;
        me.ma23i2201_grid2.getPlugin('cellplugin').completeEdit();
        
        
        var sendData = me.ma23i2201_grid2.makeSendData();
    
        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/ma/ma_wh_loc.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
                me.ma23i2201_grid2.setReadOnly(true);
                me.onEditControlMode('select');
           }
        });
    },
    
    onGridDelete_ma23i2201_grid2 : function(selection, rowIdx){
        var me = this;
        // var gridSelection = me.ma23i2201_grid2.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_w':  selection.data.cd_w ,
            'cd_wloc' : selection.data.cd_wloc
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_wh_loc.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('위치 삭제 성공','t');
                me.ma23i2201_grid2_store.remove(selection);
                me.ma23i2201_grid2.getView().refresh();
            }
        });
    },

    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
            me.ma23i2201_grid1.setReadOnly(true);
            me.ma23i2201_grid2.setReadOnly(true);
            me.ma23i2201_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.ma23i2201_grid2.setActiveButton({insert :'N' , modify :'Y' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }

        if (value == 'edit'){
            me.ma23i2201_grid1.setReadOnly(true);
            me.ma23i2201_grid2.setReadOnly(false);
            me.ma23i2201_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'Y'});
            me.ma23i2201_grid2.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'Y'});
        }

    }
});