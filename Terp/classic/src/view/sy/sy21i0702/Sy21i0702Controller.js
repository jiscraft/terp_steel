/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0702.Sy21i0702Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0702',

    requires: [
        'Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popup'
    ],

    control: {
        'tsoftgrid[reference=sy21i0702_grid1]': {
            selectionchange: 'onSelectionchanage_sy21i0702_grid1'
        },
        'tsoftform[reference=sy21i0702_searchform]': {
            boxready: 'onBoxready_searchform'
        }

    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.sy21i0702_fuctionform = me.lookupReference('sy21i0702_fuctionform');
        me.sy21i0702_headbutton = me.lookupReference('sy21i0702_headbutton');
        me.sy21i0702_searchform = me.lookupReference('sy21i0702_searchform');

        me.sy21i0702_grid1 = me.lookupReference('sy21i0702_grid1');
        me.sy21i0702_grid1_store =  me.getViewModel().getStore('sy21i0702_grid1_store') ;
    },

    onBoxready_searchform : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        var sendDataJsonEncode = me.sy21i0702_searchform.makeSendData('select');
        //console.log(sendDataJsonEncode);

        //var fgStatusValue = me.sy21i0702_searchform.getValues().fg_status;
        //if (fgStatusValue == '' || fgStatusValue == null) {
        //    Ext.Msg.alert('확인', '구분 값을 선택해 주세요.');
        //}

        me.sy21i0702_grid1_store.load({
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
            if (records.length >= 1) {
                me.sy21i0702_grid1.setReadOnly(true);
            }
        }
        else{
            Ext.Msg.alert('fail',me.getViewModel().getStore('sy21i0702_grid1_store').getProxy().getReader().rawData.msg);
        }
    },
    
    onSelectionchanage_sy21i0702_grid1 : function(obj, selected, eOpts){
        var me = this ;
        if (selected == undefined || selected.length == 0){
            me.sy21i0702_fuctionform.down('[name=confirmBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=cancelBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=recoverBtn]').disable();
            return;
        }

        if(selected[0].data.fg_status == '0'){
            me.sy21i0702_fuctionform.down('[name=confirmBtn]').enable();
            me.sy21i0702_fuctionform.down('[name=cancelBtn]').enable();
            me.sy21i0702_fuctionform.down('[name=recoverBtn]').disable();
        }

        if(selected[0].data.fg_status == '1'){
            me.sy21i0702_fuctionform.down('[name=confirmBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=cancelBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=recoverBtn]').disable();
        }

        if(selected[0].data.fg_status == '2'){
            me.sy21i0702_fuctionform.down('[name=confirmBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=cancelBtn]').disable();
            me.sy21i0702_fuctionform.down('[name=recoverBtn]').enable();
        }

    },
    



    onConfirmBtnClick  : function(){
        var me = this;
        var paramjsonData = {
            'formData' : me.sy21i0702_grid1.getSelectionModel().getLastSelected()
        };


        var pop = Ext.create('Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popup',{
            popupParamView : me.getView() ,
            popupParams : paramjsonData ,
            autoShow: true
        });

        pop.on('close', function() {
            me.onPopupCallback_sm21k0101();
        });

    },

    onPopupCallback_sm21k0101 : function(){
        var me = this;
        me.onSelect();
    },


    onCancelBtnClick: function() {
        var me = this;
        var selected = me.sy21i0702_grid1.getSelectionModel().getLastSelected().data;
        var jsonData = {
            actiondata : '2',
            loginIduser : me.commonFn.getUserInfo().id_user,
            id_row : selected.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_user_req_apply.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('사용자 요청상태를 취소처리했습니다','t');
                me.onSelect();
            }
        });
    },

    onRecoverBtnClick: function() {
        var me = this;
        var selected = me.sy21i0702_grid1.getSelectionModel().getLastSelected().data;
        var jsonData = {
            actiondata : '0',
            loginIduser : me.commonFn.getUserInfo().id_user,
            id_row : selected.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sy/sy_user_req_apply.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('사용자 요청상태를 요청상태로 변경했습니다','t');
                me.onSelect();
            }
        });
    }

});