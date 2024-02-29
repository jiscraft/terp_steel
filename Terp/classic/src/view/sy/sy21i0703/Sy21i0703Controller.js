/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0703.Sy21i0703Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sy21i0703',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.sy21i0703_headbutton = me.lookupReference('sy21i0703_headbutton');
        me.sy21i0703_searchform = me.lookupReference('sy21i0703_searchform');
        
        me.sy21i0703_grid1 = me.lookupReference('sy21i0703_grid1');
        me.sy21i0703_grid1_store =  me.getViewModel().getStore('sy21i0703_grid1_store') ;
    
        me.sy21i0703_grid2 = me.lookupReference('sy21i0703_grid2');
        me.sy21i0703_grid2_store =  me.getViewModel().getStore('sy21i0703_grid2_store') ;
    
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('sy21i0703_form1_fg_sm200') ,'SM200');
    },
    
    onSelect : function(){
        var me = this;
    
        if (me.sy21i0703_searchform.down('[name=cd_site]').getValue() == ''){
            me.commonFn.toastMessage('현장코드를 선택해야 합니다','t')
        }
        var fg_user ='' ;
        var fgUser = me.sy21i0703_searchform.down('[name=fg_user]').getValue().cbg;
        for (var i = 0; i < fgUser.length; i++) {
            fg_user = fg_user +  fgUser[i] + ',';
        }
    
        var jsonData = {
            'actiondata': 'mpjtuser',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.sy21i0703_searchform.down('[name=cd_site]').getValue(),
            'fg_user' : fg_user
    
        };
    
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
    
    
        me.sy21i0703_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        });
    
    },
    
    onSelectCallback : function(records, operation , success) {
        var me = this;
    
        if (success == true) {
            var me = this;

            if (me.sy21i0703_searchform.down('[name=cd_site]').getValue() == ''){
                me.commonFn.toastMessage('현장코드를 선택해야 합니다','t')
            }
            var jsonData = {
                'actiondata': 'm',
                'loginIduser': me.commonFn.getUserInfo('id_user'),
                'loginCdc': me.commonFn.getUserInfo('cd_c'),
                'cd_site':  me.sy21i0703_searchform.down('[name=cd_site]').getValue()

            };

            var sendDataJson = [];
            sendDataJson.push(jsonData);
            var sendDataJsonEncode = Ext.encode(sendDataJson);


            me.sy21i0703_grid2_store.load({
                params :{
                    sendData : sendDataJsonEncode
                },
                callback : me.onSelectCallback2,
                scope : me
            });
        } else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('sy21i0703_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }
    },

    onSelectCallback2 : function(records, operation , success) {
        var me = this;

        if (success == true) {
            me.onEditControlMode('select');

        } else {
            Ext.getBody().unmask();
            var errorMsg = this.getViewModel().getStore('sy21i0703_grid1_store').getProxy().getReader().rawData.msg;
            me.commonFn.errorHandling(errorMsg);
        }
    },


    onButtonClik_sy21i0703_leftToright : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '사용자를 프로젝트 사용자로 등록 하시겠습니까 ?', function (btn) {
            if (btn == 'yes') {
                me.sy21i0703_grid1.getPlugin('cellplugin').completeEdit();
                var selected = me.sy21i0703_grid1.getSelectionModel().getSelection();

                for (var i = 0; i < selected.length; i++) {
                    var findIdx = me.sy21i0703_grid2.getStore().findBy(function(rec) { return rec.get('id_user') === selected[i].data.id_user; });
                    if (findIdx < 0) {
                        var insertData ={
                            cd_c: me.commonFn.getUserInfo().cd_c,
                            cd_site : selected[i].data.cd_site,
                            id_user : selected[i].data.id_user,
                            nm_user : selected[i].data.nm_user ,
                            nm_fg_user : selected[i].data.nm_fg_user
                        };
                        me.sy21i0703_grid2_store.insert(0, insertData);
                        me.sy21i0703_grid2.getPlugin('cellplugin').completeEdit();
                    }
                }

                me.onSaveLeftToRight();
            } else {

            }
        });
    },

    onButtonClik_sy21i0703_rightToleft : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '선택사용자를 프로젝트 사용자에서 제외 시키겠습니까 ?', function (btn) {
            if (btn == 'yes') {
                me.sy21i0703_grid2.getPlugin('cellplugin').completeEdit();
                var selected = me.sy21i0703_grid2.getSelectionModel().getSelection();

                for (var i = 0; i < selected.length; i++) {
                    var findIdx = me.sy21i0703_grid1.getStore().findBy(function(rec) { return rec.get('id_user') === selected[i].data.id_user; });
                    if (findIdx < 0) {
                        var insertData ={
                            cd_c: me.commonFn.getUserInfo().cd_c,
                            cd_site : selected[i].data.cd_site,
                            id_user : selected[i].data.id_user,
                            nm_user : selected[i].data.nm_user ,
                            nm_fg_user : selected[i].data.nm_fg_user
                        };
                        me.sy21i0703_grid1_store.insert(0, selected[i]);
                        me.sy21i0703_grid1.getPlugin('cellplugin').completeEdit();
                    }
                    
                     me.sy21i0703_grid2_store.remove(selected);

                }

                me.onSaveRightToLeft();
            } else {

            }
        });
    },

    onSaveLeftToRight : function(){
        var me = this;
        me.sy21i0703_grid2.getPlugin('cellplugin').completeEdit();
        
        
        var sendData = me.sy21i0703_grid2.makeSendData('','all',true);
    
        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/sy/sy_user_project.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('프로젝트 사용자 등록성공','t');
                me.onSelect();
            }
        });
    },


    onSaveRightToLeft : function(){
        var me = this;
        me.sy21i0703_grid2.getPlugin('cellplugin').completeEdit();


        var sendData = me.sy21i0703_grid2.makeSendData();

        me.commonFn.getTsoftAjaxRequest(sendData , '../ServerPage/sy/sy_user_project.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('프로젝트 사용자 제외처리 성공','t');
                me.onSelect();
            }
        });
    },



    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.sy21i0703_grid1.setReadOnly(true);
            me.sy21i0703_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'Y' , select :'Y'});
            me.sy21i0703_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
            me.sy21i0703_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
        }
        // else if (value == 'modify') {
        //     me.sy21i0703_grid1.setReadOnly(false);
        //     me.sy21i0703_headbutton.setActiveButton({modify :'N' , insert :'Y' ,  delete:'Y', save :'Y' , print :'Y' , select :'Y'});
        //     me.sy21i0703_grid1.setActiveButton({insert :'Y' , modify :'Y' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'Y'});
        // }
        // else if (value == 'insert') {
        //     me.sy21i0703_grid1.setReadOnly(false);
        //     me.sy21i0703_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'N', save :'Y' , print :'Y' , select :'Y'});
        //     me.sy21i0703_grid1.setActiveButton({insert :'Y' , modify :'Y' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'Y'});
        // }
    }
    


});