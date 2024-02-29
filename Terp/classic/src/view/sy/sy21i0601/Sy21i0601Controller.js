/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0601.Sy21i0601Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0601',

    control: {
        'tsoftsearchform[reference=sy21i0601_headbutton]': {
            boxready: 'onBoxReady_sy21i0601_headbutton'
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
        me.searchform = me.lookupReference('sy21i0601_searchform');
        me.headbutton = me.lookupReference('sy21i0601_headbutton');
        me.grid1 = me.lookupReference('sy21i0601_grid1');
        me.grid1_store = me.getViewModel().getStore('sy21i0601_grid1_store');
        me.onSelect();

    },

    onBoxReady_sy21i0601_headbutton : function(){
        var me = this;
        me.onSelect();

    },

    onSelect : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'base',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.grid1_store.load({
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
            me.grid1.setReadOnly(true);
            me.grid1.getSelectionModel().select(0);
            me.headbutton.down('[name = savebutton]').setDisabled(true);
        }else{
            Ext.Msg.alert('fail',me.grid1_store.getProxy().getReader().rawData.msg);
        }
    },

    onModify : function(){
        var me = this;
        me.grid1.setReadOnly(false);
        me.headbutton.down('[name = savebutton]').setDisabled(false);
    },

    onSave : function(){
        var me = this;
        //var params = {cd_c : '9999'};
        var sendData = me.grid1.makeSendData('' ,  '' );

        Ext.Ajax.request({
            url :'../ServerPage/sy/sy_menu.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    Ext.Msg.alert("성공","성공적으로 업데이트 했습니다");
                    me.grid1_store.commitChanges();
                    me.grid1.setReadOnly(true);
                    me.grid1.getSelectionModel().select(0);
                    me.headbutton.down('[name = savebutton]').setDisabled(true);

                }else{
                    Ext.Msg.alert("오류",obj.msg);
                }
            },
            fail : function(){
                Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
            }
        })
    },

    onInsert : function(){
        var me = this;
        //me.eadbutton으로 컨트롤 할때만
        //s_classId_eadbutton.down('[name = savebutton]').setDisabled(false);

        //선택한로우의 위에 로우를 추가하기 위해 로우번호를 체크한다
        var rowIdx = me.grid1.getGridRowIdx();

        me.grid1.setReadOnly(false);
        var s = me.grid1.getView().getSelectionModel().getSelection();
        var data ={
            cd_c: '9999' ,
            id_menu: '',
            nm_menu :'',
            dc_url :'',
            yn_exe :'N',
            yn_use :'Y',
            yn_insert :'N',
            yn_delete :'N',
            yn_modify :'N',
            yn_save :'N',
            yn_print :'N',
            yn_help :'N'
        };
        //edit하던 내용을 컴플릿시킴..
        me.grid1.getPlugin('cellplugin').completeEdit();
        me.grid1.getStore('me.grid1_store').insert(rowIdx, data);
        me.grid1.getSelectionModel().select(rowIdx);
        me.grid1.setReadOnly(false);
        //row selection한뒤 에디트를 시작할 셀로 이동
        me.grid1.getPlugin('cellplugin').startEditByPosition({
            row: rowIdx,
            column: 1  //가고자하는 컬럼번호
        });
        me.headbutton.down('[name = savebutton]').setDisabled(false);

    },

    copyMenu : function(){
        var me = this;
        if(!me.searchform.isValid()){
            me.commonFn.toastMessage('복사할 회사를 선택해야 합니다' , 'b');
            return;
        }
        var sendDataJsonEncode = me.searchform.makeSendData('copy');

        Ext.Ajax.request({
            url :'../ServerPage/sy/sy_menu.jsp' ,
            method :'POST',
            params :{
                sendData : sendDataJsonEncode
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    Ext.Msg.alert("성공","성공적으로 업데이트 했습니다");
                    me.grid1.setReadOnly(true);
                    me.grid1.getSelectionModel().select(0);

                }else{
                    Ext.Msg.alert("오류",obj.msg);
                }
            },
            fail : function(){
                Ext.Msg.alert("오류","데이타처리중 오류가 발생했습니다");
            }
        })
    },


    onDelete : function(){
        var me = this;

        Ext.Msg.show({
            title:'Save Changes?',
            message: '개발메뉴를 삭제할시 회사설정 메뉴 및 사용자권한도 동시에 삭제됩니다',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var s = me.grid1.getView().getSelectionModel().getSelection();

                    if (s.length > 0 ){
                        me.grid1_store.remove(s);
                        me.headbutton.down('[name = savebutton]').setDisabled(false);
                    }
                }
            }
        });
    }


});