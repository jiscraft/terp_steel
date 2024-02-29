/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0603.Sy21i0603Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0603',

    control: {
        'tsoftgrid[reference=sy21i0603_grid1]': {
            beforecellclick: 'onSy21i0603Grid1_BeforeCellClick'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0603_searchform = me.lookupReference('sy21i0603_searchform');
        me.sy21i0603_headbutton = me.lookupReference('sy21i0603_headbutton');
        me.sy21i0603_grid1 = me.lookupReference('sy21i0603_grid1');
        me.sy21i0603_grid1_store = me.getViewModel().getStore('sy21i0603_grid1_store');
        //me.commonFn.setCommonCode(me.lookupReference('sy21i0603_searchform_combo1') ,'SY030');
    },


    onSelect : function(){
        var me = this;
        if(me.sy21i0603_searchform.down('[name = fg_sy030]').getValue() == '' || me.sy21i0603_searchform.down('[name = fg_sy030]').getValue() == null ){
            me.commonFn.toastMessage('조회할 권한을 반드시 선택해야 합니다' , 'b');
            return;
        }

        var sendDataJsonEncode = me.sy21i0603_searchform.makeSendData('m');
        me.sy21i0603_grid1_store.load({
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
            me.sy21i0603_grid1.setReadOnly(true);
            me.sy21i0603_grid1.getSelectionModel().select(0);

            if ( me.sy21i0603_headbutton.down('[name = savebutton]') ) {
                me.sy21i0603_headbutton.down('[name = savebutton]').setDisabled(true);
            }

        }else{
            Ext.Msg.alert('fail',me.sy21i0603_grid1_store.getProxy().getReader().rawData.msg);
        }
    },

    onModify : function(){
        var me = this;
        me.sy21i0603_grid1.setReadOnly(false);
        me.sy21i0603_headbutton.down('[name = savebutton]').setDisabled(false);
    },

    onSave : function(){
        var me = this;
        var sendData = me.sy21i0603_grid1.makeSendData('s','');
        Ext.Ajax.request({
            url :'../ServerPage/sy/sy_menuright.jsp' ,
            method :'POST',
            params :{
                sendData : sendData
            },

            success :function(res){
                var obj = Ext.JSON.decode(res.responseText);
                if(obj.success){
                    me.commonFn.toastMessage('저장성공' ,'b');
                    me.sy21i0603_grid1_store.commitChanges();
                    me.sy21i0603_grid1.setReadOnly(true);
                    me.sy21i0603_grid1.getSelectionModel().select(0);
                    me.sy21i0603_headbutton.down('[name = savebutton]').setDisabled(true);
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

    useColumnChange : function(obj, value){
        var me = this;
        var id_menu = obj.ownerCt.grid.selection.data.id_menu ;
        if (value == 'N') {
            var i = 0;
            me.sy21i0603_grid1_store.each(function(record) {
                var models = me.sy21i0603_grid1_store.getRange();
                if ( models[i].get('id_menu').substr(0, id_menu.length ) == id_menu ){
                    models[i].set('yn_use', 'N');
                }
                i++;
            });
        }
        else{
            var level = id_menu.length / 3;
            var id_menu2 ='';
            var findRecordIndex = 0;
            var models = me.sy21i0603_grid1_store.getRange();

            if (level = 5){
                id_menu2 = id_menu.substr( 0 , 12);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');


                id_menu2 = id_menu.substr( 0 , 9);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');


                id_menu2 = id_menu.substr( 0 , 6);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');

                id_menu2 = id_menu.substr( 0 , 3);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');
            }

            if (level = 4){
                id_menu2 = id_menu.substr( 0 , 9);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');


                id_menu2 = id_menu.substr( 0 , 6);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');

                id_menu2 = id_menu.substr( 0 , 3);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');
            }

            if (level = 3){
                id_menu2 = id_menu.substr( 0 , 6);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');

                id_menu2 = id_menu.substr( 0 , 3);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');
            }

            if (level = 2){
                id_menu2 = id_menu.substr( 0 , 3);
                findRecordIndex = me.sy21i0603_grid1_store.find('id_menu' , id_menu2 );
                models[findRecordIndex].set('yn_use', 'Y');
            }
        }
    },

    onSy21i0603Grid1_BeforeCellClick: function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
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