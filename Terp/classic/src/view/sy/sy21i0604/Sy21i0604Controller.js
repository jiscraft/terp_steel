/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0604.Sy21i0604Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0604',

    control: {
        'tsoftsearchform[reference=sy21i0604_searchform]': {
            boxready: 'onBoxReady_sy21i0604_searchform'
        }

    },



    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0604_searchform = me.lookupReference('sy21i0604_searchform');
        me.sy21i0604_headbutton = me.lookupReference('sy21i0604_headbutton');
        me.sy21i0604_grid2 = me.lookupReference('sy21i0604_grid2');
        me.sy21i0604_grid2_store =  me.getViewModel().getStore('sy21i0604_grid2_store') ;
        me.sy21i0604_grid3 = me.lookupReference('sy21i0604_grid3');
        me.sy21i0604_grid3_store =  me.getViewModel().getStore('sy21i0604_grid3_store') ;
        me.sy21i0604_functionform = me.lookupReference('sy21i0604_functionform');
    },

    onBoxReady_sy21i0604_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        var sendDataJsonEncode = me.lookupReference('sy21i0604_searchform').makeSendData('m');
        me.getViewModel().getStore('sy21i0604_grid1_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    },
    
    onSelectCallback : function(records, operation , success){
        var me = this;
        if(success ){
            me.lookupReference('sy21i0604_grid2').setReadOnly(true);
            me.lookupReference('sy21i0604_grid1').getSelectionModel().select(0);
    
            me.sy21i0604_grid3.getSelectionModel().select(0);
            if(me.sy21i0604_headbutton){
                me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(true);
            }
    
        }else{
            Ext.Msg.alert('fail',me.getViewModel().getStore('sy21i0604_grid1_store').getProxy().getReader().rawData.msg);
        }
    },
    
    onModify : function(){
        var me = this;
        me.lookupReference('sy21i0604_grid2').focus();
        me.lookupReference('sy21i0604_grid2').setReadOnly(false);
        if(me.sy21i0604_headbutton.down('[name = savebutton]')){
            me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(false);
        }
    
    },
    
    onInsert : function(){
        var me = this;
    
        me.lookupReference('sy21i0604_grid2').focus();
        me.lookupReference('sy21i0604_grid2').setReadOnly(false);
        var s = me.lookupReference('sy21i0604_grid1').getView().getSelectionModel().getSelection();
    
        var data ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_codeh: s[0].data.cd_codeh,
            cd_codel: '',
            dc_codel: '',
            dc_codel1: '',
            dc_codel2: '',
            dc_codel3: '',
            dt_insert: '',
            dt_update: '',
            id_insert: '',
            id_row: '',
            id_update: '',
            nm_codeh: '',
            nm_codel: '',
            sq_index: '',
            yn_edit: 'N',
            yn_use: 'Y'
        };
        //me.getViewModel().getStore('sy21i0604_grid2_store').add(data);
    
    
        var rowIdx = me.sy21i0604_grid2.getGridRowIdx();
    
        me.sy21i0604_grid2.getPlugin('cellplugin').completeEdit();
        me.sy21i0604_grid2.getStore('sy21i0604_grid2_store').insert(rowIdx, data);
        me.sy21i0604_grid2.getSelectionModel().select(rowIdx);
        me.sy21i0604_grid2.setReadOnly(false);
        //row selection한뒤 에디트를 시작할 셀로 이동
        me.sy21i0604_grid2.getPlugin('cellplugin').startEditByPosition({
            row: rowIdx,
            column: 0  //가고자하는 컬럼번호
        });
        if (me.sy21i0604_headbutton.down('[name = savebutton]')){
            me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(false);
        }
    
    },
    
    onDelete : function(){
        var me = this;
        var s = me.lookupReference('sy21i0604_grid2').getView().getSelectionModel().getSelection();
    
        if (s.length > 0 ){
            me.getViewModel().getStore('sy21i0604_grid2_store').remove(s);
            if(me.sy21i0604_headbutton.down('[name = savebutton]')){
                me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(false);
            }
    
        }
    
    },
    
    onSave : function(){
        var me = this ;
        var sendData = me.lookupReference('sy21i0604_grid2').makeSendData();
        //console.log(sendData);

        Ext.Ajax.request({
            url :'/ServerPage/sy/sy_codel.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },
            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    me.commonFn.toastMessage('저장성공' ,'b');
                    me.sy21i0604_grid2_store.commitChanges();
                    var s = me.lookupReference('sy21i0604_grid1').getView().getSelectionModel().getSelection();
                    //console.log(s);
                    me.lookupReference('sy21i0604_grid1').getSelectionModel().select(s);
                    if (me.sy21i0604_headbutton.down('[name = savebutton]')){
                        me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(true);
                    }
    
    
    
                }
                else{
                    Ext.Msg.alert("오류",obj.msg);
                }
            },
            fail : function(){
                Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
            }
        })
    
    
    },
    
    columnschanged_sy21i0604_grid2 : function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
        var me = this ;
        //console.log(me.lookupReference('sy21i0604_grid2').columns[cellIndex].keyField);
        if(me.lookupReference('sy21i0604_grid2').columns[cellIndex].keyField){
            //console.log(me.lookupReference('sy21i0604_grid2').columns[cellIndex].keyField);
            me.lookupReference('sy21i0604_grid2').columns[cellIndex].isEditAllowed = false;
        }
    },
    
    selectionchange_sy21i0604_grid1 : function(obj, selected, eOpts){
        var me = this ;
        //console.log(selected);
        if ( selected == null || selected == ''){
            return;
        }
    
        var me = this;
        var loginDataCdc = me.commonFn.getUserInfo().cd_c;
        var loginDataIduser = me.commonFn.getUserInfo().id_user;
    
        var senddata = {
            'actiondata':'m',
            'loginIduser' : loginDataIduser,
            'loginCdc' : loginDataCdc ,
            'cd_codeh' : selected[0].data.cd_codeh
        } ;
    
        var sendDataJson = [];
        sendDataJson.push(senddata);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.getViewModel().getStore('sy21i0604_grid2_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.selectionchange_sy21i0604_grid1_callback,
            scope : me
    
        });
    
    },
    
    
    selectionchange_sy21i0604_grid1_callback :function(records, operation , success){
        var me = this ;
        if(success ){
            me.lookupReference('sy21i0604_grid2').setReadOnly(true);
            //me.lookupReference('sy21i0604_grid1').getSelectionModel().select(0);
    
            me.sy21i0604_grid2.getSelectionModel().select(0);
            if (me.sy21i0604_headbutton.down('[name = savebutton]')){
                me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(true);
            }
    
        }else{
            Ext.Msg.alert('fail',me.getViewModel().getStore('sy21i0604_grid2_store').getProxy().getReader().rawData.msg);
        }
    } ,
    
    selectionchange_sy21i0604_grid2 : function(obj, selected, eOpts){
        var me = this ;
        //console.log(selected);
        if ( selected == null || selected == ''){
            return;
        }
    
        var me = this;
        var loginDataCdc = me.commonFn.getUserInfo().cd_c;
        var loginDataIduser = me.commonFn.getUserInfo().id_user;
    
        var senddata = {
            'actiondata':'m',
            'loginIduser' : loginDataIduser,
            'loginCdc' : loginDataCdc ,
            'cd_codeh' : selected[0].data.cd_codeh,
            'cd_codel' : selected[0].data.cd_codel
        } ;
    
        var sendDataJson = [];
        sendDataJson.push(senddata);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        me.getViewModel().getStore('sy21i0604_grid3_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.selectionchange_sy21i0604_grid2_callback,
            scope : me
    
        });
    
    },
    
    selectionchange_sy21i0604_grid2_callback :function(records, operation , success){
        var me = this ;
        if(success ){
            me.lookupReference('sy21i0604_grid3').setReadOnly(true);
            //me.lookupReference('sy21i0604_grid1').getSelectionModel().select(0);
    
            me.sy21i0604_grid3.getSelectionModel().select(0);
            //me.sy21i0604_headbutton.down('[name = savebutton]').setDisabled(true);
        }else{
            Ext.Msg.alert('fail',me.getViewModel().getStore('sy21i0604_grid3_store').getProxy().getReader().rawData.msg);
        }
    } ,
    
    
    
    onClickSy21i0604_functionform : function(){
        var me = this;
        var formData = {
            'actiondata': 'all',
            'loginIduser': me.commonFn.getUserInfo().id_user,
            'loginCdc': me.commonFn.getUserInfo().cd_c,
            'dt_apply' : me.commonFn.getDateToString('','today','') ,
            'fg_sy030' : me.commonFn.getUserInfo().fg_sy030
        };
    
        var sendDataJson = [];
        sendDataJson.push(formData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
        //공통코드로드
        if (Terp.app.getStore('CommonCode').data.length != 0) {
            Terp.app.getStore('CommonCode').removeAll();
        }
    
        Ext.getStore('CommonCode').load({
            params: {
                sendData: sendDataJsonEncode
            },
    
            callback: me.onClickSy21i0604_functionform_callback,
            scope: me
        });
    },
    
    onClickSy21i0604_functionform_callback : function(records, operation , success){
        var me = this ;
        if(success ){
            me.commonFn.toastMessage('공통코드를 성공적으로 로드했습니다' , 't');
        }else{
            me.commonFn.toastMessage('공통코드를 로드 실패' , 't')
        }
    },
    
    onGridInsert_sy21i0604_grid3 : function(selection , rowIdx){
        var me = this ;
        var sl = me.sy21i0604_grid2.gridSelection.data;
        ////추가에 필요한 값 체크
        if ( me.sy21i0604_grid2.gridSelection == null )
        {
            me.commonFn.toastMessage('공통코드를 선택한뒤 추가하세요','b');
            return;
        }
    
        var data ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_codeh : sl.cd_codeh ,
            cd_codel : sl.cd_codel ,
            cd_codell : '' ,
            nm_codell : '',
            dc_codell :'',
            yn_use :'Y'
        };
    
        me.sy21i0604_grid3.getPlugin('cellplugin').completeEdit();
        me.sy21i0604_grid3.getStore('sy21i0604_grid3_store').insert(rowIdx, data);
        me.sy21i0604_grid3.getSelectionModel().select(rowIdx);
        me.sy21i0604_grid3.setReadOnly(false);
        //row selection한뒤 에디트를 시작할 셀로 이동
        me.sy21i0604_grid3.getPlugin('cellplugin').startEditByPosition({
            row: rowIdx,
            column: 0  //가고자하는 컬럼번호
        });
    
    },
    
    onGridModify_sy21i0604_grid3 : function(){
        var me = this ;
        me.sy21i0604_grid3.setReadOnly(false);
    },
    
    onGridDelete_sy21i0604_grid3 : function(selection , rowIdx){
        var me = this ;
        me.sy21i0604_grid3_store.remove(selection);
    },
    
    onGridSave_sy21i0604_grid3 : function(){
        var me = this;
        var record = null;
        var sendDataJson = [];
        me.sy21i0604_grid3.getPlugin('cellplugin').completeEdit();
    
        if (me.sy21i0604_grid3_store.getCount() == 0 && me.sy21i0604_grid3_store.getRemovedRecords().length > 0) {
            Ext.Array.each(me.sy21i0604_grid3_store.getRemovedRecords(), function(item) {
                var data = item.getData();
                data.loginIduser = me.commonFn.getUserInfo().id_user;
                data.loginCdc = me.commonFn.getUserInfo().cd_c;
                data.actiondata = 'd';
                sendDataJson.push(data);
            });
        }
        else {
            for (var r=0; r<me.sy21i0604_grid3_store.getCount(); r++) {
                record = me.sy21i0604_grid3_store.getAt(r);
    
                Ext.Array.each(me.sy21i0604_grid3_store.getModifiedRecords(), function(item) {
                    var data = item.getData();
                    data.loginIduser = me.commonFn.getUserInfo().id_user;
                    data.loginCdc = me.commonFn.getUserInfo().cd_c;
                    data.actiondata = 's';
                    sendDataJson.push(data);
    
                });
                Ext.Array.each(me.sy21i0604_grid3_store.getRemovedRecords(), function(item) {
                    var data = item.getData();
                    data.loginIduser = me.commonFn.getUserInfo().id_user;
                    data.loginCdc = me.commonFn.getUserInfo().cd_c;
                    data.actiondata = 'd';
                    sendDataJson.push(data);
                });
    
            }
        }
    
        Ext.Ajax.request({
            url :'/ServerPage/sy/sy_codell.jsp' ,
            method :'POST',
            params :{
                sendData : Ext.encode(sendDataJson)
            },
                success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    me.commonFn.toastMessage("저장성공",'t');
                    me.sy21i0604_grid3_store.reload();
                    me.sy21i0604_grid3.setReadOnly(true);
    
                }else{
                    me.commonFn.toastMessage(obj.msg ,'t');
                }
            },
            fail : function(){
                me.commonFn.toastMessage("데이타처리중 오류가 발생했습니다",'t');
            }
        })
    },

    onClickSy21i0604_functionform_codeh : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'insert',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_codeh':  me.sy21i0604_functionform.down('[name=cd_codeh]').getValue(),
            'nm_codeh':  me.sy21i0604_functionform.down('[name=nm_codeh]').getValue()
        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_codeh.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장성공','t');
                me.onSelect();
            }
        });
    }



});