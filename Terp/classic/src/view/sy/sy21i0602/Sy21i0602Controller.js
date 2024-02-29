/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0602.Sy21i0602Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0602',

    control: {
        'tsoftgrid[reference=sy21i0602_grid1]': {
            beforecellclick: 'onSy21i0602Grid1_BeforeCellClick'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0602_searchform = me.lookupReference('sy21i0602_searchform');
        me.sy21i0602_grid1 = me.lookupReference('sy21i0602_grid1');
        me.sy21i0602_grid1_store = me.getViewModel().getStore('sy21i0602_grid1_store');
        me.sy21i0602_headbutton = me.lookupReference('sy21i0602_headbutton');
        me.sy21i0602_searchform.down('[name=cd_c]').setValue('1000');
        me.sy21i0602_searchform.down('[name=cd_c]').displayValue ='에어테크엔지니어링';

        me.onSelect();
    },


    onSelect : function(){
        var me = this;
        if(!me.sy21i0602_searchform.isValid()){
            me.commonFn.toastMessage('조회할 회사를 선택해야 합니다' , 'b');
            return;
        }

        var sendDataJsonEncode = me.sy21i0602_searchform.makeSendData('m');
        me.sy21i0602_grid1_store.load({
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
            me.sy21i0602_grid1.setReadOnly(true);
            me.sy21i0602_grid1.getSelectionModel().select(0);
            if (me.sy21i0602_headbutton.down('[name = savebutton]')){
                me.sy21i0602_headbutton.down('[name = savebutton]').setDisabled(true);
            }

        }else{
            Ext.Msg.alert('fail',me.sy21i0602_grid1_store.getProxy().getReader().rawData.msg);
        }
    },


    onModify : function(){
        var me = this;
        me.sy21i0602_grid1.setReadOnly(false);
        if (me.sy21i0602_headbutton.down('[name = savebutton]')){
            me.sy21i0602_headbutton.down('[name = savebutton]').setDisabled(false);
        }

    },

    onSave : function(){
        var me = this;

        var sendData = me.sy21i0602_grid1.makeSendData('s','all');
        //console.log(sendData);
        Ext.Ajax.request({
            url :'../ServerPage/sy/sy_menu.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },
            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    me.commonFn.toastMessage('저장성공' ,'b');
                    me.sy21i0602_grid1_store.commitChanges();
                    me.sy21i0602_grid1.setReadOnly(true);
                    me.sy21i0602_grid1.getSelectionModel().select(0);
                    if (me.sy21i0602_headbutton.down('[name = savebutton]')){
                        me.sy21i0602_headbutton.down('[name = savebutton]').setDisabled(true);
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

    onSy21i0602Grid1_BeforeCellClick: function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var dataIndex = obj.getHeaderCt().getGridColumns()[cellIndex].dataIndex;
        if ((dataIndex === 'yn_insert') && (record.get('yn_insert_org') === 'N')) {
            return false;
        }
        else if ((dataIndex === 'yn_delete') && (record.get('yn_delete_org') === 'N')) {
            return false;
        }
        else if ((dataIndex === 'yn_modify') && (record.get('yn_modify_org') === 'N')) {
            return false;
        }
        else if ((dataIndex === 'yn_save') && (record.get('yn_save_org') === 'N')) {
            return false;
        }
        else if ((dataIndex === 'yn_print') && (record.get('yn_print_org') === 'N')) {
            return false;
        }
    }

});